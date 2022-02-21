import React from 'react';
import Rotas from './rotas';
import './style/global.css'
import { UsuarioContextProvider } from './context/UsuarioContext';
import { BrowserRouter } from 'react-router-dom'; 

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <UsuarioContextProvider>
          <Rotas />
        </UsuarioContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
