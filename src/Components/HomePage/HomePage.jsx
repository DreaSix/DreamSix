import React from 'react';
import { Button, Card, Carousel } from 'antd';
import { useNavigate } from 'react-router-dom';
import { WhatsAppOutlined } from '@ant-design/icons';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import "../HomePage/Homepage.scss";

const matches = [
  {
    id: 1,
    image: "https://www.panasiabiz.com/wp-content/uploads/2024/06/ind-vs-ban-2-678x381.png",
    details: "Get Ready Bid Will Open",
    countdown: "03:34:23"
  },
  {
    id: 2,
    image: "https://img.jagranjosh.com/images/2023/November/3112023/england-vs-australia-head-to-head.jpg",
    details: "Match Starts Soon",
    countdown: "05:12:15"
  },
  {
    id: 3,
    image: "https://tse4.mm.bing.net/th?id=OIP.sozWmFFHVrtOK54hN1aYGAHaEK&pid=Api&P=0&h=180",
    details: "Prepare for the Match",
    countdown: "02:45:30"
  },
  // Add more match cards as needed
];

const HomePage = () => {
  const navigate = useNavigate();

  const onClickMatchImage = () => {
    navigate("/auction-type");
  };

  return (
    <div className="landing-page">
      {/* Header */}
      <Header />

      {/* Today Matches Carousel */}
      <div className="section matches-section">
        <h3>Today Matches</h3>
        <Carousel autoplay dots infinite>
          {matches.map(match => (
            <div key={match.id}>
              <Card className="match-card" hoverable>
                <img 
                  src={match.image} 
                  alt={`Match ${match.id}`} 
                  onClick={onClickMatchImage} 
                  className="match-image" 
                  style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                />
                <div className="match-details">
                  <p>{match.details}</p>
                  <p className="countdown">{match.countdown}</p>
                </div>
              </Card>
            </div>
          ))}
        </Carousel>
      </div>

      {/* WhatsApp Call to Action */}
      <div className="whatsapp-cta">
        <div className='whatsapp-container'>
          <div className='whatsapp-details'>
            <h3>Customer Support</h3>
            <p>"One Click Is All It Takes To Win More, Dream Bigger, And Turn Your Ambitions Into Reality."</p>
          </div>
          <Button className="whatsapp-button">
            <WhatsAppOutlined />
          </Button>
        </div>
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
            <img src="https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg" alt="Manish Kapoor" className="winner-avatar" />
            <h4>Manish Kapoor</h4>
            <p>₹ 56,000</p>
          </Card>
        </div>
      </div>

      {/* Bottom Navigation */}
      <Footer />
    </div>
  );
};

export default HomePage;
