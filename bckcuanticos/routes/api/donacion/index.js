const express = require('express');
let router = express.Router();


//donacion - Rutas para mostrar pantallas principales de Donacion


//GET DE PANTALLA PRINCIPAL PARA EMPRESAS
router.get('/empresa', async(req, res)=>{
    res.status(403).json({ "msg":"Pantalla principal Empresas -> NO IMPLEMENTADO"});
}); //get /empresa



module.exports = router;