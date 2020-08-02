import React, {Component} from 'react';
import { Route, Switch, BrowserRouter as BRouter } from 'react-router-dom'; //Para SPA (Single Page Application)
import { setJWT, getLocalStorage, setLocalStorage } from './Utilities/axios';

//import Page from './Components/Page';
import ArmaTuCanasta from './Components/Content/ArmaTuCanasta';
import CanastaPredt from './Components/Content/CanastaPredt';
// import Donaciones from './Components/Content/Donaciones';
// import Factura from './Components/Content/Factura';
// import Inicio from './Components/Content/Inicio';
// import Login from './Components/Content/Login';
// import MiDonacion from './Components/Content/MiDonacion';
// import OtrasDonaciones from './Components/Content/OtrasDonaciones';
// import RecuContra from './Components/Content/RecuContra';
// import Register from './Components/Content/Register';
// import Voluntariado from './Components/Content/Voluntariado';

import './App.css';

export default class extends Component 
{
  constructor()
  {
    super();

    //Al ser App.js el Componente de Orden Mayor, es el que maneja la info del usuario y el JWT
    //Se inicializa un estado inicial de la Aplicación
    this.state = {
      user: getLocalStorage('user') || {}, //Se trae del almacenamiento local (que es más persistente) los datos del usuario, o se coloca vacío
      jwt: getLocalStorage('jwt') || "",
      isLogged: false,
      loadingBackend: false
    };

    //Si el jwt no está vacío, se manda a utilities/axios en los encabezados de las peticiones y se coloca como loggueado
    if(this.state.jwt !== "")
    {
        setJWT(this.state.jwt);
        this.state.isLogged = true;
    }
  }

  render()
  {
    return (
      //PRUEBA
      // <Page showHeader={true} showFooter={true} title="Cuánticos App">
      //   <p>"Lleva alegría a los demás"</p>
      // </Page>
      <BRouter>
          <Switch>
                {/* <Route path="/" component={Inicio} exact/> */}
                <Route path="/armaTuCanasta" component={ArmaTuCanasta} exact />
                <Route path="/canastaPredt" component={CanastaPredt} exact />
                {/*
                <Route path="/donaciones" component={Donaciones} exact />
                <Route path="/factura" component={Factura} exact />
                <Route path="/login" component={Login} exact />
                <Route path="/miDonacion" component={MiDonacion} exact />
                <Route path="/otrasDonaciones" component={OtrasDonaciones} exact />
                <Route path="/recuperacion" component={RecuContra} exact />
                <Route path="/register" component={Register} exact />
                <Route path="/voluntariado" component={Voluntariado} exact /> */}
          </Switch>
      </BRouter>
    );
  }
}
