import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Registro from './pages/Registro';
import ClienteConsulta from './pages/ClienteConsulta';
import AdminProductos from './pages/AdminProductos';
import PersonalVentas from './pages/PersonalVentas';

// Componente para proteger las rutas (Seguridad básica)
// Evita que un cliente escriba "/admin" en la URL y entre sin permiso
const RutaProtegida = ({ children, rolPermitido }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (rolPermitido && userRole !== rolPermitido) {
    return <Navigate to="/login" />; 
  }

  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas Públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />

        {/* Rutas Protegidas por Rol */}
        <Route 
          path="/cliente" 
          element={<RutaProtegida rolPermitido="cliente"><ClienteConsulta /></RutaProtegida>} 
        />
        <Route 
          path="/admin" 
          element={<RutaProtegida rolPermitido="admin"><AdminProductos /></RutaProtegida>} 
        />
        <Route 
          path="/ventas" 
          element={<RutaProtegida rolPermitido="ventas"><PersonalVentas /></RutaProtegida>} 
        />

        {/* Redirección por defecto si entran a la raíz */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;