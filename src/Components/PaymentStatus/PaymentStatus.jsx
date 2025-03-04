import React, { useEffect, useState } from 'react';
import { Card, Typography, Row, Col } from 'antd';
import './PaymentStatus.scss';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { useParams } from 'react-router-dom';
import { transactionService } from '../../Service/TransactionService';

const { Text } = Typography;

const PaymentStatus = () => {
  const {id} = useParams()
  const [details, setDetails] = useState()

  useEffect(() => {
    getTransactionById()
  }, [])

  const getTransactionById = () => {
    transactionService.getTransactionById(id)
      .then(response => {
        setDetails(response?.data)
      })
      .catch(error => {
        console.log('error', error)
      })
  }
  return (
    <main>
    <div>
        <Header/>
    <div className="payment-details-container">
      <Card className="payment-card">
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Text strong className='payment-headers'style={{color:'#e6a7a7'}}>Request ID</Text>
            <Text className="payment-value">{details?.id}</Text>
          </Col>
          <Col span={24}>
            <Text strong style={{color:'#e6a7a7'}} >Date & Time</Text>
            <Text className="payment-value">{details?.createdAt?.split("T")[0]}</Text>
          </Col>
          <Col span={24}>
            <Text strong style={{color:'#e6a7a7'}} >Amount</Text>
            <Text className="payment-value">₹ {details?.amount}</Text>
          </Col>
          <Col span={24}>
            <Text strong style={{color:'#e6a7a7'}}>Type</Text>
            <Text className="payment-value">{details?.transactionType}</Text>
          </Col>
          <Col span={24}>
            <Text strong style={{color:'#e6a7a7'}}>Status</Text>
            <Text className="payment-value pending">{details?.approvalStatus}</Text>
          </Col>
          {/* <Col span={24}>
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
          </Col> */}
        </Row>
      </Card>
    </div>
    <Footer/>
    </div>
    </main>
  );
};

export default PaymentStatus;
