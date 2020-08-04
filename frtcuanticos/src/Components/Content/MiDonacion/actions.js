import axios from 'axios';
import { paxios } from '../../../Utilities/axios'; 


//Obtener el carrito 
export const getDonacion = async(id)=>{
    const uri = '/api/donacion/canastas/resumen/:id';

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