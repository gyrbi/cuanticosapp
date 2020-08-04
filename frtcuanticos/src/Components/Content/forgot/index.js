import React, {Component} from 'react';
import Page from '../../Page';
import {Redirect} from 'react-router-dom';

import {recuperacion} from './action';

import './recuperacion.css';
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
            this.setState({"redirectTo": true}, ()=>{this.props.auth.recuperacion(userData)});
        }
        catch(e)
        {
            console.log("ERROR recuperacion: " + e);
            alert("ERROR Correo Invalido. Por favor intente de nuevo");
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
                title={"Recuperar Contraseña"}
                auth = {this.props.auth}
            >
                {/* estructura de Login */}
            

        <div className="main">
            <p className="sign" align="center">Recuperar Contraseña</p>
            <form className="form1">
                 <input className="un " type="text" align="center" placeholder="correo" name="email" onChange={this.onTextChange} value ={this.state.email}/>
                    <a className="submit" align="center" onClick={this.onClickButton}>Recuperar</a>
                    <br>
                    </br>
                    <br/>
                    <br/>
                    <p className="forgot" align="center" ><a href="../login">VOLVER?</a></p>
            </form>
                
         </div>

            </Page>
        )
    }
}