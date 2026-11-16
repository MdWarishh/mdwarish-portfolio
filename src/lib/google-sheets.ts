import { google } from "googleapis";

export interface SheetLeadRow {
  id: string;
  name: string;
  email: string;
  message: string;
  source: string;
  status: string;
  createdAt: string;
}

export async function appendLeadToGoogleSheet(row: SheetLeadRow): Promise<boolean> {
  const base64Credentials = process.env.GOOGLE_SERVICE_ACCOUNT_BASE64;
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  const sheetName = process.env.GOOGLE_SHEET_NAME || "Leads";

  if (!base64Credentials || !spreadsheetId) {
    throw new Error("Google Sheets environment variables are not configured.");
  }

  const decodedJson = Buffer.from(base64Credentials, "base64").toString("utf-8");
  const credentials = JSON.parse(decodedJson);

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: credentials.client_email,
      private_key: credentials.private_key?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${sheetName}!A:G`,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [
        [
          row.id,
          row.name,
          row.email,
          row.message,
          row.source,
          row.status,
          row.createdAt,
        ],
      ],
    },
  });

  return true;
}
