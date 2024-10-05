import React, { useState } from 'react';
import { Tabs, Card, Row, Col, Button } from 'antd';
import './PlayersList.scss'; // Add your styles here
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import PaymentStatus from '../PaymentStatus/PaymentStatus';
import PlayersFinalList from './PlayersFinalList';

const { TabPane } = Tabs;

const PlayersList = () => {
  const [selectedMatch, setSelectedMatch] = useState(null); // Track selected match

  const matches = [
    {
      img: 'https://www.panasiabiz.com/wp-content/uploads/2024/06/ind-vs-ban-2-678x381.png',
    },
    {
      img: 'https://img.jagranjosh.com/images/2023/November/3112023/england-vs-australia-head-to-head.jpg',
      
    },
  ];

  // Function to handle match card click
  const handleMatchClick = (match) => {
    setSelectedMatch(match); // Set the selected match
  };

 

  return (
    <div>
      <Header />
      <div className="match-page">
        {selectedMatch ? (
          <div>
            <PlayersFinalList/>
          </div>
        ) : (
          <Tabs defaultActiveKey="1" centered className="tabs-wrapper">
            <TabPane tab="Today Matches" key="1">
              <Row gutter={[16, 16]}>
                {matches.map((match, index) => (
                  <Col xs={24} sm={12} key={index}>
                    <Card
                      hoverable
                      onClick={() => handleMatchClick(match)} // Set selected match on click
                    >
                      <img src={match.img} className="match-image" />
                     
                    </Card>
                  </Col>
                ))}
              </Row>
            </TabPane>
            <TabPane tab="Tomorrow Matches" key="2">
              <p>No matches available for tomorrow.</p>
            </TabPane>
          </Tabs>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default PlayersList;
