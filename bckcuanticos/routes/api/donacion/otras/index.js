const express = require('express');
let router = express.Router();


//donacion/otras - Rutas para manejar "Otras Donaciones"



//POST NUEVA DONACION
router.post('/new', async (req, res)=>{
    //Body: userCod, itemDsc, itemCant, tipoEntrega, dirEntrega, tel
    
    res.status(403).json({ "msg":"Ingresar nueva 'Otra Donación' -> NO IMPLEMENTADO"});
}); //post /new

//GET Otras Donaciones
router.get('/formOtras', async (req, res) => {
    res.status(403).json({"msg":"Otras Donaciones"});
} );// GET /otrasdonaciones

module.exports = router;