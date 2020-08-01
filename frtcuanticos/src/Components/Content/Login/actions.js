import {paxios} from '../../../utilities/axios';

export const login = async (email, contra)=>{
    try
    {
        const {data} = await paxios.post(
            "api/sec/login",
            {
                email: email,
                contra: contra
            }
            );

            return data;
    }
    catch(e)
    {
        throw(e);
    }
}