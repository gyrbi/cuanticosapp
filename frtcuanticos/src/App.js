import React from 'react';

import Page from './Components/Page';
import './App.css';

function App() 
{
  return (
    //PRUEBA. ESTO SE CAMBIA PARA HACERLA SPA (Single Page Application)
    <Page showHeader={true} showFooter={true} title="Cuánticos App">
      <p>"Lleva alegría a los demás"</p>
    </Page>
  );
}

export default App;
