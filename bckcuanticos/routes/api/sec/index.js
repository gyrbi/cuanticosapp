const express = require('express');
let router = express.Router();

var jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');

let secModel = require('./sec.model');


// const mailgun = require("mailgun-js");
// const DOMAIN = 'sandbox725b4f7eb0d945c6a83e56ef184c93ad.mailgun.org';
// const mg = mailgun({apiKey: process.env.MAILGUN_APIKEY, domain: DOMAIN});

let  init = async ()=>{
    await secModel.initModel();
  }
  init();

//sec - Rutas de Seguridad

//POST DE CREAR NUEVA CUENTA
router.post('/register', async (req, res)=>{
    //Body: email, contra, repContra, nom, tipoCuenta
    //Se debe poner una decision para que al Usuario Administrador le aparezza la opcion de tipoCuenta "Administrador"
    try {
            var rslt = await secModel.addnew(req.body);
            if(rslt == "no")
            {
                res.status(200).json({"msg": "Usuario ya Existe!!"});
                console.log(rslt);
            }
            else
            {
                console.log(rslt);
                res.status(200).json({ "msg": "Usuario Creado" });
            }
           
      } catch (err) 
      {
        res.status(500).json({ "error": "Algo Sucendió mal!!" });
      }
}); //post /register



//PUT RECUPERACION DE CONTRASEÑA
router.post('/recuperacion', async (req, res)=>{
    try
    {
        var {email} = req.body;
        var usuario = await secModel.getByEmail(email);

        if(!usuario)
        {
            res.status(401).json({"error": "correo electronico Incorrecto"});
           // return res.redirect('/recuperacion');
        }
        else{
            const { email, _id } = usuario;
            const jUser = { email, _id };
            var token = jwt.sign(jUser, process.env.JWT_SECRET, {expiresIn: '120m'});
            var restpswdexpired = new Date().getTime() + 3600000; // 1 hora
            
            await secModel.guardarTokens(token, restpswdexpired, email)
          
                // nodemailer.createTestAccount((err,account)=>{
                //     if(err) {

                //     }
                    var smtpTransport = nodemailer.createTransport(
                        {
                            service:'Gmail',
                            //service: 'gmail',
                            type: "SMTP",
                            host: "smtp.gmail.com",
                            secure: true,
                               auth: 
                               {
                                   user: 'cuanticosapp@gmail.com',
                                   pass: 'sediceatomico'
                               }
                        });
               
                       //console.log("comidaaaa!!!")
                       smtpTransport.sendMail( {
                            from: 'cuanticosapp@gmail.com',
                            to: usuario.email,
                            subject: 'node.js Password Reset',
                            text:  'peticion de recuperacion de contraseña enviada.\n\n' +
                            'porfavor sigue las instrucciones:\n\n' +
                            'http://' + process.env.URI+ '/api/sec/recuperacion/:' + token + '\n\n' +
                            ' Visita el Link para recuperar tu contraseña.\n'});

                         res.status(200).json({"info": 'el correo ha sido enviado  a ' + usuario.email + ' Sigue las Instrucciones'});
                          // return res.redirect('/recuperacion');
                          //.catch(err => console.error(err));
                       
                        
                       
                       // res.status(200).json({"msg": "Token de Recuperacion de contraseña enviado"});

                // });     
        }      
    }
    catch(e)
    {
        console.log(e);
        return e;
    }
}); //put /recuperacion

router.get('/recuperacion/:token',async(req,res)=>{
   try
   {
     
     let token1 = req.params.token;

     let val = await secModel.tokenValidation(token1);

     if(val == 1){
         console.log("valor de token invalido");
         res.status(500).json({"msg": "Error!! token ha expirado o es Invalido!"});
     }
     res.status(200).json("medio funciona");

     console.log("manda ruta post");
     res.redirect.post('../recuperacion-form/:token');
   }
   catch(e)
   {

   }

});


router.post('/recuperacion-form/:token', async(req,res) =>
{
    try
    {
        res.status(200).json('funciona');

        let token1 = req.params.token;
        let val = await secModel.tokenValidation(token1);

        if(val == 1){
            const {email, _id} = val;

            var {contra} = req.body;

            await secModel.updatePWD(contra,email);
        }
    }
    catch(e)
    {
        console.error(e);
        return e;

    }
});



//POST INICIO DE SESION
router.post('/login', async(req, res)=>{
    //Body: email, contra
    try
    {
        var {email, contra} = req.body;
        var usuario = await secModel.getByEmail(email);
        //validaciones
        if( await secModel.comparePassword(contra, usuario.contra))
        {
            const { email, _id, tipoCuenta }= usuario;
            const jUsuario = { email, _id, tipoCuenta};
            console.log(jUsuario);
            let token = jwt.sign(jUsuario, process.env.JWT_SECRET, {expiresIn: '120m'});
            res.status(200).json(
                {
                    ...jUsuario, jwt: token
                }
            );
        
        }
        else
        {
            res.status(401).json({"error":"Credenciales Incorrectas"});
        }
    }
    catch(e)
    {
        res.status(500).json({ "error": "Algo Sucendió mal!!" });
    }
    
});//post /login




module.exports = router;