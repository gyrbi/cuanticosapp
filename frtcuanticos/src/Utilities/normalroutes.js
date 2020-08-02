/********  
 * ESTA PARTE permite redirigir a un usuario no logueado a una página pública solicitada con los datos recibidos
********/

import React from 'react';
import { Route } from 'react-router-dom';

export default (props) => {
    //Se obtienen 3 elementos: Adonde desea ir, los datos del usuario, todo lo demás que se quiera mandar
    const { component: MyCustomComponent, auth, ...rest } = props;
    return (
        <Route
            {...rest}
            component={ //Este recibe datos de react para renderizar
                (props) => {
                    return (
                        <MyCustomComponent {...props} auth={auth} />
                    );
                }
            }
        />
    )
}