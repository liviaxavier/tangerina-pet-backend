var express = require('express');
const GetCategoriesImages = require('../functions/getCategoriesFolder');
var router = express.Router();

router.get('/', async function(req, res, next) {
    const data = await GetCategoriesImages()
    res.status(200).json(data)
});

module.exports = router;