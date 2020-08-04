import axios from 'axios';
import { paxios } from '../../../Utilities/axios'; //Para crear Peticiones a Rutas Privadas


//Añadir Otra Donación

export const getUserVol = async (email)=>{
    try
    {
        //Se pasa el email como parámetro
        let { data } = await paxios.get(`/api/donacion/voluntario/infoVolun/${email}`);
        return data;

    }
    catch(err)
    {
        throw err;
    }
}

export const putUserVol = async (email, estado)=>{
    //const uri = '/api/donacion/voluntario/modiVolun/:`${email}`/:`${estado}`';

    try
    {
        let { data } = await paxios.put(`/api/donacion/voluntario/modiVolun/${email}/${estado}`); 

    }
    catch(err)
    {
        throw err;
    }
}
