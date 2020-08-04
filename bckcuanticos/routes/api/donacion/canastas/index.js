const express = require('express');
let router = express.Router();
let model = require('./canastas.model');

const init = async () => {
    await model.initModel();
}
init();


//donacion/canastas - Rutas para manejar "Arma tu Canasta" y "Canastas Predeterminadas"


// 	GET DE OBTENER KITS PARA ArmaTuCanasta
router.get('/armar', async(req,res)=>{
    //res.status(403).json({"msg":"Arma tu canasta"});
    try
    {
        let result = await model.getAllKits();
        res.status(200).json(result);
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({"ERROR": "Algo salió mal :( Por favor intenta de nuevo"});
    }
});//get /armar



// 	GET DE CANASTAS PREDETERMINADAS
router.get('/predt', async(req,res)=>{
    try {
        let result = await model.getAllCan();
        res.status(200).json(result);
    }
    catch (err) {
        console.log(err);
        res.status(500).json("ERROR EN GET CANASTAS");
    }
});//get /predt



// POST DE GUARDAR FACTURA Y DETALLE DE FACTURA
router.post('/pagar/:id', async (req, res)=>{
    res.status(403).json({ "msg":"Factura y Detalle de la Factura'"});
}); //post /pagar/:id



//POST AGREGAR UNA CANASTA O KIT A LA DONACION || AUMENTAR CANTIDAD DE UNA CANASTA O KIT
router.post('/addOne', async (req, res)=>{
    try {
        let { id_donante, id_producto, tipo_donacion, tipo_prod } = req.body;
        let result = model.addOne(id_donante, id_producto, tipo_donacion, tipo_prod);
        res.status(200).json(result);
    }
    catch (err) {
        console.log(err);
        res.status(403).json({ "msg": "Aumentar cantidad de una canasta -> NO IMPLEMENTADO" });
    }
});//post /addOne 



//PUT DISMINUIR UNA CANASTA O KIT PARA LA DONACION DE UN USUARIO
router.put('/DelOne/:id/:canCod', async (req, res)=>{
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




//GET Resumen de Donaciones del usuario
router.get('/resumen/:id', async (req, res) => {
    res.status(403).json({"msg":"Resumen de Donacion del Usuario"});
} );// GET /resumendon/:id


module.exports = router;