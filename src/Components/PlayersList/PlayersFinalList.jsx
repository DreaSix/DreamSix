import React from 'react';
import { Tabs, List, Row, Col, Typography, Divider } from 'antd';
import './PlayersFinalList.scss'; // Ensure this file exists for styling

const { TabPane } = Tabs;
const { Text } = Typography;

const PlayersFinalList = () => {
  const data = [
    {
      amount: '₹2000',
      buyer1: 'Aditi Sharma',
      buyer2: 'Rohan Iyer',
      player1: 'KL Rahul',
      player2: 'Faf Du Plessis',
      img1: 'https://starsunfolded.com/wp-content/uploads/2016/05/KL-Rahul-10-768x744.jpg', // Replace with actual image URLs
      img2: 'https://starsunfolded.com/wp-content/uploads/2016/05/KL-Rahul-10-768x744.jpg', // Replace with actual image URLs
    },
    {
      amount: '₹5000',
      buyer1: 'Kabir Verma',
      buyer2: 'Priya Desai',
      player1: 'Quinton De Kock',
      player2: 'Rajat Patidar',
      img1: 'https://biowikis.com/wp-content/uploads/2020/09/Marcus-Stoinis-Bio-Wiki-Net-Worth.jpg', // Replace with actual image URLs
      img2: 'https://starsunfolded.com/wp-content/uploads/2016/05/KL-Rahul-10-768x744.jpg', // Replace with actual image URLs
    },
    {
      amount: '₹600',
      buyer1: 'Meera Kapoor',
      buyer2: 'Nikhil Reddy',
      player1: 'Deepak Hooda',
      player2: 'Virat Kohli',
      img1: 'https://starsunfolded.com/wp-content/uploads/2016/05/KL-Rahul-10-768x744.jpg', // Replace with actual image URLs
      img2: 'https://biowikis.com/wp-content/uploads/2020/09/Marcus-Stoinis-Bio-Wiki-Net-Worth.jpg', // Replace with actual image URLs
    },
    // Add more players as needed
  ];

  return (
    <div className="player-stats">
      <Tabs defaultActiveKey="1" centered>
        <TabPane tab="Top Sixer" key="1">
          <Text className="match-name">Match Name: LSG vs RCB</Text>
          <Divider />
          <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item) => (
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <img 
                          src={item.img1} 
                          alt={item.player1} 
                          style={{ width: 40, height: 40, borderRadius: '50%' }}
                        />
                      }
                      title={<Text>{item.player1}</Text>}
                      description={
                        <>
                          <Text strong>{item.amount}</Text>
                          <br />
                          <Text>Buyer: {item.buyer1}</Text>
                        </>
                      }
                    />
                  </List.Item>
                </Col>
                <Col span={12}>
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <img 
                          src={item.img2} 
                          alt={item.player2} 
                          style={{ width: 40, height: 40, borderRadius: '50%' }}
                        />
                      }
                      title={<Text>{item.player2}</Text>}
                      description={
                        <>
                          <Text strong>{item.amount}</Text>
                          <br />
                          <Text>Buyer: {item.buyer2}</Text>
                        </>
                      }
                    />
                  </List.Item>
                </Col>
              </Row>
            )}
          />
          <Divider />
          <div className="total-amount">
            <Text>Total Amount =</Text> <Text strong>₹32000</Text>
          </div>
        </TabPane>
        <TabPane tab="Top Scorer" key="2">
          {/* Add similar content for Top Scorer */}
          <p>Top Scorer Data Here</p>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default PlayersFinalList;
