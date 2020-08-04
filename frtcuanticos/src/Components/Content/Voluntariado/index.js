import React, {Component} from 'react';
import Page from '../../Page';
import {Redirect} from 'react-router-dom';

import {putUserVol, getUserVol} from './actions';

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

    async componentDidMount()
    {
        try
        {
            let estado = await getUserVol("stephan.1998@outlook.com");
            this.setState({...this.state, estado: estado}); //SE seteta el estado para que el ArrayCanastas sea igual a los datos que se traen del bck

        }
        catch(err)
        {
            console.log("ERROR get Usuario voluntario: "+err);
            alert("ERROR al obtener el estado del usuario");
        }
    }

    onTextChange(e) 
    {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    async onClickButton(e)
    {
        let newestado = ''
        try
        {
            if(this.state.estado == "Activo")
            {
                newestado = "Inactivo"
            }
            else{
                newestado = "Activo"
            }
            let userData = await putUserVol("stephan.1998@outlook.com",newestado);
            
        }
        catch(e)
        {
            console.log("ERROR Estado: " + e);
            alert("ERROR No se ha podido cambiar el estado");
        }
    }

    render()
    {

        return(
            <Page
                showHeader ={true}
                showFooter={true}
                title={"Iniciar Sesión"}
                auth = {this.props.auth}
            >

                <h2> Estado del Voluntario </h2>
                <fieldset>
                    <label> Estado</label>
                    <h3>{this.state.estado}</h3>                                        
                </fieldset>                
                <button onClick={this.onClickButton}> Cambiar estado</button>

            </Page>
        )
    }
}