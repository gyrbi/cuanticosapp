import React, {Component} from 'react';
import Page from '../../Page';

import './registrar.css'

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

    onClickButton(e)
    {
        alert(JSON.stringify(this.state));
    }
   
    render()
    {
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
                                <a className="submit" align="center" onClick={this.onClickButton}>Registrarse</a>
                        </form>
                        {this.state.email}
                        <br/>
                        {this.state.password}
                
                     </div>
            </Page>

        )
    }

}