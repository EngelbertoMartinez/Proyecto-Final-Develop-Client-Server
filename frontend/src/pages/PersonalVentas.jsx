import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function PersonalVentas() {
  const navigate = useNavigate();
  const [ordenes, setOrdenes] = useState([]);
  const [mensaje, setMensaje] = useState('');

  // 1. Cargar las órdenes pendientes desde el backend
  const cargarOrdenes = async () => {
    try {
      const respuesta = await axios.get('http://localhost:3000/api/orders');
      setOrdenes(respuesta.data);
    } catch (error) {
      console.error('Error al cargar órdenes:', error);
    }
  };

  useEffect(() => {
    cargarOrdenes();
    const intervalo = setInterval(cargarOrdenes, 10000);
    return () => clearInterval(intervalo);
  }, []);

  // 2. Marcar orden como entregada y pagada (Venta completada)
  const completarVenta = async (id) => {
    try {
      const respuesta = await axios.put(`http://localhost:3000/api/orders/${id}`);
      setMensaje(respuesta.data.msg);
      
      cargarOrdenes();

      setTimeout(() => setMensaje(''), 3000);
    } catch (error) {
      console.error('Error al completar la venta:', error);
    }
  };

  const cerrarSesion = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Monitor de Ventas y Barra ☕🛒</h2>
        <button onClick={cerrarSesion} style={{ backgroundColor: 'red', color: 'white' }}>Cerrar Sesión</button>
      </div>

      <p>Aquí aparecen los pedidos que los clientes solicitan en tiempo real:</p>

      {mensaje && (
        <p style={{ background: '#d1ecf1', color: '#0c5460', padding: '10px', borderRadius: '5px', fontWeight: 'bold' }}>
          {mensaje}
        </p>
      )}

      <hr />

      {ordenes.length === 0 ? (
        <h3 style={{ color: 'green', textAlign: 'center', marginTop: '40px' }}>🎉 ¡Al día! No hay pedidos pendientes por preparar.</h3>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
          {ordenes.map((orden) => (
            <div key={orden._id} style={{ border: '2px solid #8B4513', borderRadius: '8px', padding: '15px', background: '#fff8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '2px 2px 5px rgba(0,0,0,0.05)' }}>
              <div>
                <span style={{ fontSize: '12px', color: '#777' }}>Pedido recibido: {new Date(orden.createdAt).toLocaleTimeString()}</span>
                <h3 style={{ margin: '5px 0' }}>{orden.productoNombre}</h3>
                <p style={{ margin: 0 }}><strong>Cliente:</strong> {orden.clienteNombre}</p>
                <p style={{ margin: 0, color: '#b15b00', fontWeight: 'bold' }}>Total a cobrar: ${orden.precio}</p>
              </div>
              <button 
                onClick={() => completarVenta(orden._id)}
                style={{ backgroundColor: '#28a745', color: 'white', border: 'none', padding: '12px 20px', borderRadius: '5px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}
              >
                ✔ Entregar y Cobrar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PersonalVentas;