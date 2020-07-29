// ************************************************** index.js de ArmaTuCanasta *************************************************************** //

import React, {Component} from 'react';

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
                <p>Probando la Página Arma Tu Canasta</p>
            </Page>
        );
    }
}