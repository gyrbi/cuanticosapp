import {paxios} from '../../../Utilities/axios';

export const recuperacion = async (contra)=>{
    try
    {
        const {data} = await paxios.post(
            "api/sec/recuperacion-form/:token",
            {
                contra: contra,
            }
            );

            return data;
    }
    catch(e)
    {
        throw(e);
    }
}