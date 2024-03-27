var express = require('express');
const GetImages = require('../functions/getImageFolder');
var router = express.Router();

router.get('/', async function(req, res, next) {
    const data = await GetImages()
    res.status(200).json(data)
});

module.exports = router;

