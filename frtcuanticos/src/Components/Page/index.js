// **************************************************** index.js de Page ******************************************************************** //

import React from 'react';

import Header from '../Header';
import Footer from '../Footer';

//Exportamos el diseño de la Pagina Principal que contiene la estructura a seguir
//Muestra el Header, el Footer, el Título de la Página y el contenido de la misma (children).
export default ( {showHeader, showFooter, title, children} )=>{
    
    //LOS COMPONENTES SE UTILIZAN COMO ETIQUETAS HTML. Se verifica si se desea mostrar o no el Header y Footer
    const MainHeader = (showHeader)? (<Header title={title}></Header>): null;
    const MainFooter = (showFooter)? (<Footer></Footer>): null;

    //Se retorna la página ya armada. TIENE QUE IR EN UN SOLO CONTENEDOR ( <div></div> <section></section> )
    return (
        <section>
            {MainHeader}

            <main>
                {children} {/*children obtiene todo lo que no es propiedad (Lo que va dentro de las etiquetas) */}
            </main>

            {MainFooter}
        </section>
    );
}