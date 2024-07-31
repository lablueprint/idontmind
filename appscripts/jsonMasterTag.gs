function downloadSheetAsJSON() {
  // Replace 'SHEET_ID' and 'SHEET_NAME' with the actual ID and name of your Google Sheet
  const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = activeSpreadsheet.getSheets()[5]; // Adjust sheet name as needed
  const dataRange = sheet.getDataRange();
  const values = dataRange.getValues().slice(1); // Skip first two rows

  
  // Initialize an empty object to hold the JSON data
  var jsonData = {};
  
  // Loop through each row in the sheet
  for (var i = 0; i < values.length; i++) {
    var category = values[i][4]; // Assuming the category is in the second column (index 1)
    var item = values[i][3]; // Assuming the item is in the first column (index 0)
    
    if (category && item) {
    // Check if the category already exists in the JSON object
      if (!jsonData[category]) {
        // If it doesn't exist, create a new array for the category
        jsonData[category] = [];
      }
      
      // Add the item to the corresponding category array
      jsonData[category].push(item);
    }
  }
  
  // Convert the JSON object to a string
  var jsonString = JSON.stringify(jsonData, null, 2);

  // Prompt the user to download the JSON file
  var fileName = 'masterTag.json';

  
  // Create a new file in Google Drive and write the JSON string to it
  DriveApp.createFile('data.json', jsonString);
}
