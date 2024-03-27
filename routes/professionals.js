var express = require('express');
const GetData = require('../functions/getGoogleData');
const GetImages = require('../functions/getImageFolder');
var router = express.Router();

router.get('/', async function(req, res, next) {
    const images = await GetImages()
    const data = await GetData('profissionais')
    res.status(200).json(data.filter(item => item.Nome).map(professional => {
        const Foto_id_i = professional.Foto.split('d/')[1]
        const Foto_id_e = Foto_id_i && Foto_id_i.split('/view')[0]
        let selfLink = images.find(item => item.selfLink.includes(Foto_id_e))
        return {
            ...professional,
            Foto: selfLink ? selfLink.url : professional.Foto,
        }
    }))
});

module.exports = router;

