import React, {Component} from 'react';
import Page from '../../Page';
import {Redirect} from 'react-router-dom';

import {putUserVol, getUserVol} from './actions';

let emailUser;

export default class extends Component
{
    constructor()
    {
        super();

        this.state =
        {           
            estado: '',
            redirectTo: false
        }

        this.onClickButton = this.onClickButton.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
    }

    //Traer Estado Actual de Voluntario
    async componentDidMount()
    {
        try
        {
            //Se obtiene el email del auth que va a todas las rutas
            let estado = await getUserVol(this.props.auth.email);
            this.setState({...this.state, estado: estado});

        }
        catch(err)
        {
            console.log("ERROR get Usuario voluntario: "+err);
            alert("ERROR al obtener su estado de Voluntario. Por favor intente de nuevo");
        }
    }

    onTextChange(e) 
    {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    async onClickButton(e)
    {
        let newestado = '';

        try
        {
            if(this.state.estado == "Activo")
            {
                newestado = "Inactivo";
            }
            else
            {
                newestado = "Activo";
            }

            let userData = await putUserVol(this.props.auth.email, newestado);
            this.setState({ "redirectTo": true }); //Para redirigir después
            
        }
        catch(e)
        {
            console.log("ERROR Cambio de Estado Voluntario: " + e);
            alert("ERROR, No se ha podido cambiar su estado de Voluntario. Por favor intente de nuevo");
        }
    }

    render()
    {
        //Redirigir a la misma página para refrescarla y actualizar los datos
        if (this.state.redirectTo) 
        {
            const tourl = (this.props.location.state) ? this.props.location.state.from.pathname : '/voluntariado';
            return (<Redirect to={tourl} />)
        }

        return(
            <Page
                showHeader ={true}
                showFooter={true}
                title={"Iniciar Sesión"}
                auth = {this.props.auth}
            >
                <h2> Estado del Voluntariado </h2>
                <fieldset>
                    <label> Estado Actual</label>
                    <h3>{this.state.estado}</h3>                                        
                </fieldset>                
                <button onClick={this.onClickButton}> Cambiar estado</button>
            </Page>
        )
    }
}