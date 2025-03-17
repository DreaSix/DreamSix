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
        setBetData(response?.data || []);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const handlePlayerClick = (selectedPlayer) => {
    navigate("/player-details", { state: { player: selectedPlayer } });
  };

  console.log("betData", betData);

  // Flatten data: each player should have its own card
  const flattenedBets = betData.flatMap((details) =>
    Object.values(details.playersDtoMap || {}).map((player) => ({
      matchId: details.matchDetailsResponse?.matchId,
      matchName: details.matchDetailsResponse?.matchName,
      matchAction: details.matchDetailsResponse?.matchAction,
      status: details?.status,
      player,
    }))
  );

  return (
    <div>
      <Header />
      <div className="player-page">
        <List
          dataSource={flattenedBets}
          renderItem={(bet) => (
            <Card
              key={`${bet.matchId}-${bet.player.playerId}`} // Unique key
              className="player-card"
              onClick={() => handlePlayerClick(bet.player)}
            >
              <Row gutter={[16, 16]}>
                {/* Match Details */}
                <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                  <h2 className="match-name">{bet.matchName}</h2>
                  <p className="auction-type">{bet.matchAction}</p>
                </div>

                {/* Player Details */}
                <Col span={24}>
                  <Row gutter={[16, 16]} align="middle">
                    <Col span={6}>
                      <Avatar src={`data:image/jpeg;base64,${bet.player.playerImage}`} size={64} />
                    </Col>
                    <Col span={12}>
                      <h3 className="player-name">{bet.player.playerName}</h3>
                      <p className="date">{bet.player.soldDate.split("T")[0]}</p>
                    </Col>
                    <Col span={6} style={{ textAlign: "right" }}>
                      <div className="amount">₹ {bet.player.soldPrice}</div>
                      <div className={`status ${bet.status === "Loss" ? "loss" : "win"}`}>
                        {bet.status}
                      </div>
                    </Col>
                  </Row>
                </Col>
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
