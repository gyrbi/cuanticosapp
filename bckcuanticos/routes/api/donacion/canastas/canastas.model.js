const db = require('../../../dao/db');
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

    //Añadir una Canasta o Kit a la "carretilla" (Colección donacion)
    static async addOne(id_donante, id_producto, tipo_donacion, tipo_prod)
    {
        try
        {
            let prod;
            let result;
            let filter

            //Buscar producto según si agregó una canasta o un Kit a la donación
            filter = { "_id": new objectId(id_producto) };

            if(tipo_prod == "CAN")
            {
                prod = await canastasColl.findOne(filter);
            }
            else
            {
                prod = await kitsColl.findOne(filter);
            }

            //Filtro para buscar si el usuario ya tiene una donacion Vigente
            let donacionFilter = { "$and":[{"id_donante": new objectId(id_donante)}, {"estado_donacion":"Vigente"}] };
            let donacion = await donacionColl.findOne(donacionFilter);

            //Si no hay una donacion se crea una nueva
            if(donacion == null)
            {
                let newDonacion = {
                    "id_donante": new objectId(id_donante),
                    "fecha": new Date().getTime(),
                    "tipo_donacion": tipo_donacion,
                    "estado_donacion": "Vigente" 
                };

                await donacionColl.insertOne(newDonacion);
            }

            //Buscar si ya esta el producto en la donación. SE COLOCA SUB-DOCUMENTO.CAMPO
            filter = { "$and": [donacionFilter, {"productos.id_producto": new objectId(prod._id)} ] };
            let hasProd = await donacionColl.findOne(filter);

            //Si el producto ya esta en la donación aumenta la cantidad, sino lo inserta
            if(hasProd != null)
            {
                let update = { "$inc":{"productos.$.cantidad": 1}, "$set":{"fecha": new Date().getTime()} }; // $ -> Operador de posición que indica el índice del elemento que coincida con 'cantidad'
                result = await donacionColl.updateOne(filter, update);
            }
            else
            {
                let update = { "$push": { "productos": { "id_producto": new objectId(prod._id), "descripcion": prod.descripcion, "cantidad": 1, "precio": prod.precio } }, 
                               "$set": {"fecha": new Date().getTime()} };
                result = await donacionColl.updateOne(donacionFilter, update);
            }

            return result;
        }
        catch(err)
        {
            console.log(err);
            return err;
        }
    }


    //Disminuir una Unidad de un Producto
    static async delOne(id_donante, id_producto)
    {
        try
        {
            let pos;
            let filter;
            let update;
            let result;

            //Tomar los datos de la donación vigente
            let donacionFilter = { "$and": [{ "id_donante": new objectId(id_donante)}, {"estado_donacion":"Vigente"}] };
            let donacion = await donacionColl.findOne(donacionFilter);

            //Recorre los datos de la donación vigente para obtener la posición en el documento del producto buscado
            for(let i=0; i<donacion.productos.length; i++)
            {
                //Si hay una coincidencia, se guarda la posición y se termina el ciclo
                if( donacion.productos[i].id_producto == id_producto )
                {
                    pos = i;
                    i = donacion.productos.length;
                }
            }

            //Verificar si al eliminar una unidad todavia quedan unidades, sino se elimina todo el registro del producto
            let newCant = donacion.productos[pos].cantidad - 1;

            if( newCant > 0 )
            {
                filter = { "$and": [donacionFilter, {"productos.id_producto": new objectId(id_producto)}] };
                update = { "$set": { "productos.$.cantidad": newCant, "fecha": new Date().getTime() } };
                result = await donacionColl.updateOne(filter, update);
            }
            else
            {
                update = { "$pull": { "productos": { "id_producto": new objectId(id_producto) } }, "$set": { "fecha": new Date().getTime() } };
                result = await donacionColl.updateOne(donacionFilter, update);
                donacion = await donacionColl.findOne(donacionFilter); //OBTENER DONACIÓN ACTUALIZADA
            }

            //Si no queda ningún producto, la donación se cancela
            if( donacion.productos.length == 0 )
            {
                update = { "$set": { "estado_donacion": "Cancelada", "fecha": new Date().getTime()} };
                result = await donacionColl.updateOne(donacionFilter, update);
            }

            return result;
            //update = { "$unset": { "productos.$.id_producto": "", "productos.$.descripcion": "", "productos.$.cantidad": "", "productos.$.precio":""} };
        }
        catch(err)
        {
            console.log(err);
            return err;
        }
    }


    //Cancelar toda la donación
    static async cancelAll(id_donante)
    {
        try
        {
            //Tomar los datos de la donación vigente
            let donacionFilter = { "$and": [{ "id_donante": new objectId(id_donante) }, { "estado_donacion": "Vigente" }] };
            
            //Colocar Estado Cancelada
            let update = { "$set": { "estado_donacion": "Cancelada", "fecha": new Date().getTime() } };
            let result = await donacionColl.updateOne(donacionFilter, update);

            return result;
        }
        catch(err)
        {
            console.log(err);
            return err;
        }
    }


    //Mostrar los datos de la Donación (Ver el "Carrito"). SE MUESTRAN CAMPOS TOTALES CALCULADOS
    static async getResumen(id_donante)
    {
        try
        {
            //Tomar los datos de la donación vigente
            let donacionFilter = { "$and": [{ "id_donante": new objectId(id_donante) }, { "estado_donacion": "Vigente" }] };
            let donacion = await donacionColl.findOne(donacionFilter);

            let arrayDatos = []; //Array donde se guarda todo
            let cont = 1; //Contador de filas
            let cantProd = 0, total = 0;

            //Recorrer la donacion para guardar los datos de cada producto en el array
            for (let i = 0; i < donacion.productos.length; i++) 
            {
                cantProd += donacion.productos[i].cantidad, //Acumular cantidad de cada producto
                total += donacion.productos[i].cantidad * donacion.productos[i].precio, //Acumular Subtotal para el Total

                //Insertar en la cada fila del array los datos del producto
                arrayDatos.push([
                    cont, //Fila
                    donacion.productos[i].descripcion, //Descripción
                    donacion.productos[i].cantidad, //Cantidad del producto
                    donacion.productos[i].precio, //Precio Unitario
                    donacion.productos[i].cantidad * donacion.productos[i].precio, //Subtotal
                ]);

                cont++; //Aumentar fila para siguiente producto
            }

            //Guardar Total de productos y Total a Pagar (arrayDatos[2])
            arrayDatos.push([cantProd, total]);

            return arrayDatos; //PARA PODER MOSTRAR ESTO EN React HAY QUE UTILIZAR UN FOREACH Y ESPECIFICAR LA POSICIÓN DE CADA COLUMNA!!!!
        }
        catch(err)
        {
            console.log(err);
            return err;
        }
    }


} //Fin exports class


