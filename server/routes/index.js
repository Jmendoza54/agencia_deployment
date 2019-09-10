const express = require('express');
const router = express.Router();

const nosotrosCon = require('../controllers/nosotrosController');
const homeCon = require('../controllers/homeController');
const viajesCon = require('../controllers/viajesController');
const testiCon = require('../controllers/testimonialesController');

module.exports = function(){
    router.get('/', homeCon.homepageController);
    router.get('/nosotros', nosotrosCon.infoNosotros);
    router.get('/viajes', viajesCon.showViajes);
    router.get('/viajes/:id', viajesCon.getDataViaje);
    router.get('/testimoniales', testiCon.showTestimoniales);
    //Cuando se llena el formulario
    router.post('/testimoniales', testiCon.formTestimoniales);

    return router;
}