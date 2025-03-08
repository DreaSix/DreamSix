import React, { useState } from 'react';
import { MailOutlined, PhoneOutlined, WhatsAppOutlined, InstagramOutlined } from '@ant-design/icons';
import { Row, Col, Card, Button } from 'antd';
import './ContactUs.scss';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import PlayerModal from '../ReusableCode/SoldModal';
import BiddingOverModal from '../ReusableCode/BiddingOverModal';

const ContactUs = () => {
  const [isPlayerModalVisible, setIsPlayerModalVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <main>
    <div>
      <Header />
      <div className="contact-page">
        <Row justify="center" className="contact-info">
          <Col span={24} style={{ textAlign: 'center' }}>
            <h2>Let’s Get In Touch</h2>
            <p>
              Or just reach out manually to{' '}
              <a href="mailto:dreamsix@gmail.com" className="email-link">
                dreamsix@gmail.com
              </a>
            </p>
          </Col>
          <Col span={12}>
            <Card className="contact-card">
              <PhoneOutlined style={{ fontSize: '24px', color: '#FFD700' }} />
              <span className="phone-number">+91 9515208658</span>
            </Card>
          </Col>
        </Row>

        <Row justify="center" className="social-media">
          <Col span={24} style={{ textAlign: 'center' }}>
            <h3>Follow Us</h3>
          </Col>
          <Col span={12}>
            <Card className="social-icons-card">
              <WhatsAppOutlined className="social-icon" />
              <InstagramOutlined className="social-icon" />
            </Card>
          </Col>
        </Row>

        <div className="open-modal-btn">
          <Button type="primary" onClick={() => setIsPlayerModalVisible(true)}>
            Open Player Modal
          </Button>
        </div>

        <div>
          <Button onClick={() => setIsModalVisible(true)}>Show Bidding Over Modal</Button>
        </div>
      </div>

      <Footer />

      Modals
      <PlayerModal visible={isPlayerModalVisible} onClose={() => setIsPlayerModalVisible(false)} />
      <BiddingOverModal visible={isModalVisible} onClose={() => setIsModalVisible(false)} />
    </div>
    </main>
  );
};

export default ContactUs;
