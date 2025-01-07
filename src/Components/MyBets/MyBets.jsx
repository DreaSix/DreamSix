import React, { useState } from 'react';
import { List, Card, Avatar, Row, Col } from 'antd';
import './MyBets.scss';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { useNavigate } from 'react-router-dom';

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
  {
    name: 'Suresh Raina',
    date: 'Aug 15th, 2024',
    amount: 3000,
    status: 'Win',
    avatar: 'https://biowikis.com/wp-content/uploads/2020/09/Marcus-Stoinis-Bio-Wiki-Net-Worth.jpg' // Placeholder avatar
  },
  {
    name: 'Rohit Sharma',
    date: 'Aug 6th, 2024',
    amount: 1000,
    status: 'Loss',
    avatar: 'https://starsunfolded.com/wp-content/uploads/2016/05/KL-Rahul-10-768x744.jpg' // Placeholder avatar
  },
  
];

const MyBets = () => {
  const navigate = useNavigate(); // Correctly get the navigate function

  const handlePlayerClick = (selectedPlayer) => {
    navigate("/player-details", { state: { player: selectedPlayer } }); // Use navigate here
  };

  return (
    <main>
    <div>
      <div className="player-page">
        {/* Player List */}
        <List
          dataSource={Betcards}
          renderItem={(player) => (
            <Card
              className="player-card"
              onClick={() => handlePlayerClick(player)}
            >
              <Row gutter={[16, 16]}> {/* Gutter added to create space between items */}
                <Col span={6}>
                  <Avatar src={player.avatar} size={64} />
                </Col>
                <Col span={12}>
                  <h3 className="player-name">{player.name}</h3>
                  <p className="date">{player.date}</p>
                </Col>
                <Col span={6} style={{ textAlign: 'right' }}>
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
      </div>
    </div>
    </main>
  );
};

export default MyBets;
