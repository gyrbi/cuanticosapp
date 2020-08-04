import {paxios} from '../../../Utilities/axios';

export const recuperacion = async (email)=>{
    try
    {
        const {data} = await paxios.post(
            "api/sec/recuperacion",
            {
                email: email,
            }
            );

            return data;
    }
    catch(e)
    {
        throw(e);
    }
}