// var doc = { "codigo_interno": "CAN001", "descripcion": "Canasta Básica", "descripcion_corta": "Canasta de Alimentos Básica", "descripcion_larga": "Canasta de Alimentos Básica", "precio": 260, "image_small": "urlimagesmall", "image_large": "urlimagelarge"};
// var doc = { "codigo_interno": "CAN001", "descripcion": "Canasta Básica", "descripcion_corta": "Canasta de Alimentos Básica", "descripcion_larga": "Canasta de Alimentos Básica", "precio": 260, "image_small": "urlimagesmall", "image_large": "urlimagelarge" };

// var doc = { "codigo_interno": "KIT001", "descripcion": "Kit Médico", "descripcion_corta": "Kit de suplementos Médicos", "descripcion_larga": "Kit completo de medicinas de uso común", "precio": 300, "image_small": "urlimagesmall", "image_large": "urlimagelarge" };
// var doc = { "codigo_interno": "KIT001", "descripcion": "Kit Médico", "descripcion_corta": "Kit de suplementos Médicos", "descripcion_larga": "Kit completo de medicinas de uso común", "precio": 300, "image_small": "urlimagesmall", "image_large": "urlimagelarge" };

// var user = { "nombre": "Julio Meza", "email": "juliomeza578@gmail.com", "password": "1234", "password_changed": "", "password_expires":"", "last_login":"", "old_passwords":[], "tipo_cuenta":"Donante", "estado_voluntario":"Activo"};
//var user = { "nombre": "Maria Sosa", "email": "mary007@yahoo.com", "password": "1234", "password_changed": "", "password_expires":"", "last_login":"", "old_passwords":[], "tipo_cuenta":"Donante", "estado_voluntario":"Inactivo"};

//var doc = { "id_donante": ObjectId("5f160aa64bc0745a88042020"), "productos":[], "fecha":"", "tipo_donacion":"ArmaTuCanasta", "estado_donacion":"Cancelada"};
