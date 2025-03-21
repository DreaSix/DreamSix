import React from "react";
import { FaLock } from "react-icons/fa"; // Import lock icon
import "./AuctionType.scss"; // SCSS file for styling
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useNavigate, useParams } from "react-router-dom";

// Import images
import TopSix from "../../assets/topsixer.png";
import TopScorer from "../../assets/topscorer.png";

const AuctionTypePage = () => {
  const { matchId } = useParams();
  const navigate = useNavigate();

  const handleCardClick = (type, isLocked) => {
    if (!isLocked) {
      navigate(`/match-countdown/${matchId}`);
    }
  };

  const options = [
    { label: "Top Sixer", image: TopSix, isLocked: false },
    { label: "Top Scorer", image: TopScorer, isLocked: true }, // Locked
  ];

  return (
    <main>
      <div>
        <Header />
        <div className="top-sixer-scorer-page">
          {options.map((option, index) => (
            <div className="option-section" key={index}>
              <h2>▼ {option.label}</h2>
              <div
                className={`card ${option.isLocked ? "locked" : ""}`}
                onClick={() => handleCardClick(option.label, option.isLocked)}
              >
                {option.isLocked && <FaLock className="lock-icon" />}{" "}
                {/* Lock Icon */}
                <img
                  src={option.image}
                  alt={option.label}
                  className="team-image"
                />
              </div>
            </div>
          ))}
        </div>
        <Footer />
      </div>
    </main>
  );
};

export default AuctionTypePage;
