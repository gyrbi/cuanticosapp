// **************************************************** index.js de Footer ******************************************************************** //

import React from 'react';

import {NavLink} from 'react-router-dom';

export default ()=>{
    return (
        <section>
            <footer>
                <nav>
                    <ul>
                        <li> <NavLink to="/">Inicio</NavLink> </li>
                        <li> <NavLink to="/login">Iniciar Sesión</NavLink> </li>
                        <li> <NavLink to="/register">Regístrate</NavLink> </li>
                    </ul>
                </nav>
            </footer>
        </section>
    );
}
