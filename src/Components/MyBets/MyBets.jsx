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
  const [groupedBets, setGroupedBets] = useState([]);


  useEffect(() => {
    getUserBids();
  }, []);

  const getUserBids = () => {
    matchDetailsService
      .getUserBets(Cookies.get("userId"))
      .then((response) => {
        const originalData = response?.data || [];
        const grouped = groupByMatchId(originalData);
        setGroupedBets(grouped);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const groupByMatchId = (data) => {
    const groupedMap = {};

    data.forEach((item) => {
      const matchId = item.matchDetailsResponse?.matchId;
      if (!matchId) return;

      if (!groupedMap[matchId]) {
        groupedMap[matchId] = {
          matchDetailsResponse: item.matchDetailsResponse,
          status: item.status,
          players: [],
        };
      }

      const players = Object.values(item.playersDtoMap || {});
      groupedMap[matchId].players.push(...players);
    });

    return Object.values(groupedMap);
  };

  const handlePlayerClick = (selectedPlayer) => {
    navigate("/player-details", { state: { player: selectedPlayer } });
  };


  return (
    <div>
      <Header />
      <div className="player-page">
      <List
          dataSource={groupedBets}
          renderItem={(matchData) => {
            const { matchDetailsResponse, players, status } = matchData;

            return (
              <Card
                key={matchDetailsResponse?.matchId}
                className="player-card"
              >
                {/* Match Details */}
                <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                  <h2 className="match-name">{matchDetailsResponse?.matchName}</h2>
                  <p className="auction-type">{matchDetailsResponse?.matchAction}</p>
                </div>

                {/* Players for this match */}
                {players.map((player) => (
                  <Row
                    key={player.playerId}
                    gutter={[16, 16]}
                    align="middle"
                    className="player-row"
                    onClick={() => handlePlayerClick(player)}
                    style={{ cursor: "pointer", marginTop: "10px", borderTop: "1px solid #f0f0f0", paddingTop: "10px" }}
                  >
                    <Col span={4}>
                      <Avatar src={player.playerImage} size={64} />
                    </Col>
                    <Col span={14}>
                      <h3 className="player-name">{player.playerName}</h3>
                      <p className="date">{player.soldDate?.split("T")[0]}</p>
                    </Col>
                    <Col span={6} style={{ textAlign: "right" }}>
                      <div className="amount">₹ {player.soldPrice}</div>
                      <div className={`status ${status === "Loss" ? "loss" : "win"}`}>
                        {status}
                      </div>
                    </Col>
                  </Row>
                ))}
              </Card>
            );
          }}
          split={false}
          className="player-list"
        />
      </div>
      <Footer />
    </div>
  );
};

export default MyBets;
