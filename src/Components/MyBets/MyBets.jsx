import React, { useEffect, useState } from "react";
import { List, Card, Avatar, Row, Col } from "antd";
import "./MyBets.scss";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";
import { matchDetailsService } from "../../Service/MatchDetailsService";
import Cookies from "js-cookie";

const MyBets = () => {
  const navigate = useNavigate();
  const [betData, setBetData] = useState([]);

  useEffect(() => {
    getUserBids();
  }, []);

  const getUserBids = () => {
    matchDetailsService
      .getUserBets(Cookies.get("userId"))
      .then((response) => {
        setBetData(response?.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const handlePlayerClick = (selectedPlayer) => {
    navigate("/player-details", { state: { player: selectedPlayer } });
  };

  console.log("betData", betData);

  return (
    <div>
      <Header />
      <div className="player-page">
        {/* Player List */}
        <List
  dataSource={betData}
  renderItem={(details) => (
    <Card
      key={details.matchDetailsResponse?.matchId} // Unique key for the card
      className="player-card"
      onClick={() => handlePlayerClick(details)}
    >
      <Row gutter={[16, 16]}>
        {/* Match Details */}
        <div style={{display:"flex", justifyContent: "space-between", width:"100%"}}>
          <h2 className="match-name">{details.matchDetailsResponse?.matchName}</h2>
          <p className="auction-type">{details.matchDetailsResponse?.matchAction}</p>
        </div>

        {/* Player Details */}
        {Object.values(details.playersDtoMap || {}).map((player) => (
          <Col span={24} key={player.playerId}>
            <Row gutter={[16, 16]} align="middle">
              <Col span={6}>
                <Avatar src={`data:image/jpeg;base64,${player.playerImage}`} size={64} />
              </Col>
              <Col span={12}>
                <h3 className="player-name">{player.playerName}</h3>
                <p className="date">{player.soldDate.split("T")[0]}</p>
              </Col>
              <Col span={6} style={{ textAlign: "right" }}>
                <div className="amount">₹ {player.soldPrice}</div>
                <div className={`status ${details?.status === "Loss" ? "loss" : "win"}`}>
                  {details?.status}
                </div>
              </Col>
            </Row>
          </Col>
        ))}
      </Row>
    </Card>
  )}
  split={false}
  className="player-list"
/>


      </div>
      <Footer />
    </div>
  );
};

export default MyBets;
