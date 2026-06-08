import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Registro() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const manejarRegistro = async (e) => {
    e.preventDefault();

    try {
      const respuesta = await axios.post('http://localhost:3000/api/users/register', {
        nombre,
        email,
        password,
        role: 'cliente' 
      });

      setMensaje(respuesta.data.msg);
      
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (error) {
      if (error.response) {
        setMensaje(error.response.data.msg);
      } else {
        setMensaje('Error al conectar con el servidor.');
      }
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Registro de Clientes - Cafetería</h2>
      <form onSubmit={manejarRegistro}>
        <div>
          <label>Nombre Completo:</label><br />
          <input 
            type="text" 
            value={nombre} 
            onChange={(e) => setNombre(e.target.value)} 
            required 
          />
        </div>
        <br />
        <div>
          <label>Correo Electrónico:</label><br />
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <br />
        <div>
          <label>Contraseña:</label><br />
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <br />
        <button type="submit">Registrarse</button>
      </form>

      {mensaje && <p style={{ marginTop: '15px', fontWeight: 'bold', color: 'green' }}>{mensaje}</p>}

      <p style={{ marginTop: '20px' }}>
        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
      </p>
    </div>
  );
}

export default Registro;