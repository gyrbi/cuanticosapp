import { paxios } from '../../../Utilities/axios';


//Obtener el carrito 
export const getDonacion = async (id) => {
    try {
        let { data } = await paxios.get(`/api/donacion/canastas/resumen/${id}`);
        //return JSON.stringify(data);
       return data;
    }
    catch (err) {
        throw err;
    }
}