import React, {Component} from 'react';
import Page from '../../Page';
import {Redirect} from 'react-router-dom';

import {addOne} from './actions';

export default class extends Component
{
    constructor()
    {
        super();
        this.state =
        {
            nombred:'',
            descripciond: '',
            tipoent: '',            
            fechaent: '',            
            direccionent: '',            
            telefono: '',                                
            estadod:'',
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
            let userData = await addOne(this.state.nombred, this.state.descripciond, this.state.tipoent,
                this.state.fechaent, this.state.direccionent, this.state.telefono, this.state.estadod,);
            const {jwt} = userData;
            delete userData.jwt;
            this.setState({"redirectTo": true}, ()=>{this.props.auth.addOne(userData, jwt)});
        }
        catch(e)
        {
            alert("Error al Iniciar Sesión.");
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
                title={"Otras Donaciones"}
                auth = {this.props.auth}
            >

                <h2> Otras Donaciones </h2>
                <fieldset>
                    <label> Nombre del Donante</label>
                    <input type="text" name="nombred" onChange={this.onTextChange} value ={this.state.nombred} />
                </fieldset>
                <fieldset>
                    <label>Descripcion de la Donacion</label>
                    <input type="text" name="descripciond" onChange={this.onTextChange} value={this.state.descripciond} />
                </fieldset>
                <fieldset>
                    <label> Tipo de Entrega</label>
                    <select name="tipoent" onChange={this.onTextChange} value={this.state.tipoent}>
                        <option value="Presencial">Presencial</option>
                        <option value="Parroquial">Parroquial</option>
                    </select>                        
                </fieldset>                
                <fieldset>
                    <label>Fecha de Entrega</label>
                    <input type="text" name="fechaent" onChange={this.onTextChange} value={this.state.fechaent} />
                </fieldset>                
                <fieldset>
                    <label>Direccion de la Entrega</label>
                    <input type="text" name="direccionent" onChange={this.onTextChange} value={this.state.direccionent} />
                </fieldset>
                <fieldset>
                    <label>Telefono</label>
                    <input type="text" name="telefono" onChange={this.onTextChange} value={this.state.telefono} />
                </fieldset>
                <fieldset>
                    <label> Tipo de Entrega</label>
                    <select name="estadod" onChange={this.onTextChange} value={this.state.estadod}>
                        <option value="Vigente">Vigente</option>
                        <option value="Cancelada">Cancelada</option>
                        <option value="Realizada">Realizada</option>                    
                    </select>                        
                </fieldset>                                
                
                <button onClick={this.onClickButton}> Agregar Donacion</button>

            </Page>
        )
    }
}