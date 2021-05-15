import React, { useState } from 'react';
import MapChart from './Mapa/MapaFull';
import ReactTooltip from 'react-tooltip';
import listaPaises from './Mapa/ListadoPAises.json';

class App extends React.Component {
  render() {
    return <FullApp></FullApp>;
  }
}

function FullApp() {
  const [content, setContent] = useState('');
  const [nuevo, setnuevo] = useState([]);

  /**
   * este metodo agrega paises ramdom al mapa
   * revisar la lista de paises
   */
  const mandarMapa = () => {
    var listaAux = [];
    for (
      let index = 0;
      index < Math.floor(Math.random() * listaPaises.lista.length) + 1;
      index++
    ) {
      const element =
        listaPaises.lista[Math.floor(Math.random() * listaPaises.lista.length)];
      listaAux.push({
        id: element.country,
        val: Math.floor(Math.random() * 500) + 1,
      });
    }
    console.log(listaAux);
    setnuevo(listaAux);
  };

  const mandarMapaT = () => {
    var listaAux = [];
    for (let index = 0; index < listaPaises.lista.length; index++) {
      const element = listaPaises.lista[index];
      listaAux.push({
        id: element.country,
        val: Math.floor(Math.random() * 500) + 1,
      });
    }
    console.log(listaAux);
    setnuevo(listaAux);
  };

  return (
    <div style={{ width: 800, background: 'white' }}>
      <button onClick={mandarMapa}>Random</button>
      <button onClick={mandarMapaT}>Agregar Todos</button>
      <MapChart
        setTooltipContent={setContent}
        data={nuevo}
        color={'green'}
        titulo={'Agregar Mapas Random'}
      />
      <ReactTooltip>{content}</ReactTooltip>
    </div>
  );
}

/*
<Route exact path="/">
    <Redirect to="/home" />
</Route>
*/
export default App;
