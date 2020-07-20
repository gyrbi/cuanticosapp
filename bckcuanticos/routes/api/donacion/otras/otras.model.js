let db = require('../../dao/db');
let objectId = require('mongodb').ObjectId; //Para las búsquedas/updates específicas

//Colecciones
let otrasColl;


//INICIALIZAR MODELO DE COLECCIONES
module.exports = class 
{
    static async initModel() 
    {
        //Si no esta asignada la colección 
        if (!otrasColl) 
        {
            let _db = await db.getDB();
            otrasColl = await _db.collection('otrasDonaciones');

            //CREAR AQUI INDICES SI ES NECESARIO!!

            console.log("Colección de Otras Donaciones asignada");
            return;
        }
        else 
        {
            return;
        }
    }


    //MÉTODOS DE TRABAJO

} //Fin exports class

