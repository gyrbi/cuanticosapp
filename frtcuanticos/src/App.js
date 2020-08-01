import React from 'react';
import { Route, Switch, BrowserRouter as BRouter } from 'react-router-dom'; //Para SPA (Single Page Application)

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

function App() 
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

export default App;
