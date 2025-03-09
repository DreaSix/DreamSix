import React, { useEffect, useState } from 'react';
import { List, Card, Avatar, Row, Col } from 'antd';
import './MyBets.scss';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { useNavigate } from 'react-router-dom';
import { matchDetailsService } from '../../Service/MatchDetailsService';
import Cookies from "js-cookie";


const MyBets = () => {
  const navigate = useNavigate();
  const [betData, setBetData] = useState([])

  useEffect(() => {
    getUserBids()
  }, [])

  const getUserBids = () => {
    matchDetailsService.getUserBets(Cookies.get("userId"))
      .then(response => {
        setBetData(response?.data)
      })
      .catch(error => {
        console.log('error', error)
      })
  }

  const handlePlayerClick = (selectedPlayer) => {
    navigate("/player-details", { state: { player: selectedPlayer } });
  };

  return (
    <div>
      <Header />
      <div className="player-page">
        {/* Player List */}
        <List
          dataSource={betData}
          renderItem={(player) => (
            <Card
              className="player-card"
              onClick={() => handlePlayerClick(player)}
            >
              <Row gutter={[16, 16]}> {/* Gutter added to create space between items */}
                <Col span={6}>
                  <Avatar src={`data:image/jpeg;base64,${player?.playerImage}`} size={64} />
                </Col>
                <Col span={12}>
                  <h3 className="player-name">{player.playerName}</h3>
                  <p className="date">{player?.soldDate}</p>
                </Col>
                <Col span={6} style={{ textAlign: 'right' }}>
                  <div className="amount">₹ {player?.soldPrice}</div>
                  <div className={`status ${player.status === 'Loss' ? 'loss' : 'win'}`}>
                    {player.status}
                  </div>
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
