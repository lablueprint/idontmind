function fetchDataFromGoogleSheets5() {
  const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = activeSpreadsheet.getSheets()[2]; // Adjust sheet name as needed
  const dataRange = sheet.getDataRange().getValues();
  const dataValues = dataRange.slice(2); // Skip first two rows

 
  return dataValues.map(row => {
    const excerptTitles = {};
    const excerpts = {};

    // Loop through every other row for excerpt titles starting from index 8
    for (let i = 7, j = 1; i < row.length; i += 2, j++) {
      if (dataRange[1][i]) {
        excerptTitles[`excerpt_${j+1}_title`] = row[i];
      }
    }

    // Loop through every other row for excerpts starting from index 7
    for (let i = 6, j = 1; i < row.length; i += 2, j++) {
      if (dataRange[1][i]) {
        excerpts[`excerpt_${j}`] = row[i];
      }
    }

    return {
      content_type: row[0],
      title: row[1], 
      author: row[2], 
      tags: row[3] ? row[3].split(',').map(tag => tag.trim()) : [],
      link: row[4], 
      image_link: row[5],
      excerpt_titles: excerptTitles,
      excerpts: excerpts
    };
  });
}


function fetchExistingDocumentsFromMongoDB5() {
  const apiKey = getAPIKey();

  const payload = {
    collection: "officialpersonal-stories",
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

function pushPersonalStories() {
  const apiKey = getAPIKey();
    
  const existingDocuments = fetchExistingDocumentsFromMongoDB5();
  const sheetData = fetchDataFromGoogleSheets5();
  
  var existingNames = new Set();

 sheetData.forEach(doc => {
  existingNames.add(`${doc.content_type},${doc.title}`);
});

  const documentsToDelete = existingDocuments.filter(doc => {
  const key = `${doc.content_type},${doc.title}`;
  return !existingNames.has(key);
  }).map(doc => ({ content_type: doc.content_type, title: doc.title}));


    if (documentsToDelete.length > 0){
      
      documentsToDelete.forEach(newDoc => {
      const deletePayload = {
        collection: "officialpersonal-stories",
        database: "test",
        dataSource: "idm-cluster",
        filter: {"content_type": newDoc.content_type}
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
      if (newDoc.content_type && newDoc.title){
      const payload = {
        collection: "officialpersonal-stories",
        database: "test",
        dataSource: "idm-cluster",
        filter: { "content_type": newDoc.content_type, "title": newDoc.title }, // Filter by content_type and title
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