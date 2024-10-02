import React from 'react';
import { Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import './MatchCountDown.scss';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

const playersTeam1 = [
  { name: 'KL Rahul', image: 'https://starsunfolded.com/wp-content/uploads/2016/05/KL-Rahul-10-768x744.jpg' },
  { name: 'Quinton De Kock', image: 'https://biowikis.com/wp-content/uploads/2020/09/Marcus-Stoinis-Bio-Wiki-Net-Worth.jpg' },
  { name: 'Dinesh Karthik', image: 'https://biowikis.com/wp-content/uploads/2020/09/Marcus-Stoinis-Bio-Wiki-Net-Worth.jpg' },
  { name: 'Will Jacks', image: 'https://starsunfolded.com/wp-content/uploads/2016/05/KL-Rahul-10-768x744.jpg' },
  { name: 'Suyash', image: 'https://biowikis.com/wp-content/uploads/2020/09/Marcus-Stoinis-Bio-Wiki-Net-Worth.jpg' },
  { name: 'KL Rahul', image: 'https://starsunfolded.com/wp-content/uploads/2016/05/KL-Rahul-10-768x744.jpg' },
];

const playersTeam2 = [
  { name: 'Faf Du Plessis', image: 'https://biowikis.com/wp-content/uploads/2020/09/Marcus-Stoinis-Bio-Wiki-Net-Worth.jpg' },
  { name: 'Rajat Patidar', image: 'https://starsunfolded.com/wp-content/uploads/2016/05/KL-Rahul-10-768x744.jpg' },
  { name: 'Virat Kohli', image: 'https://starsunfolded.com/wp-content/uploads/2016/05/KL-Rahul-10-768x744.jpg' },
  { name: 'Dinesh Karthik', image: 'https://biowikis.com/wp-content/uploads/2020/09/Marcus-Stoinis-Bio-Wiki-Net-Worth.jpg' },
  { name: 'Will Jacks', image: 'https://starsunfolded.com/wp-content/uploads/2016/05/KL-Rahul-10-768x744.jpg' },
  { name: 'Suyash', image: 'https://biowikis.com/wp-content/uploads/2020/09/Marcus-Stoinis-Bio-Wiki-Net-Worth.jpg' }
];

const CountdownPage = () => {
  const navigate = useNavigate(); // Initialize useNavigate for routing

  const handleImageClick = () => {
    navigate('/user-auctionpage'); // Navigate to the desired route
  };

  return (
    <div>
      <Header />
      <div className="cricket-page-container">

        {/* Match Info */}
        <div className="match-info">
          <img
            src="https://www.livemint.com/lm-img/img/2023/11/17/1600x900/worldcup_1700222402533_1700222420078.jpg"
            alt="LSG vs RCB"
            className="match-banner"
            onClick={handleImageClick} // Add the click event here
            style={{ cursor: 'pointer' }} // Change cursor to pointer to indicate clickability
          />
          <div className="bid-info">
            <div className="top-sixer">Top Sixer</div>
            <div className="countdown">03 : 34 : 23</div>
          </div>
        </div>

        {/* Player Lists */}
        <div className="player-list-container">
          <h2>LSG vs RCB</h2>
          <Row className="player-list-header">
            <Col span={12}>Team-1</Col>
            <Col span={12}>Team-2</Col>
          </Row>
          <Row className="player-list">
            <Col span={12}>
              {playersTeam1.map((player, index) => (
                <div key={index} className="player-item">
                  <img src={player.image} alt={player.name} className="player-icon" />
                  <span>{player.name}</span>
                </div>
              ))}
            </Col>
            <Col span={12}>
              {playersTeam2.map((player, index) => (
                <div key={index} className="player-item">
                  <img src={player.image} alt={player.name} className="player-icon" />
                  <span>{player.name}</span>
                </div>
              ))}
            </Col>
          </Row>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CountdownPage;
