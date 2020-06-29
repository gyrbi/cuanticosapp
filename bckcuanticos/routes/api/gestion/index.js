const express = require('express');
let router = express.Router();


//gestion - Rutas para Usuario Administrador

///	GET DE PAGINA PRINCIPAL DEL ADMINISTRADOR
router.get('/admin', async (req, res)=>{
    res.status(403).json({ "msg":"Administrador"});
}); //get /admin


//GET SOLICITUDES DE CANASTAS PREDETERMINADAS
router.get('/soliPredt', async (req, res)=>{
    res.status(403).json({ "msg":"Solicitudes Canastas Predeterminadas -> NO IMPLEMENTADO"});
}); //get /soliPredt

//PUT DE CAMBIAR ESTADO DE FACTURA A REALIZADA  A FACTURA ESPECIFICA DE CANASTA PREDETERMINADA 
router.put('/soliPredt/:facCod', async (req, res)=>{
    res.status(403).json({ "msg":"Cambiar a estado REALIZADA a una Factura específica de Canasta Predeterminada"});
}); //put /soliPredt/:facCod

//PUT DE CAMBIAR ESTADO A FACTURA ESPECIFICA DE OTRAS DONACIONES 
router.put('/soliOtras/:facCod', async (req, res)=>{
    res.status(403).json({ "msg":"Cambiar a estado REALIZADA a una Factura específica de Otras Donaciones"});
}); //put /soliOtras/:facCod

//GET VER SOLICITUDES DE OTRAS DONACIONES
router.get('/soliOtras', async (req, res)=>{
    res.status(403).json({ "msg":"Ver solicitudes de otras donaciones -> NO IMPLEMENTADO"});
}); //get /soliOtras

module.exports = router;