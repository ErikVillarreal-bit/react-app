import React, { useEffect, useState } from "react";
import "./estilos.css";

function App() {
  const [estados, setEstados] = useState([]);
  const [municipio, setMunicipio] = useState([]);
  const [cp, setCp] = useState([]);
  const [colonia, setColonia] = useState([]);
  const [info, setInfo] = useState({ edo: "", mun: "", codigo: "", col: "" });
  const [resumen, setResumen] = useState(false);

  useEffect(() => {
    getEstados();
  }, []);

  const getEstados = async () => {
    const peticion = await fetch(
      "https://api-sepomex.hckdrk.mx/query/get_estados"
    );
    const data = await peticion.json();
    setEstados(data.response.estado);
  };
  const getEstadoSelect = (valor) => {
    if (valor) {
      setInfo({ ...info, edo: valor });
      getMunicipio(valor);
    }
  };

  const getMunicipio = async (estado) => {
    const peticion = await fetch(
      `https://api-sepomex.hckdrk.mx/query/get_municipio_por_estado/${estado}`
    );
    const data = await peticion.json();
    setMunicipio(data.response.municipios);
  };
  const getMunicipioSelect = (valor) => {
    if (valor) {
      setInfo({ ...info, mun: valor });
      getCp(valor);
    }
  };

  const getCp = async (muni) => {
    const peticion = await fetch(
      `https://api-sepomex.hckdrk.mx/query/get_cp_por_municipio/${muni}`
    );
    const data = await peticion.json();
    setCp(data.response.cp);
  };
  const getCpSelect = (valor) => {
    if (valor) {
      setInfo({ ...info, codigo: valor });
      getColonia(valor);
    }
  };

  const getColonia = async (codigoPostal) => {
    const peticion = await fetch(
      `https://api-sepomex.hckdrk.mx/query/get_colonia_por_cp/${codigoPostal}`
    );
    const data = await peticion.json();
    setColonia(data.response.colonia);
  };
  const getColoniaSelect = (valor) => {
    if (valor) {
      setInfo({ ...info, col: valor });
      setResumen(true);
    }
  };

  const cardInfo = () => {
    return (
      <div className="container-info">
        <div className="info">
          <h2 className="title">Resumen de datos</h2>
          <ul>
            <li>{info.edo}</li>
            <li>{info.mun}</li>
            <li>{info.codigo}</li>
            <li>{info.col}</li>
          </ul>
        </div>
        <div className="btn">
          <button onClick={limpiar}>Limpiar</button>
        </div>
      </div>
    );
  };

  const limpiar = () => {
    setEstados([]);
    setMunicipio([]);
    setCp([]);
    setColonia([]);
    setInfo({ edo: "", mun: "", codigo: "", col: "" });
    setResumen(false);
    getEstados();
  };
  return (
    <>
      <div className="container-nav">
        <div className="nav">
          <h1>CONSULTA INFORMACIÓN</h1>
        </div>
      </div>
      <div className="wrapper">
        <div className="estado">
          <select
            id="select"
            onChange={(event) => {
              getEstadoSelect(event.target.value);
            }}
          >
            <option defaultValue>Seleccione un estado</option>
            {estados.map((element, index) => (
              <option key={index++} value={element}>
                {element}
              </option>
            ))}
          </select>
        </div>
        <div className="municipio">
          <select
            id="select"
            onChange={(event) => {
              getMunicipioSelect(event.target.value);
            }}
          >
            <option defaultValue>Seleccione un Municipio</option>
            {municipio.map((element, index) => (
              <option key={index++} value={element}>
                {element}
              </option>
            ))}
          </select>
        </div>
        <div className="cp">
          <select
            id="select"
            onChange={(event) => {
              getCpSelect(event.target.value);
            }}
          >
            <option defaultValue>Seleccione un Municipio</option>
            {cp.map((element, index) => (
              <option key={index++} value={element}>
                {element}
              </option>
            ))}
          </select>
        </div>
        <div className="colonia">
          <select
            id="select"
            onChange={(event) => {
              getColoniaSelect(event.target.value);
            }}
          >
            <option defaultValue>Seleccione un Municipio</option>
            {colonia.map((element, index) => (
              <option key={index++} value={element}>
                {element}
              </option>
            ))}
          </select>
        </div>
        {resumen ? cardInfo() : <span></span>}
      </div>
      <div className="container-footer">
        <footer className="footer">
          <h2>Erik Villarreal</h2>
        </footer>
      </div>
    </>
  );
}

export default App;
