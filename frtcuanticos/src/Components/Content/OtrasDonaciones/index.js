import React, {Component} from 'react';
import Page from '../../Page';

import {addOne} from './actions';

import './otras.css';

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
            estadod:''
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
            let donacionData = await addOne(this.state.nombred, this.state.descripciond, this.state.tipoent,
                this.state.fechaent, this.state.direccionent, this.state.telefono, this.state.estadod);
            console.log("ERROR addOne OtrasDonaciones: " + e);
        }
        catch(e)
        {
            console.log("ERROR addOne OtrasDonaciones: "+e);
            alert("ERROR al ingresar la Donación. Por favor Intente de nuevo");
        }
    }

    render()
    {
        return(
            <Page
                showHeader ={true}
                showFooter={true}
                title={"Otras Donaciones"}
                auth = {this.props.auth}
            >

                <h2> Otras Donaciones </h2>
                <fieldset>
                    <label> Nombre del Donante: &nbsp;</label>
                    <input type="text" name="nombred" onChange={this.onTextChange} value ={this.state.nombred} />
                </fieldset>
                <fieldset>
                    <label>Descripción de la Donación: &nbsp;</label>
                    <input type="text" name="descripciond" onChange={this.onTextChange} value={this.state.descripciond} />
                </fieldset>
                <fieldset>
                    <label> Tipo de Entrega: &nbsp;</label>
                    <select name="tipoent" onChange={this.onTextChange} value={this.state.tipoent}>
                        <option value="Presencial">Presencial</option>
                        <option value="Parroquial">Parroquial</option>
                    </select>                        
                </fieldset>                
                <fieldset>
                    <label>Fecha de Entrega: &nbsp;</label>
                    <input type="text" name="fechaent" onChange={this.onTextChange} value={this.state.fechaent} />
                </fieldset>                
                <fieldset>
                    <label>Dirección de la Entrega: &nbsp;</label>
                    <input type="text" name="direccionent" onChange={this.onTextChange} value={this.state.direccionent} />
                </fieldset>
                <fieldset>
                    <label>Teléfono: &nbsp;</label>
                    <input type="text" name="telefono" onChange={this.onTextChange} value={this.state.telefono} />
                </fieldset>                              
                
                <button onClick={this.onClickButton}>Agregar Donación</button>

            </Page>
        )
    }
}