import axios from 'axios';
import { paxios } from '../../../Utilities/axios'; //Para crear Peticiones a Rutas Privadas


//Añadir otra canasta
export const addOne = async (nombre_donante, descripcion_donacion, tipo_entrega, fecha_entrega, direccion_entrega,
    telefono, estado_donacion)=>{
    const uri = '/api/donacion/otras/new';

    try
    {
        let { data } = await paxios.post(uri, { "nombre_donante": nombre_donante, "descripcion_donacion": descripcion_donacion, 
                                               "tipo_entrega": tipo_entrega, "fecha_entrega": fecha_entrega, "direccion_entrega":direccion_entrega,
                                            "telefono":telefono, "estado_donacion":estado_donacion });
    }
    catch(err)
    {
        throw err;
    }
}
