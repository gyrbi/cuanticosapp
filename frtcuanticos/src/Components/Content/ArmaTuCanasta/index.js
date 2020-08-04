// ************************************************** index.js de ArmaTuCanasta *************************************************************** //

import React, {Component} from 'react';

import Page from '../../Page';
import Productos from '../../Productos';
import { StandardBtn } from '../../Button';
import { getCanastas, getKits, addOne } from './actions'; //Llamar métodos que se conectan al backend

import './canasta.css';

export default class extends Component
{
    constructor()
    {
        super();

        this.state = {
            canastas: [],   //Arrays que recibirán los datos
            kits: [],
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
            this.setState({...this.state, canastas: canastas}); //SE seteta el estado para que el ArrayCanastas sea igual a los datos que se traen del bck

            let kits = await getKits();
            this.setState({...this.state, kits: kits});
        }
        catch(err)
        {
            console.log("ERROR get Canasta y Kits: "+err);
            alert("ERROR al obtener los Productos. Por favor Intente de nuevo");
        }
    }

    //Métodos creados por nosotros (RECORDAR PONER EL bind EN EL CONTRUCTOR!!!)
    async onClickAregar(user, prod, donacion, tipoPrd)
    {
        try
        {
            let addDonacion = await addOne(user, prod, donacion, tipoPrd);
            alert("Donación Agregada con Éxito");
        }
        catch(err)
        {
            console.log("ERROR add Donación ArmaTuCanasta: "+err);
            alert("ERROR al agregar la Donación. Por favor Intente de nuevo");
        }
    }
    

    render()
    {
        //Se encapsula cada canasta en una constante y se muestra a través de map. Con 'c' tenemos acceso a los datos
        //Se debe especificar en "key" el identificador único de cada registro
        const canItem = this.state.canastas.map((c)=>{
            return (
                <div key={c._id} className="contOnePrd">
                    <Productos uriImg={c.image_large} precio={c.precio} nom={c.descripcion} desc={c.descripcion_larga}></Productos>
                    {/* Para mandar datos al método onClickAregar primero se llama una función anónima que retorna a nuestro método con sus parámetros */}
                    <StandardBtn onclick={(e) => this.onClickAregar("5f160aa64bc0745a88042020", c._id, "Arma Tu Canasta", "CAN")} caption="AGREGAR"></StandardBtn>
                </div>
            );
        });

        const kitItem = this.state.kits.map((k)=>{
            return(
                <div key={k._id} className="contOnePrd">
                    <Productos uriImg={k.image_large} precio={k.precio} nom={k.descripcion} desc={k.descripcion_larga}></Productos>
                    <button onClick={(e) => this.onClickAregar("5f160aa64bc0745a88042020", k._id, "Arma Tu Canasta", "KIT")}>AGREGAR</button>
                </div>
            );
        });

        //CUERPO DE LA PÁGINA
        return(
            <Page showHeader={true} showFooter={true} title="Arma Tu Canasta" auth={this.props.auth}>
                <section>
                    <p className="mainP">Elige una Canasta</p><br/>
                    <div className="linePrd"></div>

                    <div className="contMainPrd">
                        {canItem}
                    </div>
                </section>

                <section>
                    <p className="mainP" id="pKit">Elige un Kit</p><br />
                    <div className="linePrd"></div>

                    <div className="contMainPrd">
                        {kitItem}    
                    </div>
                </section>

            </Page>
        );
    }
}


/*<div className="contOnePrd">
    <Productos uriImg= "/imgs/can1.jpg" precio="260" nom="Canasta Básica" desc="360g de Leche en Polvo, 1Lb de Pastas Alimenticias
            de Azúcar, 1Lb de Manteca, 1 bolsa de Pan Molde, 1Lb de Frijoles, 1Lb de Café"></Productos>
    <button>AGREGAR (Estilo Pendiente)</button>
</div> */


/*  <div className="contOnePrd">
        <Productos uriImg="/imgs/kit1.jpg" precio="500" nom="Kit Médico Básico" desc="Ibuprofeno, Antidiarréico, Vitaminas, Amoxicilina, Antiácido, Gasas, Paracetamol"></Productos>
        <button>AGREGAR (Estilo Pendiente)</button>
    </div>
</div> */