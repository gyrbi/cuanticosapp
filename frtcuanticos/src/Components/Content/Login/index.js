import React, {Component} from 'react';
import Page from '../../Page';
import {Redirect} from 'react-router-dom';

import {login} from './actions';

import './login.css';
export default class extends Component
{
    constructor()
    {
        super();
        this.state =
        {
            email:'',
            contra: '',
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
            let userData = await login(this.state.email, this.state.contra);
            const {jwt} = userData;
            delete userData.jwt;
            this.setState({ "redirectTo": true }, () => { this.props.auth.login(userData, jwt)});
            alert("Login Correcto!!. bienvenido");
        }
        catch(e)
        {
            console.log("ERROR Login: " + e);
            alert("ERROR al Iniciar Sesión. Por favor intente de nuevo");
        }
    }

    render()
    {
        if(this.state.redirectTo)
        {
            const tourl = (this.props.location.state) ? this.props.location.state.from.pathname: '/Inicio';
            return ( <Redirect to = {tourl}/>)
        }

        return(
            <Page
                showHeader ={true}
                showFooter={true}
                title={"Iniciar Sesión"}
                auth = {this.props.auth}
            >
                {/* estructura de Login */}
            

        <div className="main">
            <p className="sign" align="center">Inicia Sesión</p>
            <form className="form1">
                 <input className="un " type="text" align="center" placeholder="correo" name="email" onChange={this.onTextChange} value ={this.state.email}/>
                 <input className="pass" type="password" align="center" placeholder="contraseña" name="contra" onChange={this.onTextChange} value={this.state.contra}/>
                    <a className="submit" align="center" onClick={this.onClickButton}>Iniciar Sesión</a>
                    <p className="forgot" align="center" ><a href="/forgot">¿Has olvidado tu contraseña?</a></p>
            </form>
                
         </div>

            </Page>
        )
    }
}