var express = require('express');
const GetData = require('../functions/getGoogleData');
const GetCategoriesImages = require('../functions/getCategoriesFolder');
var router = express.Router();

router.get('/', async function(req, res, next) {
    const data = await GetData('categorias')
    const images = await GetCategoriesImages()
    res.status(200).json(data.filter(item => item.name).map(category => {
        const Foto_id_i = category.image.split('d/')[1]
        const Foto_id_e = Foto_id_i && Foto_id_i.split('/view')[0]
        let selfLink = images.find(item => item.selfLink.includes(Foto_id_e))
        return {
            ...category,
            image: selfLink ? selfLink.url : category.image,
        }
    }))
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