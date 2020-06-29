const express = require('express');
let router = express.Router();

//GET Otras Donaciones
router.get('/otrasdonaciones', async (req, res) => {
    res.status(403).json({"msg":"Otras Donaciones"});
} );// GET /otrasdonaciones

module.exports = router;