import axios from 'axios';
import { paxios } from '../../../Utilities/axios'; 


//Obtener factura
export const getFactura = async(id,met_pago)=>{
    const uri = '/api/donacion/canastas/pagar/:id';

    try
    {
        let { data } = await paxios.get(uri,{"id_donante": id, "metodo_pago":met_pago}); 
        return data;
    }
    catch(err)
    {
        throw err;
    }
}