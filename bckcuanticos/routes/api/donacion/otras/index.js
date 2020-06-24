const express = require('express');
let router = express.Router();


//donacion/otras - Rutas para manejar "Otras Donaciones"



//POST NUEVA DONACION
router.post('/new', async (req, res)=>{
    //Body: userCod, itemDsc, itemCant, tipoEntrega, dirEntrega, tel
    
    res.status(403).json({ "msg":"Ingresar nueva 'Otra Donación' -> NO IMPLEMENTADO"});
}); //post /new


module.exports = router;