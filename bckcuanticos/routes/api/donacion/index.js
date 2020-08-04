const express = require('express');
let router = express.Router();


//donacion - Rutas para mostrar pantallas principales de Donacion


//GET DE PANTALLA PRINCIPAL PARA EMPRESAS
router.get('/empresa', async(req, res)=>{
    try{
        
        res.status(200).json({ "msg":"Pantalla principal Empresas"});
    }
    catch(err){
        console.log(err);
        res.status(403).json({ "Error":"Pantalla principal Empresas"});
    }

    
}); //get /empresa

// 	GET Principal Donaciones (Usuario particular)
router.get('/user', async(req,res)=>{
    try{
        
        res.status(200).json({"msg":"Vista del Donante Particular"});
    }
    catch(err){
        console.log(err);
        res.status(403).json({"Error":"Vista del Donante Particular"});
    }
    
});//get /userpar


module.exports = router;