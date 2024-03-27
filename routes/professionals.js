var express = require('express');
const GetData = require('../functions/getGoogleData');
var router = express.Router();

router.get('/', async function(req, res, next) {
    const data = await GetData('profissionais')
    res.status(200).json(data)
});

module.exports = router;

