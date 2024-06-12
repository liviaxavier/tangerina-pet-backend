// GET https://www.googleapis.com/drive/v2/files?q='BB0CHANGEDIDF5waGdzbUQ5aWs'+in+parents&key={YOUR_API_KEY}

require('dotenv').config()
const googleapis = require('googleapis')
const google = googleapis.google
async function GetCategoriesImages() {
    try {
      const target = ['https://www.googleapis.com/auth/drive.readonly'];
      const jwt = new google.auth.JWT(
        process.env.CLIENT_EMAIL,
        null,
        (process.env.PRIVATE_KEY || '').replace(/\\n/g, '\n'),
        target
      );
        
      const folder = google.drive({version: 'v2', auth: jwt})// google.sheets({ version: 'v4', auth: jwt });
      const fileList = await folder.files.list() // await folder.files.list() 
      const items = fileList.data.items.map(item => ({url: item.thumbnailLink, selfLink: item.selfLink}))
    // .map(item => ({parents: item.parents}))
      return items
    } catch (err) {
      console.log(err);
    }
    return [];
  }

  module.exports = GetCategoriesImages