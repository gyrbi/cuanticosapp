import axios from 'axios';

//Creamos las constantes para separar rutas privadas y públicas
//Les indicamos que las peticiones no guarden caché y el post y put no guarden su contenido en caché

const publicaxios = axios.create();
publicaxios.defaults.headers.common['cache-control'] = "no-cache";
publicaxios.defaults.headers.post['Content-Type'] = "no-cache";
publicaxios.defaults.headers.put['Content-Type'] = "no-cache";

const privateaxios = axios.create();
privateaxios.defaults.headers.common['cache-control'] = "no-cache";
privateaxios.defaults.headers.post['Content-Type'] = "no-cache";
privateaxios.defaults.headers.put['Content-Type'] = "no-cache";

//Se obtiene el valor del JWT (COMILLAS INVERTIDAS) para enviarlo en la autorización de la petición y verificar en el bck si tiene acceso
const setJWT = (jwt)=>{
    privateaxios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
}

//Se exportan las configuraciones con un nombre mas corto
export const naxios = publicaxios;
export const paxios = privateaxios;