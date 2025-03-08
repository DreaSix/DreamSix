import React from "react";
import { Card, Row, Col } from "antd";
import "./Updates.scss";

const updates = [
  "🏏 Virat Kohli scored a quickfire 85 runs today!",
  "🔥 Rohit Sharma smashed 7 sixes in his latest match!",
  "🚀 David Warner reached 10,000 T20 runs milestone!",
  "🏆 Steve Smith named Player of the Series!",
  "📢 Kane Williamson returns from injury for the next match!",
  "🎯 Glenn Maxwell hits the fastest century in IPL history!"
];

const Updates = () => {
  return (
    <main>
    <div className="updates-container">
      <h2>📢 Latest Updates</h2>
      <Row gutter={[16, 16]}>
        {updates.map((update, index) => (
          <Col key={index} xs={24} sm={12} md={8}>
            <Card className="update-card">{update}</Card>
          </Col>
        ))}
      </Row>
    </div>
    </main>
  );
};

export default Updates;
