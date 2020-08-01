import React, {Component} from 'react';
import Page from '../../Page';
import {Redirect} from 'react-router-dom';

import {login} from './actions';

exports default class extends Component
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
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    async onClickButton(e)
    {
        try
        {
            let userData = await login(this.state.email, this.state.contra);
            const {jwt} = userData;
            delete userData.jwt;
            this.setState({"redirectTo": true}, ()=>{this.props.auth.login(userData, jwt)});
        }
        catch(e)
        {
            alert("Error al Iniciar Sesion.");
        }
    }

    render()
    {
        if(this.state.redirectTo)
        {
            const tourl =(this.props.location.state) ? this.props.location.state.from.pathname: '/';
            return ( <Redirect to = {tourl}/>)
        }

        return(
            <Page
                showHeader ={true}
                showFooter={true}
                title={"Iniciar Sesion"}
                auth = {this.props.auth}
            >

                <h2> Iniciar Sesion </h2>
                <fieldset>
                    <label> Correo Electronico</label>
                    <input type="email" name="email" onChange ={this.onTextChange} value ={this.state.email} />
                </fieldset>
                <fieldset>
                    <label>Password</label>
                    <input type="contra" name="contra" onChange={this.onTextChange} value={this.state.contra} />
                </fieldset>

                <button onClick ={this.onClickButton}> Iniciar Sesion</button>

            </Page>
        )
    }
}