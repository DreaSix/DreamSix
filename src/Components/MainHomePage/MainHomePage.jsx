import React from 'react';
import { Button, Card } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, TrophyOutlined, TeamOutlined, BookOutlined, DollarCircleOutlined, WhatsAppOutlined, UserOutlined } from '@ant-design/icons';
import "./MainHomePage.scss";
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const MainHomePage = () => {
  return (
    <div className="home-page">
      {/* Header */}
      <Header/>

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

      {/* Customer Support */}
      <div className="section support-section">
        <Card className="support-card">
          <h3>Customer Support</h3>
          <p>"We're Here To Help With Any Questions Or Concerns You May Have. Your Satisfaction Is Our Priority."</p>
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
       <Footer/>
    </div>
  );
};

export default MainHomePage;
