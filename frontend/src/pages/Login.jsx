import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');

  const manejarLogin = async (e) => {
    e.preventDefault();

    try {
      const respuesta = await axios.post('http://localhost:3000/api/users/login', {
        email,
        password
      });

      // Si el servidor responde bien, guardamos el token y el rol en el navegador
      const { token, user } = respuesta.data;
      localStorage.setItem('token', token);
      localStorage.setItem('role', user.role);
      localStorage.setItem('nombre', user.nombre);

      setMensaje(`¡Bienvenido ${user.nombre}! Tu rol es: ${user.role}`);
      
      if (user.role === 'admin') {
      navigate('/admin');
    } else if (user.role === 'ventas') {
      navigate('/ventas');
    } else {
      navigate('/cliente');
    }

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
      <h2>Login de la Cafetería (Prueba Técnica)</h2>
      <form onSubmit={manejarLogin}>
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
        <button type="submit">Ingresar</button>
      </form>

      {/* Mostrar mensajes de éxito o error en la pantalla */}
      {mensaje && <p style={{ marginTop: '15px', fontWeight: 'bold' }}>{mensaje}</p>}
      <p style={{ marginTop: '20px' }}>
          ¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link>
        </p>
    </div>
  );
}

export default Login;