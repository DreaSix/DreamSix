import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavbarAfterLogin';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from '../src/pages/ProtectedRoute'
import { AuthProvider } from './Context/AuthContext';
import { useAuth } from './Context/AuthContext';
import NavbarAfterLogin from './components/NavbarAfterLogin';
import NavbarBeforeLogin from './components/NavbarBeforeLogin';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <div style={{height:'100vh',display:'flex',flexDirection:'column',justifyContent:'space-between'}}>

      <Router>
      {isAuthenticated ? <NavbarAfterLogin /> : <NavbarBeforeLogin />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
