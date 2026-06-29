/**
 * Google Apps Script — demo-request lead capture for the salon platform.
 *
 * Setup (one time, ~5 min):
 *   1. Open the Google Sheet that will hold leads.
 *   2. Extensions → Apps Script. Delete any boilerplate, paste this file.
 *   3. (Optional) set SECRET below to the same value as SHEETS_WEBHOOK_SECRET
 *      in your app env. Leave '' to disable the check.
 *   4. Deploy → New deployment → type "Web app".
 *        - Execute as: Me
 *        - Who has access: Anyone
 *      Authorize when prompted, then copy the Web app URL (ends in /exec).
 *   5. Put that URL in your app env as SHEETS_WEBHOOK_URL.
 *
 * The first row of the sheet is treated as headers and created if missing.
 */

var SECRET = ''; // must match SHEETS_WEBHOOK_SECRET (or '' to disable)
var SHEET_NAME = 'Leads';
var HEADERS = ['Timestamp', 'Name', 'Email', 'Salon', 'Phone', 'Website', 'Priority', 'Notes', 'Source'];

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    if (SECRET && data.secret !== SECRET) {
      return json({ ok: false, error: 'unauthorized' });
    }

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    // Use the "Leads" tab if it exists, otherwise the first sheet.
    var sheet = ss.getSheetByName(SHEET_NAME) || ss.getSheets()[0];
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
    }

    sheet.appendRow([
      data.created_at || new Date().toISOString(),
      data.name || '',
      data.email || '',
      data.salon_name || '',
      data.phone || '',
      data.website || '',
      data.priority || '',
      data.message || '',
      data.source || '',
    ]);

    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
