function fetchDataFromGoogleSheets2() {
  const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = activeSpreadsheet.getSheets()[3]; // Adjust sheet name as needed
  const dataRange = sheet.getDataRange().getValues();
  const dataValues = dataRange.slice(1); // Skip first two rows

 return dataValues.map(row => ({
  journal_prompt: row[0], 
  tags: row[1] ? row[1].split(',').map(tag => tag.trim()) : [], // Split the string by commas and trim whitespace
}));

}

function fetchExistingDocumentsFromMongoDB2() {
  const apiKey = getAPIKey();

  const payload = {
    collection: "officialjournal-prompts",
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

function pushPrompts() {
  const apiKey = getAPIKey();
    
  const existingDocuments = fetchExistingDocumentsFromMongoDB2();
  const sheetData = fetchDataFromGoogleSheets2();
  
  var existingNames = new Set();

 sheetData.forEach(doc => {
  existingNames.add(`${doc.journal_prompt},${doc.tags}`);
});

  const documentsToDelete = existingDocuments.filter(doc => {
  const key = `${doc.journal_prompt},${doc.tags}`;
  return !existingNames.has(key);
  }).map(doc => ({ content_type: doc.journal_prompt, tags: doc.tags }));


    if (documentsToDelete.length > 0){
      
      documentsToDelete.forEach(newDoc => {
      const deletePayload = {
        collection: "officialjournal-prompts",
        database: "test",
        dataSource: "idm-cluster",
        filter: {"journal_prompt": newDoc.journal_prompt}
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
      if (newDoc.journal_prompt && newDoc.tags){
      const payload = {
        collection: "officialjournal-prompts",
        database: "test",
        dataSource: "idm-cluster",
        filter: { "journal_prompt": newDoc.journal_prompt, "tags": newDoc.tags }, // Filter by content_type and title
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