let db = require('../../dao/db');
let objectId = require('mongodb').ObjectId;

//Colecciones
let canastasColl;
let kitsColl;
let donacionColl;
let facturaColl;


//INICIALIZAR MODELO DE COLECCIONES
module.exports = class
{
    static async initModel()
    {
        if(!canastasColl)
        {
            let _db = await db.getDB();
            canastasColl = await _db.collection('canastas');

            //CREAR AQUI INDICES SI ES NECESARIO!!

            console.log("Colección de Canastas asignada");
        }

        if(!kitsColl)
        {
            let _db = await db.getDB();
            kitsColl = await _db.collection('kits');

            //CREAR AQUI INDICES SI ES NECESARIO!!

            console.log("Colección de Kits asignada");
        }

        if (!donacionColl) 
        {
            let _db = await db.getDB();
            donacionColl = await _db.collection('donacion');

            //CREAR AQUI INDICES SI ES NECESARIO!!

            console.log("Colección de Donación asignada");
        }

        if (!facturaColl) 
        {
            let _db = await db.getDB();
            facturaColl = await _db.collection('factura');

            //CREAR AQUI INDICES SI ES NECESARIO!!

            console.log("Colección de Factura asignada");
        }

        return;
    }


    //MÉTODOS DE TRABAJO

} //Fin exports class
