// *********************************************** index.js de Canastas Predeterminadas ******************************************************* //

import React, { Component } from 'react';

import Page from '../../Page';
import Productos from '../../Productos';
import { getCanastas, addOne } from '../ArmaTuCanasta/actions'; //Llamar métodos que se conectan al backend

import '../ArmaTuCanasta/canasta.css';

export default class extends Component 
{
    constructor() 
    {
        super();

        this.state = {
            canastas: [],   //Arrays que recibirán los datos
            loading: true,
        };

        this.onClickAregar = this.onClickAregar.bind(this);
    }

    //Método (Con Promesas) para establecer la solicitud de datos hacia el backend
    async componentDidMount() 
    {
        try 
        {
            let canastas = await getCanastas();
            this.setState({ ...this.state, canastas: canastas }); //SE seteta el estado para que el ArrayCanastas sea igual a los datos que se traen del bck
        }
        catch (err) 
        {
            console.log(err);
        }
    }

    //Métodos creados por nosotros (RECORDAR PONER EL bind EN EL CONTRUCTOR!!!)
    async onClickAregar(user, prod, donacion, tipoPrd) 
    {
        try 
        {
            let addDonacion = await addOne(user, prod, donacion, tipoPrd);
        }
        catch (err) 
        {
            console.log(err);
        }
    }

    render() 
    {
        //Se encapsula cada canasta en una constante y se muestra a través de map. Con 'c' tenemos acceso a los datos
        //Se debe especificar en "key" el identificador único de cada registro
        const canItem = this.state.canastas.map((c) => {
            return (
                <div key={c._id} className="contOnePrd">
                    <Productos uriImg={c.image_large} precio={c.precio} nom={c.descripcion} desc={c.descripcion_larga}></Productos>
                    {/* Para mandar datos al método onClickAregar primero se llama una función anónima que retorna a nuestro método con sus parámetros */}
                    <button onClick={(e) => this.onClickAregar("5f16b3fc3f64caec76d8e165", c._id, "Canasta Predeterminada", "CAN")}>AGREGAR (Estilo Pendiente)</button>
                </div>
            );
        });

        return(
            <Page showHeader={true} showFooter={true} title="Canastas Predeterminadas" auth={this.props.auth}>
                <section>
                    <p className="mainP">Elige una Canasta Predeterminada</p><br />
                    <div className="linePrd"></div>

                    <div className="contMainPrd">
                        {canItem}
                    </div>
                </section>
            </Page>
        );
    }
}