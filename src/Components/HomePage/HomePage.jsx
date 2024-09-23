import React from 'react';
import { Button, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
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

];

const HomePage = () => {
  const navigate = useNavigate();

  const onClickMatchImage = () => {
    navigate("/matchDetails");
  };

  return (
    <div className="landing-page">
      {/* Header */}
      <Header />

      {/* Today Matches */}
      <div className="section matches-section">
        <h3>Today Matches</h3>
        <Swiper
          spaceBetween={10}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
        >
          {matches.map(match => (
            <SwiperSlide key={match.id}>
              <Card className="match-card">
                <img 
                  src={match.image} 
                  alt={`Match ${match.id}`} 
                  onClick={onClickMatchImage} 
                  className="match-image" 
                />
                <div className="match-details">
                  <p>{match.details}</p>
                  <p className="countdown">{match.countdown}</p>
                </div>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
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
