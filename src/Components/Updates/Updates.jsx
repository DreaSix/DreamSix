import React, { useEffect, useState } from "react";
import { Card, Row, Col } from "antd";
import "./Updates.scss";
import { updateService } from "../../Service/UpdateService";

const Updates = () => {
  const [updatesData, setUpdatesData] = useState([])

  useEffect(() => {
    getUpdates()
  }, [])

  const getUpdates = () => {
    updateService.getUpdates()
      .then(response => {
        setUpdatesData(response)
      })
      .catch(error => {
        console.log('error', error)
      })
  }

  return (
    <main>
    <div className="updates-container">
      <h2>📢 Latest Updates</h2>
      <Row gutter={[16, 16]}>
        {updatesData?.map((update, index) => (
          <Col key={index} xs={24} sm={12} md={8}>
            <Card className="update-card">{update?.updateText}</Card>
          </Col>
        ))}
      </Row>
    </div>
    </main>
  );
};

export default Updates;
