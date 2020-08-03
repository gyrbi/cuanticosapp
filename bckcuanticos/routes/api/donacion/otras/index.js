const express = require('express');
let router = express.Router();
let model = require('./otras.model');

const init = async () => {
    await model.initModel();
}
init();


//donacion/otras - Rutas para manejar "Otras Donaciones"



//POST NUEVA DONACION
router.post('/new', async (req, res)=>{
    //Body: userCod, itemDsc, itemCant, tipoEntrega, dirEntrega, tel
    
    router.post('/new', async (req, res) => {
        //Body: userCod, itemDsc, itemCant, tipoEntrega, dirEntrega, tel

        //res.status(403).json({ "msg":"Ingresar nueva 'Otra Donación' -> NO IMPLEMENTADO"});
        try {
            let { nombdon, descdon, tipoent, fechaent, direccent, tel } = req.body;
            const result = await model.addOne(nombdon, descdon, tipoent, fechaent, direccent, tel);
            res.status(200).json(result);
        }
        catch (err) {
            //res.status(403).json({ "msg": "Agregar una canasta o kit a la donacion -> NO IMPLEMENTADO"});
            res.status(403).json({ "ERROR": "ERROR" });
        }
    }); //post /new

}); //post /new

//GET Otras Donaciones
router.get('/formOtras', async (req, res) => {
    res.status(403).json({"msg":"Otras Donaciones"});
} );// GET /otrasdonaciones

module.exports = router;