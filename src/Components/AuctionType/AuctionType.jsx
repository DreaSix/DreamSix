import React, { useState } from 'react';
import './AuctionType.scss'; // SCSS file for styling
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { Button } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import TopSix from '../../assets/topsixer.png'
import TopScorer from '../../assets/topscorer.png'

const AuctionTypePage = () => {
  const { matchId } = useParams();
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };


  const navigate = useNavigate();

  const cardButton = () =>{   
      navigate(`/match-countdown/${matchId}`);
  }

  return (
    <div>
           <Header/>
    <div className="top-sixer-scorer-page">
      <div className="option-section">
        <h2> ▼ TopSixer </h2> 
        <div className="card"  onClick={cardButton}>
          <img src={TopSix} alt="LSG vs RCB" className="team-image" />
        </div>
      </div>

      <div className="option-section">
        <h2> ▼ TopScorer</h2>
        <div className="card"  onClick={cardButton}>
            <img src={TopScorer} alt="LSG vs RCB" className="team-image" />
           </div>
      </div>
    </div>
    <div>
        <Footer/>
    </div>
    </div>
  );
};

export default AuctionTypePage;
