import React, {Component} from 'react';
import Page from '../../Page';
import {Redirect} from 'react-router-dom';

import './register.css'

import {registro} from './actions';

export default class extends Component
{
    constructor()
    {
        super();
        this.state =
        {
            email:'',
            contra:'',
            nom:'',
            tipoCuenta:'',
        }

        this.onClickButton = this.onClickButton.bind(this);
        this.onTextChange = this.onTexChange.bind(this);
    }

    onTexChange(e)
    {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    async onClickButton(e)
    {
        if (this.state.tipoCuenta.trim() == "") 
        {
            this.state.tipoCuenta = "Donante";
        }

        try
        {
            await registro(this.state.email, this.state.contra, this.state.nom, this.state.tipoCuenta);
            this.setState({ "redirectTo": true });
            alert("Usuario registrado correctamente.");
        }
        catch(e)
        {
            console.log("ERROR registro: " + e);
            alert("ERROR al Registrase. Por favor intente de nuevo");
        }
    }
   
    render()
    {
        if(this.state.redirectTo){
            const tourl = (this.props.location.state) ? this.props.location.state.from.pathname: '/login';
            return(
              <Redirect to={tourl}/>
            )
          }
        return(
            <Page
                showHeader={true}
                showFooter={true}
                title={"Crear Cuenta"}
                auth = {this.props.auth}
                >
                    <div className="main">
                        <p className="sign" align="center">Crear Cuenta</p>
                        <form className="form1">
                            <input className="un " type="text" align="center" placeholder="correo" name="email" onChange={this.onTextChange} value ={this.state.email}/>
                            <input className="pass" type="password" align="center" placeholder="contraseña" name="contra" onChange={this.onTextChange} value={this.state.contra}/>
                            <input className="pass" type="password" align="center" placeholder="repetir contraseña" />
                            <input className="un" type ="text" align ="center" placeholder="nombre" name="nom" onChange={this.onTextChange} value ={this.state.nom} />
                            <label for="tipoCuenta" className="sign2" align="center" >Tipo de Cuenta:</label>

                            <select onChange={this.onTextChange} name="tipoCuenta" id="tipocuenuenta" className="un" align="center" value={this.state.tipoCuenta}>
                                    <option value="Donante">Donante</option>
                                    <option value="Empresa">Empresa</option>
                                
                            </select>
                                <a className="submit" align="center" onClick={this.onClickButton}>Registrarse</a>
                        </form>
                        <br/>
                
                     </div>
            </Page>

        )
    }

}