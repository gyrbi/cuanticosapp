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

    static async addOne( nombdon, descdon, tipoent, fechaent, direccent, tel, estadodon ) {
        try{
          const newotras = {nombre_donante:nombdon, descripcion_donacion:descdon, tipo_entrega:tipoent,
        fecha_entrega:fechaent, direccion_entrega:direccent, telefono:tel, estado_donacion:estadodon};
          const result = await  otrasColl.insertOne(newotras);
          return result;
        }catch(err){
          console.log(err);
          return err;
        }
      }

} //Fin exports class

