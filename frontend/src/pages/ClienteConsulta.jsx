import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ClienteConsulta() {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const nombreUsuario = localStorage.getItem('nombre') || 'Cliente';

  useEffect(() => {
    const cargarMenu = async () => {
      try {
        const respuesta = await axios.get('http://localhost:3000/api/products');
        setProductos(respuesta.data);
      } catch (error) {
        console.error('Error al cargar el menú:', error);
      }
    };
    cargarMenu();
  }, []);

  const hacerPedido = async (producto) => {
    try {
      const respuesta = await axios.post('http://localhost:3000/api/orders', {
        clienteNombre: nombreUsuario,
        productoNombre: producto.nombre,
        precio: producto.precio
      });
      setMensaje(respuesta.data.msg);
      setTimeout(() => setMensaje(''), 4000);
    } catch (error) {
      console.error('Error al enviar el pedido:', error);
      setMensaje('No se pudo enviar el pedido a la barra.');
    }
  };

  const cerrarSesion = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div style={estilos.contenedorPrincipal}>
      {/* BARRA DE NAVEGACIÓN SUPERIOR */}
      <header style={estilos.header}>
        <div style={estilos.logoSeccion}>
          <img 
        src="/logo.png" 
        alt="Logo Aroma & Café" 
        style={estilos.logoImagen} 
        />
          <h1 style={estilos.tituloLogo}>Aroma & Café</h1>
        </div>
        <div style={estilos.usuarioSeccion}>
          <span style={estilos.saludo}>¡Bienvenido, <strong style={{color: '#d4a373'}}>{nombreUsuario}</strong>!</span>
          <button onClick={cerrarSesion} style={estilos.btnCerrar}>Cerrar Sesión</button>
        </div>
      </header>

      {/* CUERPO PRINCIPAL */}
      <main style={estilos.cuerpo}>
        <div style={estilos.banner}>
          <h2 style={estilos.subtitulo}>Explora Nuestro Menú Exclusivo</h2>
          <p style={estilos.descripcionBanner}>Granos seleccionados artesanalmente y repostería horneada cada mañana.</p>
        </div>
        
        {/* MENSAJE DE ALERTA FLOTANTE */}
        {mensaje && (
          <div style={estilos.alerta}>
            <span style={{marginRight: '10px'}}>🎉</span> {mensaje}
          </div>
        )}

        {/* GRILLA DE PRODUCTOS */}
        {productos.length === 0 ? (
          <p style={estilos.sinProductos}>Estamos preparando el menú de hoy, vuelve pronto...</p>
        ) : (
          <div style={estilos.grilla}>
            {productos.map((prod) => (
              <div key={prod._id} style={estilos.tarjeta}>
                <div style={estilos.capaImagen}>
                  <img src={prod.imagen} alt={prod.nombre} style={estilos.imagen} />
                  <span style={estilos.categoriaBadge}>{prod.categoria}</span>
                </div>
                
                <div style={estilos.infoTarjeta}>
                  <h3 style={estilos.productoTitulo}>{prod.nombre}</h3>
                  <p style={estilos.productoDescripcion}>{prod.descripcion}</p>
                  
                  <div style={estilos.pieTarjeta}>
                    <span style={estilos.precio}>${prod.precio}.00</span>
                    <button onClick={() => hacerPedido(prod)} style={estilos.btnPedir}>
                      Ordenar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

// ==========================================
// PALETA DE COLORES Y ESTILOS EN JAVASCRIPT
// ==========================================
const estilos = {
  contenedorPrincipal: {
    fontFamily: "'Poppins', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: '#faf7f2', 
    minHeight: '100vh',
    color: '#3d2514',
    margin: 0,
    padding: 0,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#3d2514',
    padding: '15px 40px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    color: '#fff',
  },
  logoSeccion: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  logoImagen: {
  width: '45px',
  height: '45px',
  objectFit: 'contain',
  borderRadius: '50%',
  },
  tituloLogo: {
    fontSize: '22px',
    margin: 0,
    letterSpacing: '1px',
    fontWeight: '600',
    color: '#f5ebe0',
  },
  usuarioSeccion: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  saludo: {
    fontSize: '15px',
  },
  btnCerrar: {
    backgroundColor: 'transparent',
    border: '1px solid #d4a373',
    color: '#d4a373',
    padding: '6px 14px',
    borderRadius: '20px',
    cursor: 'pointer',
    fontWeight: '5px',
    transition: 'all 0.3s ease',
    outline: 'none',
  },
  cuerpo: {
  width: '100%',
  maxWidth: '1400px',
  margin: '0 auto',
  padding: '40px 20px',
  },
  banner: {
    textAlign: 'center',
    marginBottom: '40px',
  },
  subtitulo: {
    fontSize: '32px',
    margin: '0 0 10px 0',
    fontWeight: '700',
    color: '#4a2c11',
  },
  descripcionBanner: {
    fontSize: '16px',
    color: '#7f6a5b',
    margin: 0,
  },
  alerta: {
    background: '#4a2c11',
    color: '#f5ebe0',
    padding: '12px 25px',
    borderRadius: '30px',
    textAlign: 'center',
    fontWeight: 'bold',
    maxWidth: '500px',
    margin: '0 auto 30px auto',
    boxShadow: '0 4px 15px rgba(74,44,17,0.2)',
  },
  grilla: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '30px',
    padding: '10px 0',
  },
  tarjeta: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 6px 18px rgba(61,37,20,0.06)',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.3s ease, boxShadow 0.3s ease',
  },
  capaImagen: {
    position: 'relative',
    height: '200px',
    backgroundColor: '#e6ccb2',
  },
  imagen: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  categoriaBadge: {
    position: 'absolute',
    top: '12px',
    left: '12px',
    backgroundColor: 'rgba(61, 37, 20, 0.85)',
    color: '#f5ebe0',
    padding: '4px 10px',
    borderRadius: '12px',
    fontSize: '11px',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    letterSpacing: '0.5px',
  },
  infoTarjeta: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  productoTitulo: {
    margin: '0 0 8px 0',
    fontSize: '20px',
    fontWeight: '600',
    color: '#3d2514',
  },
  productoDescripcion: {
    fontSize: '14px',
    color: '#7f6a5b',
    lineHeight: '1.5',
    margin: '0 0 20px 0',
    flexGrow: 1,
  },
  pieTarjeta: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
  },
  precio: {
    fontSize: '22px',
    fontWeight: '700',
    color: '#a66c3b',
  },
  btnPedir: {
    backgroundColor: '#704214',
    color: '#fff',
    border: 'none',
    padding: '10px 22px',
    borderRadius: '25px',
    fontWeight: 'bold',
    fontSize: '14px',
    cursor: 'pointer',
    boxShadow: '0 4px 10px rgba(112,66,20,0.2)',
  },
  sinProductos: {
    textAlign: 'center',
    fontSize: '18px',
    color: '#7f6a5b',
    marginTop: '50px',
  }
};

export default ClienteConsulta;