import React, {Component} from 'react';
import Page from '../../Page';

import {addOne} from './actions';
import { validateTel, validateName } from '../../../Utilities/validators';

import './otras.css';


//Obtener Fecha de Hoy para el min de la Fecha de Entrega
let today = new Date();
let dd = today.getDate();
let mm = today.getMonth() + 1; //+1 porque Enero es 0
let yyyy = today.getFullYear();

if (dd < 10) {
    dd = '0' + dd;
}

if (mm < 10) {
    mm = '0' + mm
}

today = yyyy + '-' + mm + '-' + dd;

let errorBox = "hiddenErrorBox"; //Ocultar la caja de errores hasta que se encuentre uno


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
            telefono: ''
        }

        this.onClickButton = this.onClickButton.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
    }

    onTextChange(e) 
    {
        errorBox = "hiddenErrorBox";
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    async onClickButton(e)
    {
        //Validaciones
        let errores = ""; 
        let contErr = 0;

        //Poner valor por defecto si no se seleccionó nada. Si se deja sin tocar no guarda nada el value
        if(this.state.tipoent.trim() == "")
        {
            this.state.tipoent = "Presencial";
        }

        if (this.state.nombred.trim() == "" || this.state.descripciond.trim() == "" || this.state.fechaent.trim() == "" || this.state.direccionent == "")
        {
            errores += "- No debe dejar campos vacíos\n";
            contErr++;
        }

        if (!validateName(this.state.nombred)) 
        {
            errores += "- Debe ingresar un Nombre válido\n";
            contErr++;
        }

        if (this.state.fechaent < today)
        {
            errores += "- Debe ingresar una fecha mayor o igual al día de hoy\n";
            contErr++;
        }

        if (!validateTel(this.state.telefono))
        {
            errores += "- Debe ingresar un Teléfono con el formato: 1234-5678\n";
            contErr++;
        }


        //Hay errores
        if(contErr > 0)
        {   
            this.setState( {...this.state, errores} );
            errorBox = "showErrorBox";
        }
        else
        {
            try
            {
                let donacionData = await addOne(this.state.nombred, this.state.descripciond, this.state.tipoent,
                    this.state.fechaent, this.state.direccionent, this.state.telefono);
            }
            catch(e)
            {
                console.log("ERROR addOne OtrasDonaciones: "+e);
                alert("ERROR al ingresar la Donación. Por favor Intente de nuevo");
            }
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
                    <label> Nombre y Apellido del Donante: &nbsp;</label>
                    <input type="text" name="nombred" placeholder="Elba Lazo" maxLength="100" onChange={this.onTextChange} value ={this.state.nombred} />
                </fieldset>
                <fieldset>
                    <label>Descripción de la Donación: &nbsp;</label>
                    <input type="text" name="descripciond" placeholder="2 bolsas de ropa para niño de 2-5 años" maxLength="3000" onChange={this.onTextChange} value={this.state.descripciond} />
                </fieldset>
                <fieldset>
                    <label> Tipo de Entrega: &nbsp;</label>
                    <select name="tipoent" onChange={this.onTextChange} value={this.state.tipoent} >
                        <option value="Presencial">Presencial</option>
                        <option value="Parroquial">Parroquial</option>
                    </select>                      
                </fieldset>                
                <fieldset>
                    <label>Fecha de Entrega: &nbsp;</label>
                    <input type="date" name="fechaent" min={today} onChange={this.onTextChange} value={this.state.fechaent} />
                </fieldset>                
                <fieldset>
                    <label>Dirección de la Entrega: &nbsp;</label>
                    <input type="text" name="direccionent" placeholder="Parroquia Cristo Resucitado" maxLength="300" onChange={this.onTextChange} value={this.state.direccionent} />
                </fieldset>
                <fieldset>
                    <label>Teléfono: &nbsp;</label>
                    <input type="tel" name="telefono" placeholder="1234-5678" onChange={this.onTextChange} value={this.state.telefono} />
                </fieldset>                              
                
                <button onClick={this.onClickButton}>Agregar Donación</button>

                <br/>
                <div className={errorBox}>{this.state.errores}</div>

            </Page>
        )
    }
}