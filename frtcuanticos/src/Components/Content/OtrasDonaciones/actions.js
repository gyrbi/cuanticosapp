import axios from 'axios';
import { paxios } from '../../../Utilities/axios'; //Para crear Peticiones a Rutas Privadas


//Añadir Otra Donación
export const addOne = async (nombre_donante, descripcion_donacion, tipo_entrega, fecha_entrega, direccion_entrega, telefono)=>{
    const uri = '/api/donacion/otras/new';

    try
    {
        let { data } = await paxios.post(uri, { "nombdon": nombre_donante, "descdon": descripcion_donacion, "tipoent": tipo_entrega, 
                                                "fechaent": fecha_entrega, "direccent": direccion_entrega, "tel": telefono }); 

    }
    catch(err)
    {
        throw err;
    }
}
