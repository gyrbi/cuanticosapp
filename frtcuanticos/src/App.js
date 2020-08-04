import React, {Component} from 'react';

import { Switch, BrowserRouter as BRouter } from 'react-router-dom'; //Para SPA (Single Page Application)
import PRoute from './Utilities/privateroutes'; //Para Cargar Ruta Privada o redirigir al Login para entrar
import NRoute from './Utilities/normalroutes'; //Para Cargar Rutas Públicas

import { setJWT, getLocalStorage, setLocalStorage, setUnAuthInterceptor } from './Utilities/axios';


import ArmaTuCanasta from './Components/Content/ArmaTuCanasta';
import CanastaPredt from './Components/Content/CanastaPredt';
// import Donaciones from './Components/Content/Donaciones';
// import Factura from './Components/Content/Factura';
// import Inicio from './Components/Content/Inicio';
import Login from './Components/Content/Login';
// import MiDonacion from './Components/Content/MiDonacion';
import OtrasDonaciones from './Components/Content/OtrasDonaciones';
import RecuContra from './Components/Content/RecuContra';
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
      email: getLocalStorage('email') || {}, //Se trae del almacenamiento local (que es más persistente) los datos del usuario, o se coloca vacío
      id: getLocalStorage('id') || {},
      tipoCuenta: getLocalStorage('tipoCuenta') || {},
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

    this.setLogginData = this.setLogginData.bind(this);
    this.setLoggoutData = this.setLoggoutData.bind(this);

    //INTERCEPTOR ERROR 401 "NO AUTORIZADO"
    // OJO: Cuando se ingresa la URL de algo sin logguearse, lo redirige al Login pero al ingresar los datos lo vuelve a redirigir al Login infinitamente.
    //      Solo al darle clic al ícono Login e ingresar los datos si carga. No sé si debería funcionar así, el del inge también hace lo mismo.
    setUnAuthInterceptor(this.setLoggoutData);

  }

  componentDidMount()
  {
    this.setState({"loadingBackend": true});
  }

  //Setear estado cuando se loguea. Se obtienen los datos del user y el JWT generado que vienen del BCK
  //Guardar los datos en el almacenamiento local
  //Mandar el JWT para las peticiones
  setLogginData(email, id, tipoCuenta, jwt)
  {
      this.setState({
        ...this.state,
        email: email,
        id: id,
        tipoCuenta: tipoCuenta,
        jwt: jwt,
        isLogged: true
      },
      ()=> {
        setLocalStorage('jwt', jwt); 
        setLocalStorage('email', email); 
        setLocalStorage('id', id); 
        setLocalStorage('tipoCuenta', tipoCuenta); 
        setJWT(jwt); 
      }
      );
  }

  //Igual cuando no esta logueado
  setLoggoutData()
  {
      if(this.state.loadingBackend)
      {
        this.setState(
        {
          ...this.state,
          email: "",
          id: "",
          tipoCuenta: "",
          jwt: "",
          isLogged: false
        },
          () => { setJWT(''); }
        )
      }
      else
      {
        this.state = {
          ...this.state,
          email: "",
          id: "",
          tipoCuenta: "",
          jwt: "",
          isLogged: false,
          }
          setJWT('')
      }  
  }

  render()
  {
    if(!this.state.loadingBackend)
    {
        return (<div className="splash">...Cargando</div>);
    }


    //auth controla la info del usuario y de su estado, y se envía a todas las Rutas para tener acceso a ella
    const auth = {
      isLogged: this.state.isLogged,
      login: this.setLogginData,
      logout: this.setLoggoutData,
      email: this.state.email,
      id: this.state.id,
      tipoCuenta: this.state.tipoCuenta
    }

    return (
      //PRUEBA
      // <Page showHeader={true} showFooter={true} title="Cuánticos App">
      //   <p>"Lleva alegría a los demás"</p>
      // </Page>
      <BRouter>
          <Switch>
            {/* <NRoute path="/" component={Inicio} exact auth={auth} /> */}
                <PRoute path="/armaTuCanasta" component={ArmaTuCanasta} exact auth={auth} />
                <PRoute path="/canastaPredt" component={CanastaPredt} exact auth={auth} />             
                {/* <PRoute path="/donaciones" component={Donaciones} exact auth={auth}/>
                <PRoute path="/factura" component={Factura} exact auth={auth} /> */}
                <NRoute path="/login" component={Login} exact auth={auth} />
                {/* <PRoute path="/miDonacion" component={MiDonacion} exact auth={auth} /> */}
                <PRoute path="/otrasDonaciones" component={OtrasDonaciones} exact auth={auth} />
                <NRoute path="/recuperacion" component={RecuContra} exact auth={auth} />
                {/*<NRoute path="/register" component={Register} exact auth={auth} />
                <PRoute path="/voluntariado" component={Voluntariado} exact auth={auth} /> */}
          </Switch>
      </BRouter>
    );
  }
}
