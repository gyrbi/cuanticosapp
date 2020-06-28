const express = require('express');
let router = express.Router();


//sec - Rutas de Seguridad


//POST DE CREAR NUEVA CUENTA
router.post('/register', async (req, res)=>{
    //Body: email, contra, repContra, nom, tipoCuenta
    //Se debe poner una decision para que al Usuario Administrador le aparezza la opcion de tipoCuenta "Administrador"

    res.status(403).json({ "msg":"Crear Nueva Cuenta -> NO IMPLEMENTADO"});

}); //post /register



//PUT RECUPERACION DE CONTRASEÑA
router.put('/recuperacion', async (req, res)=>{
    res.status(403).json({ "msg":"Recupeacion de contraseña"});
}); //put /recuperacion




module.exports = router;