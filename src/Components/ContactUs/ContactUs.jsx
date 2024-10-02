import React from 'react';
import { MailOutlined, PhoneOutlined, WhatsAppOutlined, InstagramOutlined } from '@ant-design/icons';
import { Row, Col, Card } from 'antd';
import Icon from '@ant-design/icons';
import './ContactUs.scss';
import { Footer, Header } from 'antd/es/layout/layout';

// SVG for Telegram Icon
const TelegramSVG = () => (
  <svg
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
  >
    <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm3.021 14.601c-.224.674-.879.977-1.462.677l-2.083-1.528-1.003.962c-.11.11-.256.198-.413.258l-.46.174-.652.209-.001-.002-1.044-.335-.009-.003c-.336-.108-.574-.331-.662-.647-.088-.315-.023-.602.153-.845.064-.088.149-.172.247-.249l2.706-2.06c.014-.014.023-.031.039-.045l3.739-2.46c.332-.216.694.042.523.387L14.32 12l-3.363 3.388 2.574 1.785c.141.099.284.13.444.049.163-.084.253-.218.306-.392l.526-1.684-2.114-1.371.325-1.516 3.359 2.07c.431.265.597.669.468 1.16z" />
  </svg>
);

// Wrapping SVG in an Ant Design Icon component
const TelegramIcon = props => <Icon component={TelegramSVG} {...props} />;

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
            <TelegramIcon className="social-icon" />
          </Card>
        </Col>
      </Row>
    </div>
    <Footer/>
    </div>
  );
};

export default ContactUs;
