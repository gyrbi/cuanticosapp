/********  
 * ESTA PARTE permite saber si el usuario está logueado, si es así lo redirige a la página solicitada con los datos recibidos, 
 * sino, lo manda al login para después cargar la página solicitada 
********/

import React from 'react';
import {Route, Redirect} from 'react-router-dom';

export default (props)=>{
    //Se obtienen 3 elementos: Adonde desea ir, los datos del usuario, todo lo demás que se quiera mandar
    const { component: MyCustomComponent, auth, ...rest } = props;
    return(
        <Route
            {...rest}
            component={ //Este recibe datos de react para renderizar
                (props)=>{
                    return(
                        (auth.isLogged)? 
                        (<MyCustomComponent {...props} auth={auth} />): 
                        (<Redirect to={{pathname: "/login", state:{from:props.location}}} />)
                    );
                }
            }
        />
    )
}