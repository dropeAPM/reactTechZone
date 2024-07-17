import React, { useEffect, useState } from 'react';
import '../styles/index.css';
import fondo from '../assets/fondo.jpg';

const categorias = {
  Hardware: ["Procesador", "Tarjeta gráfica", "Placa Madre", "Fuente de poder", "Ram"],
  Perifericos: ["Monitor", "Mouse", "MousePad"]
};

const productosPreCargados = [
  { id: 0, nombre: "Monitor", precio: 120000, categoria: "Perifericos", imagen: require('../assets/monitor.png') },
  { id: 1, nombre: "Mouse", precio: 50000, categoria: "Perifericos", imagen: require('../assets/mouseGamer.png') },
  { id: 2, nombre: "MousePad", precio: 10000, categoria: "Perifericos", imagen: require('../assets/mousepad.png') },
  { id: 3, nombre: "Procesador", precio: 90000, categoria: "Hardware", imagen: require('../assets/procesador.png') },
  { id: 4, nombre: "Tarjeta gráfica", precio: 300000, categoria: "Hardware", imagen: require('../assets/tarjetaGrafica.png') },
  { id: 5, nombre: "Placa Madre", precio: 120000, categoria: "Hardware", imagen: require('../assets/placaMadre.png') },
  { id: 6, nombre: "Fuente de poder", precio: 60000, categoria: "Hardware", imagen: require('../assets/fuentePoder.png') },
  { id: 7, nombre: "Ram", precio: 16000, categoria: "Hardware", imagen: require('../assets/ram.png') }
];

const Shop = ({ setCurrentPage }) => {
  const [carrito, setCarrito] = useState([]);
  const [productos, setProductos] = useState([]);
  const [categoria, setCategoria] = useState('Todos');
  const divisa = 'CLP';

  useEffect(() => {
    const productosEnLocalStorage = JSON.parse(localStorage.getItem('productos'));
    if (!productosEnLocalStorage || productosEnLocalStorage.length === 0) {
      localStorage.setItem('productos', JSON.stringify(productosPreCargados));
      setProductos(productosPreCargados);
    } else {
      setProductos(productosEnLocalStorage);
    }
  }, []);

  const renderizarProductos = () => {
    return productos
      .filter(producto => categoria === 'Todos' || producto.categoria === categoria)
      .map((info) => (
        <div className="card" key={info.id}>
          <div className="card-body">
            <img className="img-fluid" src={info.imagen} alt={info.nombre} />
            <h5 className="card-title">{info.nombre}</h5>
            <p className="card-text">{info.precio} {divisa}</p>
            <button className="btn btn-primary" onClick={() => anyadirProductoAlCarrito(info.id)}>+</button>
          </div>
        </div>
      ));
  };

  const anyadirProductoAlCarrito = (id) => {
    setCarrito([...carrito, id]);
  };

  const renderizarCarrito = () => {
    const carritoSinDuplicados = [...new Set(carrito)];
    return carritoSinDuplicados.map((item, index) => {
      const miItem = productos.find(producto => producto.id === item);
      const numeroUnidadesItem = carrito.filter(id => id === item).length;
      return (
        <li className="list-group-item text-right mx-2" key={index}>
          {numeroUnidadesItem} x {miItem.nombre} - {miItem.precio} {divisa}
          <button className="btn btn-danger mx-5" onClick={() => borrarItemCarrito(item)}>X</button>
        </li>
      );
    });
  };

  const borrarItemCarrito = (id) => {
    setCarrito(carrito.filter(carritoId => carritoId !== id));
  };

  const calcularTotal = () => {
    return carrito.reduce((total, item) => {
      const miItem = productos.find(producto => producto.id === item);
      return total + miItem.precio;
    }, 0);
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const generarVoucher = () => {
    const ventana = window.open('', '_blank');
    ventana.document.write('<html><head><title>Voucher de Compra</title></head><body>');
    ventana.document.write('<h1>Gracias por comprar en Techzone!</h1>');
    ventana.document.write('<h2>Detalles de la compra:</h2>');
    ventana.document.write('<ul>');
    const carritoSinDuplicados = [...new Set(carrito)];
    carritoSinDuplicados.forEach((item) => {
      const miItem = productos.find(producto => producto.id === item);
      const numeroUnidadesItem = carrito.filter(id => id === item).length;
      ventana.document.write(`<li>${numeroUnidadesItem} x ${miItem.nombre} - ${miItem.precio} ${divisa}</li>`);
    });
    ventana.document.write('</ul>');
    ventana.document.write(`<p>Total: ${calcularTotal()} ${divisa}</p>`);
    ventana.document.write('</body></html>');
    ventana.document.close();
  };

  return (
    <div style={{ backgroundImage: `url(${fondo})`, backgroundSize: 'cover', minHeight: '100vh' }}>
      <div className="div-titulo">
        <h1>Techzone</h1>
      </div>
      <div className="container">
        <div className="row">
          <select className="categoria-select" onChange={e => setCategoria(e.target.value)}>
            <option value="Todos">Todos</option>
            <option value="Hardware">Hardware</option>
            <option value="Perifericos">Periféricos</option>
          </select>
        </div>
        <div className="row" id="items">
          {renderizarProductos()}
        </div>
        <aside className="col-sm-4">
          <h2>Carrito</h2>
          <ul id="carrito" className="list-group">
            {renderizarCarrito()}
          </ul>
          <hr />
          <p className="text-right">Total: <span id="total">{calcularTotal()}</span> {divisa}</p>
          <button id="boton-vaciar" className="btn btn-danger" onClick={vaciarCarrito}>Vaciar</button>
          <button id="boton-pagar" className="btn btn-success" onClick={generarVoucher}>Pagar</button>
        </aside>
      </div>
      <input type="button" id="login" value="Admin" onClick={() => setCurrentPage('login')} />
    </div>
  );
};

export default Shop;
