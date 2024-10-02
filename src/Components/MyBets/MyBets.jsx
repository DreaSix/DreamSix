import React, { useState } from 'react';
import { List, Card, Avatar, Row, Col } from 'antd';
import './MyBets.scss';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const Betcards = [
  {
    name: 'Rohit Sharma',
    date: 'Aug 6th, 2024',
    amount: 1000,
    status: 'Loss',
    avatar: 'https://starsunfolded.com/wp-content/uploads/2016/05/KL-Rahul-10-768x744.jpg' // Placeholder avatar
  },
  {
    name: 'Suresh Raina',
    date: 'Aug 15th, 2024',
    amount: 3000,
    status: 'Win',
    avatar: 'https://biowikis.com/wp-content/uploads/2020/09/Marcus-Stoinis-Bio-Wiki-Net-Worth.jpg' // Placeholder avatar
  },
];

const MyBets = () => {
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const handlePlayerClick = (player) => {
    setSelectedPlayer(player);
  };

  return (
    <div>
        <Header/>
    <div className="player-page">
      {/* Player List */}
      <List
        dataSource={Betcards}
        renderItem={(player) => (
          <Card
            className="player-card"
            onClick={() => handlePlayerClick(player)}
          >
            <Row align="middle">
              <Col>
                <Avatar src={player.avatar} size={64} />
              </Col>
              <Col flex="auto" style={{ marginLeft: '10px' }}>
                <h3 className="player-name">{player.name}</h3>
                <p className="date">{player.date}</p>
              </Col>
              <Col>
                <div className="amount">₹ {player.amount}</div>
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

      {/* Player Details */}
      {selectedPlayer && (
        <div className="player-details">
          <Card className="player-detail-card">
            <Row align="middle">
              <Col>
                <Avatar src={selectedPlayer.avatar} size={64} />
              </Col>
              <Col flex="auto" style={{ marginLeft: '10px' }}>
                <h3 className="player-name">{selectedPlayer.name}</h3>
                <p className="date">{selectedPlayer.date}</p>
                <div className="amount">₹ {selectedPlayer.amount}</div>
                <div className={`status ${selectedPlayer.status === 'Loss' ? 'loss' : 'win'}`}>
                  {selectedPlayer.status}
                </div>
              </Col>
            </Row>
          </Card>
        </div>
      )}
    </div>
    <Footer/>
    </div>
  );
};

export default MyBets;
