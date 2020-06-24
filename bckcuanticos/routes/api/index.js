var express = require('express');
var router = express.Router();


//api - SUPERCONTROLADOR DE TODAS LAS RUTAS

var donacionRoutes = require('./donacion');
var canastasRoutes = require('./donacion/canastas');
var otrasRoutes = require('./donacion/otras');
var voluntarioRoutes = require('./donacion/voluntario');
var gestionRoutes = require('./gestion');
var secRoutes = require('./sec');

router.use('/donacion', donacionRoutes);
router.use('/donacion/canastas', canastasRoutes);
router.use('/donacion/otras', otrasRoutes);
router.use('/donacion/voluntario', voluntarioRoutes);
router.use('/gestion', gestionRoutes);
router.use('/sec', secRoutes);


module.exports = router;