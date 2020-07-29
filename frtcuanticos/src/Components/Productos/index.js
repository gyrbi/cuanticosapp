import React from 'react';

import './productos.css';

export default ({ uriImg, precio, nom, desc})=>{
    let alt;

    //Verificar su contenido. Si vienen vacíos se coloca un valor por defecto
    uriImg = (uriImg) ? uriImg : "imgs/noprod.png";
    precio = (precio) ? precio : 0;
    nom = (nom) ? nom : "Producto No Disponible";
    alt = (nom) ? "Imagen de " + nom : "Imagen de Una Canasta de Alimentos";
    desc = (desc) ? desc : "N/D";

    return (
        <div className="contPrd">
            <div className="contImgPrd">
                <img src={uriImg} alt={alt}></img>
                <div className="precioPrd">L {precio}</div>
            </div>

            <div className="contTextoPrd">
                <h3>{nom}</h3>
                <div className="textoPrd">
                    <p>
                        Incluye: <br/> {desc}
                    </p>
                </div>
            </div>

            <button>AGREGAR (Estilo Pendiente)</button>
        </div>
    )
}

