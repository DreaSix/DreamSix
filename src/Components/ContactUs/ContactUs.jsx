import React from 'react';
import { MailOutlined, PhoneOutlined, WhatsAppOutlined, InstagramOutlined } from '@ant-design/icons';
import { Row, Col, Card } from 'antd';
import Icon from '@ant-design/icons';
import './ContactUs.scss';
import Header from '../Header/Header';
import Footer from '../Footer/Footer'


const ContactUs = () => {
  return (
    <div>
      <Header/>
      <div className="contact-page">
      {/* Contact Information Section */}
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

      {/* Social Media Section */}
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
    </div>
    <Footer/>
    </div>
  );
};

export default ContactUs;
