import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth } from './Context/AuthContext';
import LoginPage from './Components/Login/LoginPage';
import HomePage from './Components/HomePage/HomePage';
import MainHomePage from './Components/MainHomePage/MainHomePage';
import Rules from './Components/Rules/Rules';
import MatchDetails from './Components/MatchDeatils/MatchDetails';

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
          <Route path="/rules" element={<Rules/>}/>
          <Route path="/matchDetails" element={<MatchDetails/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
