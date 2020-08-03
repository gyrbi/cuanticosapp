const db = require('../../../dao/db');
let objectId = require('mongodb').ObjectId;
const { v4: uidv4 } = require('uuid'); //https://www.npmjs.com/package/uuid //Generar ID único para num_factura con cryptographically-strong random values

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
            if(process.env.ENSURE_INDEX == 1)
            {
                await canastasColl.createIndex({"codigo_interno":1}, {unique:true});
                console.log("Índice de Canastas creado");
            }

            console.log("Colección de Canastas asignada");
        }

        if(!kitsColl)
        {
            let _db = await db.getDB();
            kitsColl = await _db.collection('kits');

            //CREAR AQUI INDICES SI ES NECESARIO!!
            if(process.env.ENSURE_INDEX == 1)
            {
                await kitsColl.createIndex({"codigo_interno":1}, {unique:true});
                console.log("Índice de kits creado");
            }


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

            //CREAR ÍNDICE de num_factura
            if(process.env.ENSURE_INDEX == 1)
            {
                await facturaColl.createIndex({"num_factura":1}, {unique:true});
                console.log("Índice de Factura creado");
            }

            console.log("Colección de Factura asignada"); 
        }

        return;
    }


    //MÉTODOS DE TRABAJO
    static async getAllKits() 
    {
        try 
        {
            let kits = await kitsColl.find();
            return kits.toArray();
        }
        catch (err) 
        {
            console.log(err);
            return err;
        }
    }

    static async getAllCan() 
    {
        try 
        {
            let  canastas = await canastasColl.find();
            return canastas.toArray();
        }
        catch (err) 
        {
            console.log(err);
            return err;
        }
    }


    //Añadir una Canasta o Kit a la "carretilla" (Colección donacion) || Aumentar una unidad a una Canasta o Kit
    static async addOne(id_donante, id_producto, tipo_donacion, tipo_prod)
    {
        try
        {
            let prod;
            let result;
            let filter;

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
                    "estado_donacion": "Vigente",
                    "total": 0 
                };

                await donacionColl.insertOne(newDonacion);
            }

            //Buscar si ya esta el producto en la donación. SE COLOCA SUB-DOCUMENTO.CAMPO
            filter = { "$and": [donacionFilter, {"productos.id_producto": new objectId(prod._id)} ] };
            let hasProd = await donacionColl.findOne(filter);

            //Si el producto ya esta en la donación aumenta la cantidad, su subtotal y el total sino lo inserta y se aumenta el total con su precio
            if(hasProd != null)
            {
                let update = { "$inc": { "productos.$.cantidad": 1, "productos.$.subtotal": prod.precio, "total": prod.precio }, "$set": { "fecha": new Date().getTime()} }; // $ -> Operador de posición que indica el índice del elemento que coincida con 'cantidad'
                result = await donacionColl.updateOne(filter, update);
            }
            else
            {
                let update = { "$push": { "productos": { "id_producto": new objectId(prod._id), "descripcion": prod.descripcion, "cantidad": 1, "precio": prod.precio, "subtotal": prod.precio } }, 
                               "$set": {"fecha": new Date().getTime()}, "$inc":{"total":prod.precio} };
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


    //Disminuir una Unidad de un Producto || Eliminar del todo el registro de uno
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
                filter = { "$and": [donacionFilter, {"productos.id_producto": new objectId(id_producto)}] };              //Se le resta al subtotal y al total el precio de un producto
                update = { "$set": { "productos.$.cantidad": newCant, "fecha": new Date().getTime() }, "$inc": { "productos.$.subtotal": -donacion.productos[pos].precio, "total": -donacion.productos[pos].precio} };
                result = await donacionColl.updateOne(filter, update);
            }
            else
            {
                update = { "$pull": { "productos": { "id_producto": new objectId(id_producto) } }, "$set": { "fecha": new Date().getTime() }, "$inc": { "total": -donacion.productos[pos].subtotal } }; //Se le resta al total el precio del producto eliminado
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


    //Cambiar el Estado de una donación a "Cancelada"
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


    //Mostrar los datos de la Donación Vigente (Ver el "Carrito")
    static async getResumen(id_donante)
    {
        try
        {
            //Tomar los datos de la donación vigente
            let donacionFilter = { "$and": [{ "id_donante": new objectId(id_donante) }, { "estado_donacion": "Vigente" }] };
            let donacion = await donacionColl.findOne(donacionFilter);

            return donacion;
        }
        catch(err)
        {
            console.log(err);
            return err;
        }
    }


    //PAGAR -> Guardar datos en factura y mostrarla al Usuario
    static async getFactura(id_donante, metodo_pago)
    {
        try
        {
            //Tomar los datos de la donación vigente
            let donacionFilter = { "$and": [{ "id_donante": new objectId(id_donante) }, { "estado_donacion": "Vigente" }] };
            let donacion = await donacionColl.findOne(donacionFilter);

            //Crear num_factura
            const num_fac = uidv4(); //Crear ID unico

            //Guardar datos en la factura
            let newFactura = {
                "num_factura": num_fac,
                "fecha": new Date().getTime(),
                "metodo_pago": metodo_pago,
                "tipo_donacion": donacion.tipo_donacion,
                "id_donante": new objectId(id_donante),
                "donacion": donacion.productos,
                "total": donacion.total
            };

            await facturaColl.insertOne(newFactura);
            let factura = await facturaColl.findOne({ "num_factura": num_fac}); //Obtener factura que se acaba de generar

            //Borrar de carretilla la donación
            await donacionColl.deleteOne(donacionFilter);

            return factura;
        }
        catch(err)
        {
            console.log(err);
            return err;
        }
    }

} //Fin exports class

