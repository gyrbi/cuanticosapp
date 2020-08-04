import {paxios} from '../../../Utilities/axios';

export const registro = async (email, contra,nom,tipoCuenta)=>{
    try
    {
        const {data} = await paxios.post(
            "api/sec/register",
            {
                email: email,
                contra: contra,
                nom: nom,
                tipoCuenta: tipoCuenta,
            }
            );

            return data;
    }
    catch(e)
    {
        throw(e);
    }
}