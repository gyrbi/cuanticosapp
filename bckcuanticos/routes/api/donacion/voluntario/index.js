const express = require('express');
let router = express.Router();
let secModel = require('./sec.model');

let  init = async ()=>{
    await secModel.initModel();
  }
  init();


//      CONECTAR CON sec.model.js PARA ACCEDER A LA COLECCIÓN DE USUARIOS


//donacion/voluntario - Rutas para manejar "Voluntariado"

//GET MOSTRAR EL ESTADO DEL USUARIO SI ES VOLUNTARIO O NO
router.get('/infoVolun/:email', async(req, res)=>{
    try {
        let { email } = req.params;
        const result = await model.getByEmail(email);
        res.status(200).json(result.estadoVoluntario);
    }
    catch (err) {
        res.status(403).json({ "ERROR": "ERROR" });
    }
    res.status(403).json({ "msg":"Estado del usuario en voluntariado"});
}); //get /infoVolun/:id

//PUT CAMBIAR ESTADO DE VOLUNTARIADO DEL USUARIO
router.put('/modiVolun/:email/:estado', async (req, res)=>{
    //body: estVolun
    try {
        let { email, estado } = req.params;
        const result = await model.putModVolun(email, estado);
        res.status(200).json(result);
    } catch (err) {
        res.status(403).json({ "ERROR": "ERROR" });
    }
    res.status(403).json({ "msg": "Cambiar estado de voluntariado del usuario -> NO IMPLEMENTADO"});
});//put /modiVolun/:id



module.exports = router;