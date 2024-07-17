import React, { useState } from 'react';
import '../styles/login.css';
import fondo from '../assets/fondo.jpg';

const Login = ({ setCurrentPage }) => {
  const [usuario, setUsuario] = useState('');
  const [contra, setContra] = useState('');
  const admin = [{ user: "admin", password: "admin" }];

  const validarUsuario = (usuario, contra) => {
    const encontrado = admin.find(user => user.user === usuario && user.password === contra);
    if (encontrado) {
      alert("Usuario Correcto");
      setCurrentPage('admin');
    } else {
      alert("Usuario No encontrado");
    }
  };

  return (
    <div style={{ backgroundImage: `url(${fondo})`, backgroundSize: 'cover', minHeight: '100vh' }}>
      <div className="div-titulo">
        <h1>Techzone</h1>
      </div>
      <div className="contenedor">
        <form>
          <h2>Iniciar sesión:</h2>
          <input
            type="text"
            className="input"
            name="usuario"
            id="usuario"
            placeholder="Usuario"
            value={usuario}
            onChange={e => setUsuario(e.target.value)}
          /><br />
          <input
            type="password"
            className="input"
            name="contra"
            id="contra"
            placeholder="Contraseña"
            value={contra}
            onChange={e => setContra(e.target.value)}
          /><br />
          <input
            type="button"
            className="btn btn-primary"
            name="enviar"
            id="enviar"
            onClick={() => validarUsuario(usuario, contra)}
            value="enviar"
          />
          <input
            type="button"
            className="btn btn-secondary"
            name="volver"
            id="volver"
            onClick={() => setCurrentPage('shop')}
            value="volver"
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
