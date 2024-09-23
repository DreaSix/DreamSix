import React from 'react';
import './MatchCountDown.scss';  // Import the SCSS file
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { useNavigate } from 'react-router-dom';

const CountdownPage = () => {

    const navigate = useNavigate();

  const cardButton = () =>{   
      navigate("/user-auctionpage");
  }

  return (
    <div>
   <Header/>
  
    <div className="countdown-page">
      <div className="team-section" onClick={cardButton}>
        <img 
          src="https://www.panasiabiz.com/wp-content/uploads/2024/06/ind-vs-ban-2-678x381.png" 
          alt="LSG vs RCB" 
          className="team-image" 
        />
      </div>
      
      <div className="countdown-section">
        <div className="lock-icon">
          <i className="fa fa-lock"></i>
        </div>
        <p className="countdown-message">Get Ready Bid Will Open</p>
        <div className="countdown-timer">
          <span>03</span> : <span>34</span> : <span>23</span>
        </div>
      </div>

      <div className="whatsapp-button">
        <i className="fa fa-whatsapp"></i>
      </div>

      <div className="team-section" onClick={cardButton}>
        <img 
          src="https://www.panasiabiz.com/wp-content/uploads/2024/06/ind-vs-ban-2-678x381.png" 
          alt="LSG vs RCB" 
          className="team-image" 
        />
      </div>
    </div>
    <div>
        <Footer/>
    </div>
    </div>
  );
};

export default CountdownPage;
