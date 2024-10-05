import React from 'react';
import { Tabs, Card, Row, Col } from 'antd';
import './MatchDetails.scss'; // Add your styles here
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

const { TabPane } = Tabs;

const MatchPage = () => {
  const matches = [
    {
      team1: 'IND',
      team2: 'BAN',
      img: 'https://www.panasiabiz.com/wp-content/uploads/2024/06/ind-vs-ban-2-678x381.png',
      countdown: '03:34:23',
    },
    {
      team1: 'ENG',
      team2: 'AUS',
      img: 'https://img.jagranjosh.com/images/2023/November/3112023/england-vs-australia-head-to-head.jpg',
      countdown: '03:34:23',
    },
  ];

  return (
    <div>
      <Header />
      <div className="match-page">
        <Tabs defaultActiveKey="1" centered className="tabs-wrapper">
          <TabPane tab="Today Matches" key="1">
            <Row gutter={[16, 16]}>
              {matches.map((match, index) => (
                <Col xs={24} sm={12} key={index}>
                  <Card hoverable>
                    <img src={match.img} alt={`${match.team1} vs ${match.team2}`} className="match-image" />
                    <div className="match-details">
                      <h3>{match.team1} vs {match.team2}</h3>
                      <p className="countdown">{match.countdown}</p>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </TabPane>
          <TabPane tab="Tomorrow Matches" key="2">
            <p>No matches available for tomorrow.</p>
          </TabPane>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default MatchPage;
