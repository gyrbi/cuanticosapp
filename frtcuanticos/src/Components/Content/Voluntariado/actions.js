import axios from 'axios';
import { paxios } from '../../../Utilities/axios'; //Para crear Peticiones a Rutas Privadas


//Añadir Otra Donación

export const getUserVol = async (email)=>{
    const uri = '/api/donacion/voluntario/infoVolun/:email';

    try
    {
        let { data } = await paxios.get(uri, `${email}`);
        return data;

    }
    catch(err)
    {
        throw err;
    }
}

export const putUserVol = async (email, estado)=>{
    const uri = '/api/donacion/voluntario/modiVolun/:`${email}`/:`${estado}`';

    try
    {
        let { data } = await paxios.put(uri); 
        

    }
    catch(err)
    {
        throw err;
    }
}
