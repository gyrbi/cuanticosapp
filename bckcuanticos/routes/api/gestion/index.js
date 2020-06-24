const express = require('express');
let router = express.Router();


//gestion - Rutas para Usuario Administrador


//GET SOLICITUDES DE CANASTAS PREDETERMINADAS
router.get('/soliPredt', async (req, res)=>{
    res.status(403).json({ "msg":"Solicitudes Canastas Predeterminadas -> NO IMPLEMENTADO"});
}); //get /soliPredt


module.exports = router;