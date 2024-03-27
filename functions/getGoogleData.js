require('dotenv').config()
const googleapis = require('googleapis')
const google = googleapis.google
async function GetData(range) {
    try {
      const target = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
      const jwt = new google.auth.JWT(
        process.env.CLIENT_EMAIL,
        null,
        (process.env.PRIVATE_KEY || '').replace(/\\n/g, '\n'),
        target
      );
  
      const sheets = google.sheets({ version: 'v4', auth: jwt });
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: process.env.SPREADSHEET_ID,
        range, // sheet name
      });
  
      const rows = response.data.values;
      if (rows.length) {
        const [header, ...objects] = rows
        console.log(header)
        return objects.map(row => {
            let obj = {}
            header.forEach(element => {
                let index = header.indexOf(element)
                obj = {...obj, [element]: row[index]}
            });
            return obj
        })
      }
    } catch (err) {
      console.log(err);
    }
    return [];
  }

  module.exports = GetData