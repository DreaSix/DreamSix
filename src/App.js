import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth } from './Context/AuthContext';
import LoginPage from './Components/Login/LoginPage';
import HomePage from './Components/HomePage/HomePage';
import MainHomePage from './Components/MainHomePage/MainHomePage';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <div style={{height:'100vh',display:'flex',flexDirection:'column',justifyContent:'space-between'}}>

      <Router>
      {/* {isAuthenticated ? <NavbarAfterLogin /> : <NavbarBeforeLogin />} */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/loginpage" element={<LoginPage />} />
          <Route path="/main-homepage" element={<MainHomePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
