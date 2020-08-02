let db = require('../../dao/db');
let objectId = require('mongodb').ObjectId; //Para las búsquedas/updates específicas
let bcrypt = require('bcrypt'); //Para encriptar o desencriptar contraseñas

//Colecciones
let userColl;


//API de correo
// const mailgun = require("mailgun-js");
// const DOMAIN = 'sandbox725b4f7eb0d945c6a83e56ef184c93ad.mailgun.org';
// const mg = mailgun({apiKey: process.env.MAILGUN_APIKEY, domain: DOMAIN});


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
            if(process.env.ENSURE_INDEX == "1")
            {
                console.log('Creando Indices de Usuarios');
                await userColl.createIndex({"email":1},{unique:true});
            }

            console.log("Colección de Usuarios asignada");
            return;
        }
        else
        {
            return;
        }
    }


    //MÉTODOS DE TRABAJO

    //agregar uno
    static async addnew( data)
    {
        const{email, contra,  nom, tipoCuenta } = data;
        try
        {

            let filter = {"email": email};
            let user = await userColl.findOne(filter);
            if(user){
                
                var rslt;
                console.log('ya existe!!!!');
                
                return rslt =" Valor resultante ===> NO"; 
            }
            else
            {
                let newUser = 
                {
                    "email" : email,
                    "contra": bcrypt.hashSync(contra, 8),
                    "nombre": nom,
                    "tipoCuenta": tipoCuenta,
                    "estadoVoluntario": "Inactivo",
                    "lastlogin" : null,
                    "lastpasswordchanged" : null,
                    "passwordexpires" : new Date().getTime() + (1000 * 60 * 60 * 24 * 90),
                    "oldpasswords": [],
                    "resetPaswwordToken": null,
                    "resetPasswordExpire": null

                }


                let rslt = await userColl.insertOne(newUser);
                return rslt;
            }
        }
        catch(e)
        {
            console.log(e);
            return e;
        }
    }

    static async guardarTokens(token, expired, email){
        try{
            let filter = {"email": email};

            let update =
             {"$set":{"resetPaswwordToken": token,
             "resetPasswordExpire": expired}
            }
            
            let rslt = await userColl.updateOne(filter,update);
            return rslt;

        }
        catch(e){
            console.log(e);
            return e;

        }
    }

    static async updatePWD(contranew, email){

        try{
            let filtre = {"email": email};

            let update = {
                "$set": 
                {
                    "contra": contranew,
                    "resetPaswwordToken": null,
                    "resetPasswordExpire": null
            
                }

                
            }
            let rslt = await userColl.updateOne(filter,update);

        }catch(e)
        {
            console.err(e);
            return e;
        }
    }

    static async tokenValidation(token){
        try{

            let filtro = {"resetPaswwordToken":token };

            let user = await userColl.findOne(filtro);

            console.log(filtro);


            if(user){
                return 1;
            }

            return 0;

        }
        catch(e)
        {
            console.log(e);
            return e;
        }
    }

   

    static async getByEmail(email)
    {
        try 
        {
            let filter = {"email": email};
            let user = await userColl.findOne(filter);
            return user;
        }
        catch (err) 
        {
          console.log(err);
          return err;
        }
      }
    
    static async comparePassword( rawPassword, cryptedPassword)
    {
        try 
         {
             return bcrypt.compareSync(rawPassword, cryptedPassword);
         }
        catch (err)
         {
             return false;
         }
    }

//   static async getbyToken(token){
//       try{
//           let filter = {"resetPaswwordToken": token, };
//           let user = await userColl.findOne(filter);
//           return user;
//       }
//       catch(e)
//       {
//           console.log(e);
//           return e;
//       }
//   }

    //pruebas de modelos
  


} //Fin exports class
