import React, { useState, useEffect } from 'react';
import '../styles/admin.css';
import fondo from '../assets/fondo.jpg';

// Importar imágenes
import monitor from '../assets/monitor.png';
import mouseGamer from '../assets/mouseGamer.png';
import mousepad from '../assets/mousepad.png';
import procesador from '../assets/procesador.png';
import tarjetaGrafica from '../assets/tarjetaGrafica.png';
import placaMadre from '../assets/placaMadre.png';
import fuentePoder from '../assets/fuentePoder.png';
import ram from '../assets/ram.png';

const categorias = ["Hardware", "Perifericos"];
const imagenes = {
  "Monitor": monitor,
  "Mouse": mouseGamer,
  "MousePad": mousepad,
  "Procesador": procesador,
  "Tarjeta gráfica": tarjetaGrafica,
  "Placa Madre": placaMadre,
  "Fuente de poder": fuentePoder,
  "Ram": ram
};

const Admin = ({ setCurrentPage }) => {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [categoria, setCategoria] = useState('');
  const [imagen, setImagen] = useState('');
  const [productos, setProductos] = useState([]);
  const [editando, setEditando] = useState(false);
  const [objProducto, setObjProducto] = useState({ id: "", nombre: "", precio: 0, categoria: "", imagen: "" });

  useEffect(() => {
    const productosEnLocalStorage = JSON.parse(localStorage.getItem('productos')) || [];
    setProductos(productosEnLocalStorage);
  }, []);

  useEffect(() => {
    localStorage.setItem('productos', JSON.stringify(productos));
  }, [productos]);

  const validarFormulario = (e) => {
    e.preventDefault();
    if (nombre === '' || precio === '' || categoria === '' || imagen === '') {
      alert("ERROR: ¡Debes llenar todos los campos!");
      return;
    }
    if (editando) {
      editarProducto();
      setEditando(false);
    } else {
      const nuevoProducto = { ...objProducto, id: Date.now(), nombre, precio: parseFloat(precio), categoria, imagen };
      agregarProducto(nuevoProducto);
    }
  };

  const agregarProducto = (nuevoProducto) => {
    setProductos([...productos, nuevoProducto]);
    setNombre('');
    setPrecio('');
    setCategoria('');
    setImagen('');
    limpiarObjeto();
  };

  const limpiarObjeto = () => {
    setObjProducto({ id: "", nombre: "", precio: 0, categoria: "", imagen: "" });
  };

  const mostrarProductos = () => {
    return productos.map((producto) => (
      <React.Fragment key={producto.id}>
        <p>{producto.id} - {producto.nombre} - {producto.precio} - {producto.categoria} - {producto.imagen}</p>
        <button className="btn btn-editar" onClick={() => cargarProducto(producto)}>Editar</button>
        <button className="btn btn-eliminar" onClick={() => eliminarProducto(producto.id)}>Eliminar</button>
        <hr />
      </React.Fragment>
    ));
  };

  const cargarProducto = (producto) => {
    const { id, nombre, precio, categoria, imagen } = producto;
    setNombre(nombre);
    setPrecio(precio);
    setCategoria(categoria);
    setImagen(imagen);
    setObjProducto({ ...objProducto, id });
    setEditando(true);
  };

  const editarProducto = () => {
    setProductos(productos.map((producto) => (producto.id === objProducto.id ? { ...producto, nombre, precio: parseFloat(precio), categoria, imagen } : producto)));
    setNombre('');
    setPrecio('');
    setCategoria('');
    setImagen('');
  };

  const eliminarProducto = (id) => {
    setProductos(productos.filter((producto) => producto.id !== id));
  };

  return (
    <div style={{ backgroundImage: `url(${fondo})`, backgroundSize: 'cover', minHeight: '100vh' }}>
      <div className="div-titulo">
        <h1>Techzone</h1>
      </div>
      <div className="contenedor">
        <div className="div-formulario">
          <h2>Admin Menu:</h2>
          <form id="formulario" onSubmit={validarFormulario}>
            <input type="text" id="nombre" placeholder="Nombre Producto" value={nombre} onChange={(e) => setNombre(e.target.value)} />
            <input type="number" id="precio" placeholder="Precio Producto" value={precio} onChange={(e) => setPrecio(e.target.value)} />
            <select id="categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
              <option value="">Seleccionar Categoría</option>
              {categorias.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <select id="imagen" value={imagen} onChange={(e) => setImagen(e.target.value)}>
              <option value="">Seleccionar Imagen</option>
              {Object.keys(imagenes).map(img => (
                <option key={img} value={imagenes[img]}>{img}</option>
              ))}
            </select>
            <button type="submit" id="btnAgregar">{editando ? "Actualizar" : "Agregar"}</button>
          </form>
        </div>
        <div className="div-baseDeDatos">
          <h2>Lista de Productos</h2>
          <div className="div-productos">
            {mostrarProductos()}
          </div>
        </div>
      </div>
      <div className="contenedor">
        <div className="div-cerrarSesion">
          <input type="button" onClick={() => setCurrentPage('login')} value="Cerrar Sesión" />
        </div>
      </div>
    </div>
  );
};

export default Admin;
