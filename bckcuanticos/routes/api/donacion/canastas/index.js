const express = require('express');
let router = express.Router();


//donacion/canastas - Rutas para manejar "Arma tu Canasta" y "Canastas Predeterminadas"


//PUT AUMENTAR CANTIDAD DE UNA CANASTA O KIT
router.put('/addOne/:id/:canCod', async (req, res)=>{
    res.status(403).json({ "msg":"Aumentar cantidad de una canasta -> NO IMPLEMENTADO"});
}); //put /addOne/:id/:canCod


// 	GET DE PAGINA PRINCIPAL 
router.get('/armar', async(req,res)=>{
    res.status(403).json({"msg":"Arma tu canasta"});
});//get /armar

// 	GET DE CANASTAS PREDETERMINADAS
router.get('/predt', async(req,res)=>{
    res.status(403).json({"msg":"Canastas Predeterminadas "});
});//get /predt


// POST DE GUARDAR FACTURA Y DETALLE DE FACTURA
router.post('/pagar/:id', async (req, res)=>{
    res.status(403).json({ "msg":"Factura y Detalle de la Factura'"});
}); //post /pagar/:id

//POST AGREGAR UNA CANASTA O KIT A LA DONACION
router.post('/addOne', async (req, res)=>{
    //body: userCod, canCod, cant, canPrc, fecha
    res.status(403).json({ "msg": "Agregar una canasta o kit a la donacion -> NO IMPLEMENTADO"});
});//post /addOne 

//PUT DISMINUIR UNA CANASTA O KIT PARA LA DONACION DE UN USUARIO
router.put('/DelOne/:id', async (req, res)=>{
    res.status(403).json({ "msg": "Disminuir una canasta o kit a la donacion"});
});//put /DelOne/:id
//GET COMPROBANTE DE PAGO
router.get('/comprobante/:id', async (req, res) => {
    res.status(403).json({"msg":"Comprobacion de Pago -> NO IMPLEMENTADO"});
} );// GET /comprobante/:id

//PUT ESTADO "CANCELADO" PARA LA DONACION DE UN USUARIO
router.put('/CancelAll/:id', async (req, res)=>{
    res.status(403).json({ "msg": "Estado Cancelado para la donacion -> NO IMPLEMENTADO"});
});//put /CancelAll/:id



module.exports = router;