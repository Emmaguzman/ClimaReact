import React, { Fragment, useState, useEffect } from 'react';

import Clima from './components/Clima';
import Formulario from './components/Formulario';
import Header from './components/Header';
import Error from './components/Error';


function App() {


  //state formulario
  const [busqueda, setBusqueda] = useState({
    ciudad: '',
    pais: ''
  });

  const [error, setError] = useState(false);
  const [consultar, setConsultar] = useState(false);
  const [resultado, setResultado] = useState({});
  const { ciudad, pais } = busqueda;


  useEffect(() => {
    const consultarAPI = async () => {
      if (consultar) {
        const appid = "65c32d443d4f3edb41c18664dc82c9ca"
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appid}`
        const req = await fetch(url);
        const res = await req.json();
        setResultado(res)
        setConsultar(false)
        //detectar si hay errore en la consulta
        if (resultado.cod === "404") {
          console.log("ERROR")
          setError(true)
        } else {
          setError(false)
        }
      }
    }
    consultarAPI();

    //eslint-disable-next-line
  }, [consultar])

  let componente;
  if (error) {
    componente = <Error mensaje="NO HAY RESULTADOS" />
  } else {
    componente = <Clima
      resultado={resultado}
    />
  }

  return (
    <Fragment>
      <Header
        titulo='Clima React App'
      />

      <div className="contenedor-form">
        <div className="contanier">
          <div className="row">
            <div className="col m6 s12">
              <Formulario
                busqueda={busqueda}
                setBusqueda={setBusqueda}
                setConsultar={setConsultar}
              />
            </div>
            <div className="col m6 s12">
              {componente}
            </div>
          </div>

        </div>
      </div>
    </Fragment>
  );
}

export default App;
