import React, {Component} from 'react';
import Page from '../../Page';
import {Redirect} from 'react-router-dom';

import {recuperacion} from './actions';

export default class extends Component
{
    constructor()
    {
        super();
        this.state =
        {
            email:'',
            redirectTo: false
        }

        this.onClickButton = this.onClickButton.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
    }

    onTextChange(e) 
    {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    async onClickButton(e)
    {
        try
        {
            let userData = await recuperacion(this.state.email);
            const {jwt} = userData;
            delete userData.jwt;
            this.setState({"redirectTo": true}, ()=>{this.props.auth.recuperacion(userData, jwt)});
        }
        catch(e)
        {
            alert("¿Desea iniciar un proceso de recuperacion de contraseña?");
        }
    }

    render()
    {
        if(this.state.redirectTo)
        {
            const tourl = (this.props.location.state) ? this.props.location.state.from.pathname: '/';
            return ( <Redirect to = {tourl}/>)
        }

        return(
            <Page
                showHeader ={true}
                showFooter={true}
                title={"Recuperacion de Contraseña"}
                auth = {this.props.auth}
            >

                <h2> Recuperacion de Contraseña </h2>
                <fieldset>
                    <label> Correo Electrónico</label>
                    <input type="email" name="email" onChange={this.onTextChange} value ={this.state.email} />
                </fieldset>
                

                <button onClick={this.onClickButton}> Regresar</button>
                <br/>
                <button onClick={this.onClickButton}> Enviar solicitud</button>

            </Page>
        )
    }
}