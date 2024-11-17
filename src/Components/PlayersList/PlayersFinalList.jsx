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
  ];

  return (
    <div className="player-stats">
      <Tabs defaultActiveKey="1" centered>
        <TabPane tab="Top Sixer" key="1">
          <div className='match-name-container' style={{height:"20px",padding:"7px"}}>
            <Text className="match-name" style={{fontSize: "10px"}}>Match Name: </Text>
            <Text className="match-name" style={{fontSize: "10px"}}>LSG vs RCB</Text>
          </div>
          <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item) => (
              <>
                <Row gutter={[18, 18]} style={{display:"flex", justifyContent:"space-between", padding:"10px"}}>
                  <Col span={12}>
                    <List.Item>
                          <div>
                            <div className='image-name-container'>
                              <img
                                src={item.img1}
                                alt={item.player1}
                                style={{
                                  width: 30,
                                  height: 30,
                                  borderRadius: '50%',
                                  marginBottom: '3px', 
                                  marginRight:"10px"
                                }}
                              />
                              <div>
                                <Text className='text' style={{ display: 'block', margin: 0, color:"#0a2a59", fontWeight:"bold" }}>{item.amount}</Text> {/* Amount */}
                                <Text style={{ display: 'block', margin: 0, color:"grey", fontSize:"9px" }}>Buyer: {item.buyer1}</Text> {/* Buyer name */}
                              </div>
                            </div>
                            <Text className='text' style={{ margin: 0 }}>{item.player1}</Text> 
                          </div>
                    </List.Item>
                  </Col>
                  <Col span={12}>
                    <List.Item>
                          <div style={{textAlign:"right"}}>
                            <div className='image-name-container'>
                              <div>
                                  <Text className='text' style={{ display: 'block', margin: 0, color:"#0a2a59", fontWeight:"bold" }}>{item.amount}</Text> {/* Amount */}
                                  <Text style={{ display: 'block', margin: 0, color:"grey", fontSize:"9px" }}>Buyer: {item.buyer2}</Text> {/* Buyer name */}
                                </div>
                                <img
                                  src={item.img2}
                                  alt={item.player2}
                                  style={{
                                    width: 30,
                                    height: 30,
                                    borderRadius: '50%',
                                    marginBottom: '3px', 
                                    marginLeft:"10px"
                                  }}
                                />
                            </div>
                            <Text className='text' style={{ margin: 0, textAlign:"right" }}>{item.player2}</Text> 
                          </div>
                    </List.Item>
                  </Col>
                </Row>
                <Divider style={{ margin: '0 0' }} />
              </>
            )}
          />


          {/* <Divider /> */}
          <div className='total-amount-container'>
            <div className="total-amount">
              <Text>Total Amount =</Text> <Text strong>₹32000</Text>
            </div>
          </div>
        </TabPane>
        <TabPane tab="Top Scorer" key="2">
          <p>Top Scorer Data Here</p>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default PlayersFinalList;
