// ************************************************** index.js de ArmaTuCanasta *************************************************************** //

import React, {Component} from 'react';

import Productos from '../../Productos';
import Page from '../../Page';

export default class extends Component
{
    constructor()
    {
        super();
    }

    render()
    {
        return(
            <Page showHeader={true} showFooter={true} title="Arma Tu Canasta">
                <p>Elige una Canasta:</p><br/>
                <Productos uriImg= "/imgs/prod1.jpg" precio="260" nom="Canasta Básica" desc="360g de Leche en Polvo, 1Lb de Pastas Ali
                          de Azúcar, 1Lb Manteca, 1 bolsa de Pan Molde, 1Lb de Frijoles, 1Lb de Ma
                          Café"></Productos>
                <Productos uriImg="/imgs/prod1.jpg" precio="260" nom="Canasta Básica" desc="360g de Leche en Polvo, 1Lb de Pastas Ali
                          de Azúcar, 1Lb Manteca, 1 bolsa de Pan Molde, 1Lb de Frijoles, 1Lb de Ma
                          Café"></Productos>
            </Page>
        );
    }
}