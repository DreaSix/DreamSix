import React from 'react';
import { Card, Typography, Row, Col } from 'antd';
import './PaymentStatus.scss';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const { Text } = Typography;

const PaymentStatus = () => {
  return (
    <div>
        <Header/>
    <div className="payment-details-container">
      <Card className="payment-card">
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Text strong className='payment-headers'style={{color:'#e6a7a7'}}>Request ID</Text>
            <Text className="payment-value">#tnx33074901</Text>
          </Col>
          <Col span={24}>
            <Text strong style={{color:'#e6a7a7'}} >Date & Time</Text>
            <Text className="payment-value">Aug 6th, 2024, 16:08:05</Text>
          </Col>
          <Col span={24}>
            <Text strong style={{color:'#e6a7a7'}} >Amount</Text>
            <Text className="payment-value">₹ 1000</Text>
          </Col>
          <Col span={24}>
            <Text strong style={{color:'#e6a7a7'}}>Type</Text>
            <Text className="payment-value">Deposit</Text>
          </Col>
          <Col span={24}>
            <Text strong style={{color:'#e6a7a7'}}>Status</Text>
            <Text className="payment-value pending">Pending</Text>
          </Col>
          <Col span={24}>
            <Text strong style={{color:'#e6a7a7'}}>Payment Type</Text>
            <Text className="payment-value">IMPS</Text>
          </Col>
          <Col span={24}>
            <Text strong style={{color:'#e6a7a7'}}>Remarks</Text>
            <Text className="payment-value">Deposit Done</Text>
          </Col>
          <Col span={24}>
            <Text strong style={{color:'#e6a7a7'}}>Transaction Image</Text>
            <Text className="payment-value">screenshot1.img.png</Text>
          </Col>
        </Row>
      </Card>
    </div>
    <Footer/>
    </div>
  );
};

export default PaymentStatus;
