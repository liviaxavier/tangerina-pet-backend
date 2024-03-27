var express = require('express');
const GetData = require('../functions/getGoogleData');
var router = express.Router();

router.get('/', async function(req, res, next) {
    const data = await GetData('categorias')
    res.status(200).json(data)
});

// return objects.map((row) => ({
//   id: row[header.indexOf('name') - 1],
//   name: row[header.indexOf('name')],
//   phone: row[header.indexOf('phone')],
//   address: row[header.indexOf('Address')],
//   lat: row[header.indexOf('lat')],
//   lng: row[header.indexOf('lng')]

// }));

module.exports = router;