const express = require('express');
let router = express.Router();


//donacion/canastas - Rutas para manejar "Arma tu Canasta" y "Canastas Predeterminadas"


//PUT AUMENTAR CANTIDAD DE UNA CANASTA O KIT
router.put('/addOne/:id/:canCod', async (req, res)=>{
    res.status(403).json({ "msg":"Aumentar cantidad de una canasta -> NO IMPLEMENTADO"});
}); //put /addOne/:id/:canCod


// 	GET DE CANASTAS PREDETERMINADAS
router.get('/predt', async(req,res)=>{
    res.status(403).json({"msg":"Canastas Predeterminadas "});
});//get /predt


// POST DE GUARDAR FACTURA Y DETALLE DE FACTURA
router.post('/pagar/:id', async (req, res)=>{
    res.status(403).json({ "msg":"Factura y Detalle de la Factura'"});
}); //post /pagar/:id
module.exports = router;