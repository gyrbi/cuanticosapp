// **************************************************** index.js de Header ******************************************************************** //

import React from 'react';

// TODO LO QUE SE MANDA AQUÍ COMO PROPIEDAD ESTÁ EN props
export default ({title})=>{

    return (
        <section>
            <header>
                <h1>{title}</h1>
            </header>
        </section>
    );
}

