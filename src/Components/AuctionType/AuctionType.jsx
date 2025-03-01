import React from 'react';
import './AuctionType.scss'; // SCSS file for styling
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { useNavigate, useParams } from 'react-router-dom';

// Import all 6 images
import TopSix from '../../assets/topsixer.png';
import TopScorer from '../../assets/topscorer.png';
import MostWickets from '../../assets/Top Wickets.jpg';
import TopContest from '../../assets/TopContestt.png';
// import PowerplayScorer from '../../assets/powerplayscorer.png';
// import DeathOverScorer from '../../assets/deathoverscorer.png';

const AuctionTypePage = () => {
  const { matchId } = useParams();
  const navigate = useNavigate();

  const handleCardClick = (type) => {
    // Pass auction type if needed (optional)
    navigate(`/match-countdown/${matchId}`);
  };

  const options = [
    { label: 'Top Sixer', image: TopSix },
    { label: 'Top Scorer', image: TopScorer },
    { label: 'Most Wickets', image: MostWickets },
    { label: 'Top Contest', image: TopContest },
    // { label: 'Powerplay Scorer', image: PowerplayScorer },
    // { label: 'Death Over Scorer', image: DeathOverScorer },
  ];

  return (
    <div>
      <Header />
      <div className="top-sixer-scorer-page">
        {options.map((option, index) => (
          <div className="option-section" key={index}>
            <h2>▼ {option.label}</h2>
            <div className="card" onClick={() => handleCardClick(option.label)}>
              <img src={option.image} alt={option.label} className="team-image" />
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default AuctionTypePage;
