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
        res.status(500).json({"ERROR": "Algo salió mal en obtener Kits :( Por favor intenta de nuevo"});
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
    try 
    {

        let { id } = req.params;
        let { metodo_pago } = req.body;
        let result = await model.getFactura(id, metodo_pago);
        res.status(200).json(result);

    }
    catch (err) 
    {
        console.log(err);
        res.status(500).json({ "msg": "Algo Salio Mal en Pagar y Guardar Factura" });
    };
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
        res.status(403).json({ "msg": "Aumentar cantidad de una canasta" });
    }
});//post /addOne 



//PUT DISMINUIR UNA CANASTA O KIT PARA LA DONACION DE UN USUARIO
router.put('/DelOne/:id/:canCod', async (req, res)=>{
    try 
    {

        let { id, canCod } = req.params;
        let result = await model.delOne(id, canCod);
        res.status(200).json(result);

    }
    catch (err) 
    {
        console.log(err);
        res.status(500).json({ "msg": "Algo Salio Mal en Borrar una unidad" });
    }
});//put /DelOne/:id



//GET COMPROBANTE DE PAGO
router.get('/comprobante/:id', async (req, res) => {
    res.status(403).json({"msg":"Comprobacion de Pago -> NO IMPLEMENTADO"});
} );// GET /comprobante/:id



//PUT ESTADO "CANCELADO" PARA LA DONACION DE UN USUARIO
router.put('/CancelAll/:id', async (req, res)=>{
    try 
    {

        let { id } = req.params;
        let result = await model.cancelAll(id);
        res.status(200).json(result);

    }
    catch (err) 
    {
        console.log(err);
        res.status(500).json({ "msg": "Algo Salio Mal en CancelAll" });
    }
});//put /CancelAll/:id




//GET Resumen de Donaciones del usuario
router.get('/resumen/:id', async (req, res) => {
    try 
    {

        let { id } = req.params;
        let result = await model.getResumen(id);
        res.status(200).json(result);

    }
    catch (err) 
    {
        console.log(err);
        res.status(500).json({ "msg": "Algo Salio Mal al Obtener el Resumen de Compra" });
    }
} );// GET /resumendon/:id


module.exports = router;