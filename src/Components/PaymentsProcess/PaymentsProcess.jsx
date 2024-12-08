import React from 'react';
import { Button, Card } from 'antd';
import './PaymentsProcess.scss';
import ProcessImage from '../../assets/paymentprocess.jpeg'
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { useNavigate } from 'react-router-dom';

const PaymentsProcess = () => {
  const navigate = useNavigate(); // Initialize useNavigate for routing

  const handleDone = () => {
    navigate('/homepage'); // Navigate to the desired route
  };

  return (
    <div>
      <Header/>
    <div className="pending-payment-container">
      <Card className="payment-card">
        <img
          src={ProcessImage} // Replace with the correct image URL
          alt="Pending Illustration"
          className="payment-image"
        />
        <h2 className="status-pending">Pending</h2>
        <p className="payment-info">
          Payment takes under 5 - 10 mins to process
        </p>
        <p className="redirect-info">
          Page will automatically be redirected to the main page (or) Click the button below
        </p>
        <Button onClick={handleDone}  className="done-button">
          Done
        </Button>
        <p className="thank-you">
          Thank you for choosing DreamSix
        </p>
      </Card>
    </div>
    <Footer/>
    </div>
  );
};

export default PaymentsProcess;
