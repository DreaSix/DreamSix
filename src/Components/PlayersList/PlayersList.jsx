import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "antd";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import "./PlayersList.scss";

const PlayersList = () => {
  const navigate = useNavigate();

  const matches = [
    {
      id: 1,
      team1: "LSG",
      team2: "RCB",
      img: "https://img.jagranjosh.com/images/2024/April/242024/RCB-vs-LSG-today.jpg",
      countdown: "03:34:23",
    },
    {
      id: 2,
      team1: "SRH",
      team2: "RR",
      img: "https://sm.ign.com/t/ign_in/screenshot/default/template-1-ipl_3m2z.1200.png",
      countdown: "03:34:23",
    },
    {
      id: 3,
      team1: "LSG",
      team2: "CSK",
      img: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/poster-design-template-351effd160d6232fa505498a400cd1a1_screen.jpg?ts=1713411077",
      countdown: "03:34:23",
    },
    // {
    //   id: 4,
    //   team1: "IND",
    //   team2: "AUS",
    //   img: "https://images.news9live.com/wp-content/uploads/2024/10/India-vs-Australia-womens-t20-World-Cup.jpg?w=1200&enlarge=true",
    //   countdown: "03:34:23",
    // },
  ];

  return (
    <div className="match-page">
      <Header />
      <div className="matches-container">
        {matches.map((match) => (
          <Card
            key={match.id}
            hoverable
            className="match-card"
            // onClick={() => navigate(`/match/${match.id}`)}
            onClick={() => navigate('/players-final-list')}
          >
            <img
              src={match.img}
              alt={`${match.team1} vs ${match.team2}`}
              className="match-image"
            />
            <div className="match-info">
              <h3>
                {match.team1} vs {match.team2}
              </h3>
              <p>{match.countdown}</p>
            </div>
          </Card>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default PlayersList;
