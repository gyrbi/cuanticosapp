const express = require('express');
let router = express.Router();

//GET Resumen de Donaciones del usuario
router.get('/resumendon/:id', async (req, res) => {
    res.status(403).json({"msg":"Resumen de Donacion del Usuario"});
} );// GET /resumendon/:id

module.exports = router;