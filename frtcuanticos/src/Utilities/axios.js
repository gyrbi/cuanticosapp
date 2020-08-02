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
export const setJWT = (jwt)=>{
    privateaxios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
}


// //Interceptor que al recibir un 401 "No Autorizado" resetea los datos con un Logout y manda al usuario al login
export const setUnAuthInterceptor = (logoutHandler) =>{
    //Intercepta la respuesta
    privateaxios.interceptors.response.use(
        (response)=>{
            return response; //Si está todo bien, devuelve la respuesta
        },
        (error)=>{
            //Si hay un error en la respuesta, busca el error por status y activa el control de deslogueo (setLoggoutData)
            console.log("INTERCEPTOR ERROR: "+error);
            if(error.response)
            {
                switch(error.response.status)
                {
                    case 401:
                        logoutHandler();
                    break;

                    default:
                        console.log(error);
                }
            }
            else
            {
                console.log(error); //Si es otro tipo de error
            }

            return Promise.reject(error);
        }
    )
}


//Se exportan las configuraciones con un nombre mas corto
export const naxios = publicaxios;
export const paxios = privateaxios;


// MANEJO DEL GUARDADO LOCAL

//Verificar si está disponible el guardado local en el browser al guardar y eliminar un Item
const localStorageAvailable = (
()=>{
    let t = "t";

    try
    {
        localStorage.setItem(t, t);
        localStorage.removeItem(t);
        return true;
    }
    catch(err)
    {
        return false;
    }
}
)() //Doble () para que se ejecute al inicio

//Si está disponible, obtener el un item almacenado en el guardado local
export const getLocalStorage = (key)=>{
    if(localStorageAvailable)
    {
        return localStorage.getItem(key);
    }
    else
    {
        return null;
    }
}

//Si está disponible, setear un item con un valor
export const setLocalStorage = (key, value) => {
    if (localStorageAvailable) 
    {
        localStorage.setItem(key, value);
        return true;
    }
    else 
    {
        return false;
    }
}

//Si está disponible, eliminar un item
export const removeLocalStorage = (key) => {
    if (localStorageAvailable) 
    {
        localStorage.removeItem(key);
        return true;
    }
    else 
    {
        return false;
    }
}

