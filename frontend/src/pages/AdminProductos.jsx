import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminProductos() {
  const navigate = useNavigate();
  
  // Estados para el formulario de nuevo producto
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [categoria, setCategoria] = useState('bebidas calientes');
  const [mensaje, setMensaje] = useState('');

  // Estado para almacenar la lista de productos del menú
  const [productos, setProductos] = useState([]);

  // 1. Función para obtener los productos desde el Backend
  const cargarProductos = async () => {
    try {
      const respuesta = await axios.get('http://localhost:3000/api/products');
      setProductos(respuesta.data);
    } catch (error) {
      console.error('Error al cargar el menú:', error);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  // 2. Función para guardar un nuevo producto (POST)
  const manejarGuardar = async (e) => {
    e.preventDefault();
    try {
      const respuesta = await axios.post('http://localhost:3000/api/products', {
        nombre,
        descripcion,
        precio: Number(precio),
        categoria
      });

      setMensaje(respuesta.data.msg);
      
      setNombre('');
      setDescripcion('');
      setPrecio('');
      
      cargarProductos();

    } catch (error) {
      if (error.response) {
        setMensaje(error.response.data.msg);
      } else {
        setMensaje('Error al conectar con el servidor.');
      }
    }
  };

  // 3. Función para cerrar sesión
  const cerrarSesion = () => {
    localStorage.clear(); 
    navigate('/login');
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Panel de Administración - Ofrecer Productos ☕</h2>
        <button onClick={cerrarSesion} style={{ backgroundColor: 'red', color: 'white' }}>Cerrar Sesión</button>
      </div>

      <hr />

      {/* --- FORMULARIO PARA CREAR PRODUCTOS --- */}
      <h3>Agregar Nuevo Producto al Menú</h3>
      <form onSubmit={manejarGuardar} style={{ background: '#f4f4f4', padding: '15px', borderRadius: '5px' }}>
        <div>
          <label>Nombre del Producto:</label><br />
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        </div>
        <br />
        <div>
          <label>Descripción:</label><br />
          <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />
        </div>
        <br />
        <div>
          <label>Precio ($):</label><br />
          <input type="number" value={precio} onChange={(e) => setPrecio(e.target.value)} required />
        </div>
        <br />
        <div>
          <label>Categoría:</label><br />
          <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
            <option value="bebidas calientes">Bebidas Calientes</option>
            <option value="bebidas frias">Bebidas Frías</option>
            <option value="reposteria">Repostería</option>
            <option value="otros">Otros</option>
          </select>
        </div>
        <br />
        <button type="submit" style={{ backgroundColor: 'green', color: 'white', padding: '8px 15px' }}>
          Publicar Producto
        </button>
      </form>

      {mensaje && <p style={{ fontWeight: 'bold', color: 'blue' }}>{mensaje}</p>}

      <hr style={{ margin: '30px 0' }} />

      {/* --- VISTA EN TIEMPO REAL DEL MENÚ --- */}
      <h3>Menú Actual de la Cafetería</h3>
      {productos.length === 0 ? (
        <p>No hay productos en el menú todavía.</p>
      ) : (
        <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#ddd' }}>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Categoría</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((prod) => (
              <tr key={prod._id}>
                <td><strong>{prod.nombre}</strong></td>
                <td>{prod.descripcion}</td>
                <td>${prod.precio}</td>
                <td>{prod.categoria}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminProductos;