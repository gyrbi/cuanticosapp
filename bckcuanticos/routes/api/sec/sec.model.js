let db = require('../../dao/db');
let objectId = require('mongodb').ObjectId; //Para las búsquedas/updates específicas
let bcrypt = require('bcrypt'); //Para encriptar o desencriptar contraseñas

//Colecciones
let userColl;


//INICIALIZAR MODELO DE COLECCIONES
module.exports = class
{
    static async initModel()
    {
        //Si no esta asignada la colección 
        if(!userColl)
        {   
            let _db = await db.getDB();
            userColl = await _db.collection('usuarios');

            //CREAR AQUI INDICES SI ES NECESARIO!!

            console.log("Colección de Usuarios asignada");
            return;
        }
        else
        {
            return;
        }
    }


    //MÉTODOS DE TRABAJO

} //Fin exports class
