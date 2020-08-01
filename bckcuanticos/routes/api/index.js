var express = require('express');
var router = express.Router();


var passport = require('passport');
var passportJWT = require('passport-jwt');

var strategyJWT = passportJWT.Strategy; //Clase para definir la estrategia de autenticación
var extractJWT = passportJWT.ExtractJwt; //Clase para extraer el JWT

//Utlizamos en passport para crear una nueva estrategia de autenticación con JWT
passport.use(
    new strategyJWT(
        {
            jwtFromRequest: extractJWT.fromAuthHeaderAsBearerToken(), //Extraer de la solicitud el JWT en forma de Bearer Token 
            secretOrKey: process.env.JWT_SECRET //Tomar la clave para desencriptar el token
        },
        //El segundo parámetro es una función anónima donde están todos los datos guardados del Login y el next para seguir con la sig ruta
        (payload, next)=>{
            var user = payload; //Datos del Login
            return next(null, user); //Retornar a la siguiente ruta con los datos del usuario
        }
    )
)


//api - SUPERCONTROLADOR DE TODAS LAS RUTAS

var donacionRoutes = require('./donacion');
var canastasRoutes = require('./donacion/canastas');
var otrasRoutes = require('./donacion/otras');
var voluntarioRoutes = require('./donacion/voluntario');
var gestionRoutes = require('./gestion');
var secRoutes = require('./sec');


//RUTAS PÚBLICAS
router.use('/sec', secRoutes);


//RUTAS PRIVADAS
//Crear un Middleware para que active la estrategia y autentique a entrar a las rutas solo a los usuarios cuyo JWT lo permite
const jwtMiddleware = passport.authenticate('jwt', {session: false});

router.use('/donacion', jwtMiddleware, donacionRoutes);
router.use('/donacion/canastas', jwtMiddleware, canastasRoutes);
router.use('/donacion/otras', jwtMiddleware, otrasRoutes);
router.use('/donacion/voluntario', jwtMiddleware, voluntarioRoutes);
router.use('/gestion', jwtMiddleware, gestionRoutes);


module.exports = router;