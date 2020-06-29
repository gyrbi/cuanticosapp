const express = require('express');
let router = express.Router();

//GET Ver cuenta registrada de un usuario especifico 
router.get('/cuentareg/:id', async (req, res)=>{
    res.status(403).json({ "msg":"Ver cuenta registrada de un usuario especifico"});
}); //get /cuenta reg/:id

module.exports = router;