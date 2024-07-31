const findEndpointUpdate = 'https://us-west-2.aws.data.mongodb-api.com/app/data-instw/endpoint/data/v1/action/updateMany';
const findEndpointDelete = 'https://us-west-2.aws.data.mongodb-api.com/app/data-instw/endpoint/data/v1/action/deleteMany';
const findEndpoint = 'https://us-west-2.aws.data.mongodb-api.com/app/data-instw/endpoint/data/v1/action/find';
const clusterName = "idm-cluster";

function getAPIKey() {
  const userProperties = PropertiesService.getUserProperties();
  let apiKey = userProperties.getProperty('APIKEY');
  let resetKey = false; // Make true if you have to change key
  if (apiKey == null || resetKey) {
    var result = SpreadsheetApp.getUi().prompt(
      'Enter API Key',
      'Key:',
      SpreadsheetApp.getUi().ButtonSet
    );
    apiKey = result.getResponseText();
    userProperties.setProperty('APIKEY', apiKey);
  }
  return apiKey;
}

function fetchDataFromGoogleSheets1() {
  const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = activeSpreadsheet.getSheets()[0]; // Adjust sheet name as needed
  const dataRange = sheet.getDataRange().getValues();
  const dataValues = dataRange.slice(2); // Skip first two rows

  return dataValues.map(row => {
    const excerptTitles = {};
    const excerpts = {};

    // Loop through every other row for excerpt titles starting from index 7
    for (let i = 8, j = 1; i < row.length; i += 2, j++) {
      if (dataRange[1][i]) {
        excerptTitles[`excerpt_${j+1}_title`] = row[i];
      }
    }

    // Loop through every other row for excerpts starting from index 8
    for (let i = 7, j = 1; i < row.length; i += 2, j++) {
      if (dataRange[1][i]) {
        excerpts[`excerpt_${j}`] = row[i];
      }
    }

    return {
      content_alg: row[0],
      content_type: row[1], 
      title: row[2], 
      author: row[3], 
      tags: row[4] ? row[4].split(',').map(tag => tag.trim()) : [],
      link: row[5], 
      image_link: row[6],
      excerpt_titles: excerptTitles,
      excerpts: excerpts
    };
  });
}

function fetchExistingDocumentsFromMongoDB1() {
  const apiKey = getAPIKey();

  const payload = {
    collection: "officialjournal-articles",
    database: "test",
    dataSource: "idm-cluster",
    filter: {} // No filter needed to fetch all documents
  };

  const options = {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(payload),
    headers: { "api-key": apiKey }
  };

  const response = UrlFetchApp.fetch(findEndpoint, options);
  const contentText = response.getContentText();
  
  return JSON.parse(contentText).documents;
}

function pushArticles() {
  const apiKey = getAPIKey();
    
  const existingDocuments = fetchExistingDocumentsFromMongoDB1();
  const sheetData = fetchDataFromGoogleSheets1();
  
  const existingDocMap = new Map();

  // Map existing documents by content_type and title
  existingDocuments.forEach(doc => {
    existingDocMap.set(`${doc.content_type},${doc.title}`, doc);
  });

  // Set of keys (content_type and title) from the new sheet data
  const sheetDocKeys = new Set(sheetData.map(doc => `${doc.content_type},${doc.title}`));

  // Identify documents to delete
  const documentsToDelete = [];
  existingDocMap.forEach((doc, key) => {
    if (!sheetDocKeys.has(key)) {
      documentsToDelete.push({ content_type: doc.content_type, title: doc.title });
    }
  });

  if (documentsToDelete.length > 0){
    documentsToDelete.forEach(doc => {
      const deletePayload = {
        collection: "officialjournal-articles",
        database: "test",
        dataSource: "idm-cluster",
        filter: {"content_type": doc.content_type, "title": doc.title}
      };

      const deleteOptions = {
        method: 'post',
        contentType: 'application/json',
        payload: JSON.stringify(deletePayload),
        headers: { "api-key": apiKey }
      };

      const deleteResponse = UrlFetchApp.fetch(findEndpointDelete, deleteOptions);
      Logger.log(deleteResponse.getContentText());
    });
  }

  // Upsert documents from the sheet data
  sheetData.forEach(newDoc => {
    if (newDoc.content_type && newDoc.title) {
      const existingDoc = existingDocMap.get(`${newDoc.content_type},${newDoc.title}`);
      const fieldsToUnset = {};

      // THIS FILE IS THE ONLY FILE THAT DOES removal any extra fields from mongodb 
      // this happens if the schema of the sheet changes
      // apply code logic below to other files if you want to remove extra MONGODB fields within the same document
      if (existingDoc) {
        Object.keys(existingDoc).forEach(field => {
          if (!newDoc.hasOwnProperty(field) && field !== '_id') {
            fieldsToUnset[field] = "";
          }
        });
      }

      const payload = {
        collection: "officialjournal-articles",
        database: "test",
        dataSource: "idm-cluster",
        filter: { "content_type": newDoc.content_type, "title": newDoc.title }, // Filter by content_type and title
        update: { 
          "$set": newDoc,
          "$unset": fieldsToUnset
        }, // Update with new data and unset old fields
        upsert: true
      };

      const options = {
        method: 'post',
        contentType: 'application/json',
        payload: JSON.stringify(payload),
        headers: { "api-key": apiKey }
      };

      const response = UrlFetchApp.fetch(findEndpointUpdate, options);
      const contentText = response.getContentText();
      
      Logger.log(`Document updated: ${contentText}`);
    }
  });
}