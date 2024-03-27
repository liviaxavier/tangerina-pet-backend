// GET https://www.googleapis.com/drive/v2/files?q='BB0CHANGEDIDF5waGdzbUQ5aWs'+in+parents&key={YOUR_API_KEY}

require('dotenv').config()
const googleapis = require('googleapis')
const google = googleapis.google
async function GetImages() {
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
    const items = fileList.data.items.filter(item => {
        return item.parents[0] && item.parents[0].id === '1SZpZqHhrdScgxKgSu9AYCAIV0mNAO0aWWw7SdJyH9EgtgDRoM3drxIHYSHIH0dhj-o9b3OCr'
    }).map(item => ({url: item.thumbnailLink, selfLink: item.selfLink}))
      return items
    } catch (err) {
      console.log(err);
    }
    return [];
  }

  module.exports = GetImages