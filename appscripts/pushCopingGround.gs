function fetchDataFromGoogleSheets4() {
  const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = activeSpreadsheet.getSheets()[4]; // Adjust sheet name as needed
  const dataRange = sheet.getDataRange().getValues();
  const dataValues = dataRange.slice(2); // Skip first two rows
  
  return dataValues.map(row => {
    const excerptTitles = {};
    const excerpts = {};

    // Loop through every other row for excerpt titles starting from index 8
    for (let i = 8, j = 1; i < row.length; i += 2, j++) {
      if (dataRange[1][i]) {
        excerptTitles[`excerpt_${j+1}_title`] = row[i];
      }
    }
    // Loop through every other row for excerpts starting from index 7
    for (let i = 7, j = 1; i < row.length; i += 2, j++) {
      if (dataRange[1][i]) {
        excerpts[`excerpt_${j}`] = row[i];
      }
    }

    return {
      content_alg: row[0],
      title: row[1], 
      subtitle: row[2], 
      author: row[3], 
      tags: row[4] ? row[4].split(',').map(tag => tag.trim()) : [],
      link: row[5], 
      image_link: row[6],
      excerpt_titles: excerptTitles,
      excerpts: excerpts
    };
  });
}


function fetchExistingDocumentsFromMongoDB4() {
  const apiKey = getAPIKey();

  const payload = {
    collection: "officialcoping-ground",
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

function pushCopingGround() {
  const apiKey = getAPIKey();
    
  const existingDocuments = fetchExistingDocumentsFromMongoDB4();
  const sheetData = fetchDataFromGoogleSheets4();
  
  var existingNames = new Set();

 sheetData.forEach(doc => {
  existingNames.add(`${doc.title},${doc.subtitle}`);
});

  const documentsToDelete = existingDocuments.filter(doc => {
  const key = `${doc.title},${doc.subtitle}`;
  return !existingNames.has(key);
  }).map(doc => ({ title: doc.title, subtitle: doc.subtitle }));


    if (documentsToDelete.length > 0){
      
      documentsToDelete.forEach(newDoc => {
      const deletePayload = {
        collection: "officialcoping-ground",
        database: "test",
        dataSource: "idm-cluster",
        filter: {"title": newDoc.title}
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


  // update
    sheetData.forEach(newDoc => {
      if (newDoc.title && newDoc.subtitle){
      const payload = {
        collection: "officialcoping-ground",
        database: "test",
        dataSource: "idm-cluster",
        filter: { "title": newDoc.title, "subtitle": newDoc.subtitle }, // Filter by title and subtitle
        update: { "$set": newDoc }, // Update with new data
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