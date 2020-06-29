const express = require('express');
let router = express.Router();


//donacion/voluntario - Rutas para manejar "Voluntariado"

//PUT CAMBIAR ESTADO DE VOLUNTARIADO DEL USUARIO
router.put('/modiVolun/:id', async (req, res)=>{
    //body: estVolun
    res.status(403).json({ "msg": "Cambiar estado de voluntariado del usuario -> NO IMPLEMENTADO"});
});//put /modiVolun/:id


module.exports = router;