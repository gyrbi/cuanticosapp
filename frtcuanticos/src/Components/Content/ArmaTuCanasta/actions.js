import axios from 'axios';
import { paxios } from '../../../Utilities/axios'; //Para crear Peticiones a Rutas Privadas


//Obtener Todas de las Canastas
export const getCanastas = async()=>{
    const uri = '/api/donacion/canastas/predt';

    try
    {
        let { data } = await paxios.get(uri); //ENTRE {} PORQUE VIENEN VARIOS REGISTROS. //SIEMPRE SE PONE data!!!
        return data;
    }
    catch(err)
    {
        throw err;
    }
}

//Obtener todos los Kits
export const getKits = async()=>{
    const uri = '/api/donacion/canastas/armar';

    try
    {
        let { data } = await paxios.get(uri);
        return data;
    }
    catch(err)
    {   
        throw err;
    }
}

//Añadir una Canasta o Kit a la "carretilla" (Colección donacion) || Aumentar una unidad a una Canasta o Kit
export const addOne = async (id_donante, id_producto, tipo_donacion, tipo_prod)=>{
    const uri = '/api/donacion/canastas/addOne';

    try
    {
        let { data } = await paxios.post(uri, { "id_donante": id_donante, "id_producto": id_producto, 
                                               "tipo_donacion": tipo_donacion, "tipo_prod": tipo_prod });
    }
    catch(err)
    {
        throw err;
    }
}