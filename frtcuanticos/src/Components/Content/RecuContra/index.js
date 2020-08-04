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
            contra:'',
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
            alert("ERROR Recuperar");
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

            <div className="main">
                <p className="sign" align="center">Recuperar Contraseña</p>
            <form className="form1">
                
                    <input className="pass" type="password" align="center" placeholder=" Nueva contraseña" name="contra" onChange={this.onTextChange} value={this.state.contra}/>
                    <input className="pass" type="password" align="center" placeholder="repetir contraseña" />
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