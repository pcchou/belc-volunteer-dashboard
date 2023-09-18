function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({status: "success", "data": getData()}))
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
}

function getData() {
  var spreadSheetId = "1gHoV7ZZs5v4-BhVje-s-SUjkyJp3QclOxYC3PruWT7I";
  var dataRange = "表單回應 1!B2:G";

  var range = Sheets.Spreadsheets.Values.get(spreadSheetId, dataRange);
  var values = range.values;

  return values;
}
