import React from 'react';
import { Button, Card } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import "../HomePage/Homepage.scss";
import { HomeOutlined, TrophyOutlined, TeamOutlined, BookOutlined, DollarCircleOutlined, WhatsAppOutlined } from '@ant-design/icons';
import DreamSixLogo from '../../assets/IMG-20240915-WA0005.jpg';
const HomePage = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
      navigate('/loginpage');  // Navigates to the login page
    };

  return (
    <div className="landing-page">
      {/* Header */}
      <div className="header">
        <img src={""} alt="DreamSix Logo" className="logo" />
        <div className="header-buttons">
          <Button className="signup-button">Signup</Button>
          <Button className="login-button" type="primary" onClick={handleLoginClick}>Login</Button>
        </div>
      </div>

     {/* Today Matches */}
     <div className="section matches-section">
        <h3>Today matches</h3>
        <Card className="match-card">
          <img src="https://www.panasiabiz.com/wp-content/uploads/2024/06/ind-vs-ban-2-678x381.png" alt="LSG vs RCB" className="match-image" />
          <div className="match-details">
            <p>Get Ready Bid Will Open</p>
            <p className="countdown">03:34:23</p>
          </div>
        </Card>
      </div>

      {/* WhatsApp Call to Action */}
      <div className="whatsapp-cta">
        <Card>
          <h3>Open Account On WhatsApp</h3>
          <p>"One Click Is All It Takes To Win More, Dream Bigger, And Turn Your Ambitions Into Reality."</p>
          <Button className="whatsapp-button">
            <WhatsAppOutlined/>
          </Button>
        </Card>
      </div>

      {/* Recent Winners */}
      <div className="recent-winners">
        <h3>Recent Winners</h3>
        <div className="winners-list">
          <Card className="winner-card">
            <img src="https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg" alt="Aditya Chatterjee" className="winner-avatar" />
            <h4>Aditya Chatterjee</h4>
            <p>₹ 45,000</p>
          </Card>
          <Card className="winner-card">
            <img src="https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg" className="winner-avatar" />
            <h4>Manish Kapoor</h4>
            <p>₹ 56,000</p>
          </Card>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bottom-nav">
        <div className="nav-item">
          <Link to="/home">
            <HomeOutlined style={{ fontSize: '24px' }} />
            <p>Home</p>
          </Link>
        </div>
        <div className="nav-item">
          <Link to="/matches">
            <TrophyOutlined style={{ fontSize: '24px' }} />
            <p>Matches</p>
          </Link>
        </div>
        <div className="nav-item">
          <Link to="/players">
            <TeamOutlined style={{ fontSize: '24px' }} />
            <p>Players List</p>
          </Link>
        </div>
        <div className="nav-item">
          <Link to="/rules">
            <BookOutlined style={{ fontSize: '24px' }} />
            <p>Rules</p>
          </Link>
        </div>
        <div className="nav-item">
          <Link to="/bets">
            <DollarCircleOutlined style={{ fontSize: '24px' }} />
            <p>My Bets</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