//FUNCION OPERATIVA
// function CalcularTotal(donacion)
// {
//     let array = []; //Array donde se guarda todo
//     let cont = 1; //Contador de filas
//     let cantProd = 0, total = 0;

//     //Recorrer la donacion para guardar los datos de cada producto en el array
//     for (let i = 0; i < donacion.productos.length; i++) 
//     {
//         cantProd += donacion.productos[i].cantidad, //Acumular cantidad de cada producto
//         total += donacion.productos[i].cantidad * donacion.productos[i].precio, //Acumular Subtotal para el Total

//         //Insertar en la cada fila del array los datos del producto
//         array.push([
//             cont, //Fila
//             donacion.productos[i].descripcion, //Descripción
//             donacion.productos[i].cantidad, //Cantidad del producto
//             donacion.productos[i].precio, //Precio Unitario
//             donacion.productos[i].cantidad * donacion.productos[i].precio, //Subtotal
//         ]);

//         cont++; //Aumentar fila para siguiente producto
//     }

//     //Guardar Total de productos y Total a Pagar
//     array.push([cantProd, total]);

//     return array; // arrayDatos PARA PODER MOSTRAR ESTO EN React HAY QUE UTILIZAR UN FOREACH Y ESPECIFICAR LA POSICIÓN DE CADA COLUMNA!!!!
// }


// var doc = { "codigo_interno": "CAN002", "descripcion": "Canasta Pequeña", "descripcion_corta": "Canasta de Alimentos Pequeña", "descripcion_larga": "360g de Leche en Polvo, 1Lb de Pastas Alimenticias, 1Lb de Manteca, 1Lb de Frijoles", "precio": 130, "image_small": "urlimagesmall", "image_large": "imgs/can1.jpg" };
// var doc = { "codigo_interno": "CAN001", "descripcion": "Canasta Básica", "descripcion_corta": "Canasta de Alimentos Básica", "descripcion_larga": "360g de Leche en Polvo, 1Lb de Pastas Alimenticias, 1Lb de Arroz, 1Lb de Azúcar, 1Lb Manteca, 1 bolsa de Pan Molde, 1Lb de Frijoles, 1Lb de Maseca, 1Lb de Sal, 1 bolsa de Café", "precio": 260, "image_small": "urlimagesmall", "image_large": "imgs/can2.jpg"};
// var doc = { "codigo_interno": "CAN003", "descripcion": "Canasta Grande", "descripcion_corta": "Canasta de Alimentos Grande", "descripcion_larga": "720g de Leche en Polvo, 5Lb de Pastas Alimenticias, 3lb de Azúcar, 5Lb de Manteca, 2 bolsas de pan molde, 5Lb de Frijoles, 2lb de Café, 2lb de sal", "precio": 450, "image_small": "urlimagesmall", "image_large": "imgs/can3.jpg" };

// var doc = { "codigo_interno": "KIT001", "descripcion": "Kit Médico", "descripcion_corta": "Kit de suplementos Médicos", "descripcion_larga": "Ibuprofeno, Antidiarréico, Vitaminas, Amoxicilina, Antiácido, Gasas, Paracetamol", "precio": 300, "image_small": "urlimagesmall", "image_large": "imgs/kit1.jpg" }
// var doc = { "codigo_interno": "KIT002", "descripcion": "Kit Educativo", "descripcion_corta": "Kit de insumos escolares básicos", "descripcion_larga": "5 cuadernos de 2 materias, Set de lápices tinta, grafito y borradores, Set de Reglas con tijera, 1 barra de pegamento, Resma de hojas blancas, Papel construcción", "precio": 250, "image_small": "urlimagesmall", "image_large": "imgs/kit2.jpg" };
// var doc = { "codigo_interno": "KIT003", "descripcion": "Kit de Bioseguridad", "descripcion_corta": "Kit de insumos de Bioseguridad básicos", "descripcion_larga": "2 Botes grandes de Gel Antibacterial, Set de 10 mascarillas, Set de 3 Lentes y Caretas Protectoras", "precio": 550, "image_small": "urlimagesmall", "image_large": "imgs/kit3.jpg" };

// var user = { "nombre": "Julio Meza", "email": "juliomeza578@gmail.com", "password": "1234", "password_changed": "", "password_expires":"", "last_login":"", "old_passwords":[], "tipo_cuenta":"Donante", "estado_voluntario":"Activo"};
//var user = { "nombre": "Maria Sosa", "email": "mary007@yahoo.com", "password": "1234", "password_changed": "", "password_expires":"", "last_login":"", "old_passwords":[], "tipo_cuenta":"Donante", "estado_voluntario":"Inactivo"};

//var doc = { "id_donante": ObjectId("5f160aa64bc0745a88042020"), "productos":[], "fecha":"", "tipo_donacion":"ArmaTuCanasta", "estado_donacion":"Cancelada"};
