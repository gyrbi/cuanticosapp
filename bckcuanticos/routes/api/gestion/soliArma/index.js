const express = require('express');
let router = express.Router();

//PUT Cambiar estado "Realizada" a una factura especifica de arma tu canasta
router.put('/soliArma/:facCod', async (req, res)=>{
    res.status(403).json({ "msg":"Cambiar a estado REALIZADA a una Factura específica de ARMA TU CANASTA"});
}); //put /soliArma/:facCod

module.exports = router;