// **************************************************** index.js de Header ******************************************************************** //

import React from 'react';

import { RiLogoutBoxRLine } from 'react-icons/ri';
import './header.css';

// TODO LO QUE SE MANDA AQUÍ COMO PROPIEDAD ESTÁ EN props
export default ({title})=>{

    return (
        <section>
            <header>
                <h1>{title}</h1>
                <RiLogoutBoxRLine size="2em" className="logoutIcon"/>
            </header>
        </section>
    );
}

