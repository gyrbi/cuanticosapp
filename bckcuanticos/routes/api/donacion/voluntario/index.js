const express = require('express');
let router = express.Router();

//      CONECTAR CON sec.model.js PARA ACCEDER A LA COLECCIÓN DE USUARIOS


//donacion/voluntario - Rutas para manejar "Voluntariado"

//GET MOSTRAR EL ESTADO DEL USUARIO SI ES VOLUNTARIO O NO
router.get('/infoVolun/:id', async(req, res)=>{
    res.status(403).json({ "msg":"Estado del usuario en voluntariado"});
}); //get /infoVolun/:id

//PUT CAMBIAR ESTADO DE VOLUNTARIADO DEL USUARIO
router.put('/modiVolun/:id', async (req, res)=>{
    //body: estVolun
    res.status(403).json({ "msg": "Cambiar estado de voluntariado del usuario -> NO IMPLEMENTADO"});
});//put /modiVolun/:id


module.exports = router;