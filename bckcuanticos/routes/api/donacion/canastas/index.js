const express = require('express');
const { Router } = require('express');
let router = express.Router();


//donacion/canastas - Rutas para manejar "Arma tu Canasta" y "Canastas Predeterminadas"

//POST AGREGAR UNA CANASTA
router.post('/addOne', async(req, res)=> {
    res.status(403).json({"msg": "Agregar Una canasta a la Donacion -> No Implementado"});
    //body userCod, canCod, cant, canPcr, fecha
});//Post addOne

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


//GET COMPROBANTE DE PAGO
Router.get('/comprobante/:id', async (req, res) => {
    res.status(403).json({"msg":"Comprobacion de Pagon -> NI IMPLEMENTADO"});
} );// GET /comprobante/:id

module.exports = router;