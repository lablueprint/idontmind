function fetchDataFromGoogleSheets3() {
  const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = activeSpreadsheet.getSheets()[1]; // Adjust sheet name as needed
  const dataRange = sheet.getDataRange().getValues();
  const dataValues = dataRange.slice(1); // Skip first two rows

 return dataValues.map(row => ({
  content_alg: row[0],
  question: row[1], 
  tags: row[2] ? row[2].split(',').map(tag => tag.trim()) : [], // Split the string by commas and trim whitespace
  answered: row[3] ? row[3].trim().toLowerCase() === "yes" : false,
  answer: row[4],
  who_answered: row[5],
}));

}

function fetchExistingDocumentsFromMongoDB3() {
  const apiKey = getAPIKey();

  const payload = {
    collection: "officialq&a",
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

function pushQandA() {
  const apiKey = getAPIKey();
    
  const existingDocuments = fetchExistingDocumentsFromMongoDB3();
  const sheetData = fetchDataFromGoogleSheets3();
  
  var existingNames = new Set();

 sheetData.forEach(doc => {
  existingNames.add(`${doc.question}`);
});

  const documentsToDelete = existingDocuments.filter(doc => {
  const key = `${doc.question}`;
  return !existingNames.has(key);
  }).map(doc => ({ question: doc.question }));


    if (documentsToDelete.length > 0){
      
      documentsToDelete.forEach(newDoc => {
      const deletePayload = {
        collection: "officialq&a",
        database: "test",
        dataSource: "idm-cluster",
        filter: {"question": newDoc.question}
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
      if (newDoc.question && newDoc.tags){
      const payload = {
        collection: "officialq&a",
        database: "test",
        dataSource: "idm-cluster",
        filter: { "question": newDoc.question }, // Filter by content_type and title
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