import { Avatar, Card, Col, Row } from "antd";
import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import "./PlayerDetails.scss"

const PlayerDetails = () => {
    const location = useLocation();
  const { player } = location.state || {};

    return(
      <main>
        <div>
            <div className="player-details">
          <Card className="player-detail-card">
            <div align="middle">
              <Col>
                <Avatar src={player?.avatar} size={94} />
              </Col>
              <Col flex="auto" style={{ marginLeft: '10px' }}>
                <h3 className="player-name">{player.name}</h3>
                <div className="date">Buy Amount: ₹ {player.amount}</div>
                <p className="date">{player.date}</p>
                <h4>Winning Amount</h4>
                <div className="amount-container">₹ {player.amount}</div>
                {/* <div className={`status ${player.status === 'Loss' ? 'loss' : 'win'}`}>
                  {player.status}
                </div> */}
              </Col>
            </div>
          </Card>
        </div>
        </div>
        </main>
    )

}

export default PlayerDetails