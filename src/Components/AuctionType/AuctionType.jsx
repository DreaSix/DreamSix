import React, { useEffect, useState } from "react";
import { FaLock } from "react-icons/fa"; // Import lock icon
import "./AuctionType.scss"; // SCSS file for styling
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useNavigate, useParams } from "react-router-dom";

// Import images
import TopSix from "../../assets/topsixer.png";
import TopScorer from "../../assets/topscorer.png";
import { matchDetailsService } from "../../Service/MatchDetailsService";

const AuctionTypePage = () => {
  const { matchId } = useParams();
  const [matchData, setMatchDetails] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (matchId) {
      getMatchDetailsById();
    }
  }, [matchId]);

  const getMatchDetailsById = () => {
    matchDetailsService
      .getMtachDetailsById(matchId)
      .then((response) => {
        setMatchDetails(response?.data);
      })
      .catch((error) => {
        console.log("Error fetching match details:", error);
      });
  };

  const handleCardClick = (type, isLocked) => {
    if (!isLocked) {
      navigate(`/match-countdown/${matchId}`);
    }
  };

  // Define possible auction types
  const allOptions = [
    { label: "Top Sixer", key: "topSixer", image: TopSix, isLocked: false },
    { label: "Top Scorer", key: "topScorer", image: TopScorer, isLocked: true }, // Locked by default
  ];

  // Filter options based on matchData.matchAction
  const availableOptions = matchData?.matchAction
    ? allOptions.filter(option => matchData.matchAction.includes(option.key))
    : [];

  return (
    <main>
      <div>
        <Header />
        <div className="top-sixer-scorer-page">
          {availableOptions.map((option, index) => (
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
