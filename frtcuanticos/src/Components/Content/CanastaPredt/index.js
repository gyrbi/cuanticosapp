// *********************************************** index.js de Canastas Predeterminadas ******************************************************* //

import React, { Component } from 'react';

import Productos from '../../Productos';
import Page from '../../Page';
import '../ArmaTuCanasta/canasta.css';

export default class extends Component 
{
    constructor() 
    {
        super();
    }

    render() 
    {
        return(
            <Page showHeader={true} showFooter={true} title="Canastas Predeterminadas">
                <p className="mainP">Elige una Canasta Predeterminada</p><br />
                <div className="linePrd"></div>
                <div className="contMainPrd">
                    {/* AQUI VA EL MAP PARA MOSTRAR LO QUE SE TRAE DE LA BASE */}
                    <div className="contOnePrd">
                        <Productos uriImg="/imgs/prod1.jpg" precio="260" nom="Canasta Básica" desc="360g de Leche en Polvo, 1Lb de Pastas Alimenticias
                                de Azúcar, 1Lb de Manteca, 1 bolsa de Pan Molde, 1Lb de Frijoles, 1Lb de Café"></Productos>
                        <button>AGREGAR (Estilo Pendiente)</button>
                    </div>

                    <div className="contOnePrd">
                        <Productos uriImg="/imgs/prod1.jpg" precio="260" nom="Canasta Básica" desc="360g de Leche en Polvo, 1Lb de Pastas Alimenticias
                                de Azúcar, 1Lb de Manteca, 1 bolsa de Pan Molde, 1Lb de Frijoles, 1Lb de Café"></Productos>
                        <button>AGREGAR (Estilo Pendiente)</button>
                    </div>

                    <div className="contOnePrd">
                        <Productos uriImg="/imgs/prod1.jpg" precio="260" nom="Canasta Básica" desc="360g de Leche en Polvo, 1Lb de Pastas Alimenticias
                                de Azúcar, 1Lb de Manteca, 1 bolsa de Pan Molde, 1Lb de Frijoles, 1Lb de Café"></Productos>
                        <button>AGREGAR (Estilo Pendiente)</button>
                    </div>

                    <div className="contOnePrd">
                        <Productos uriImg="/imgs/prod1.jpg" precio="260" nom="Canasta Básica" desc="360g de Leche en Polvo, 1Lb de Pastas Alimenticias
                                de Azúcar, 1Lb de Manteca, 1 bolsa de Pan Molde, 1Lb de Frijoles, 1Lb de Café"></Productos>
                        <button>AGREGAR (Estilo Pendiente)</button>
                    </div>
                </div>
            </Page>
        );
    }
}