import React from 'react';
import '../UserAuction/UserAuctionPage.scss'
import Footer from '../Footer/Footer';
import { Badge, Button, Card } from 'antd';

const USerAuctionPage = () => {
  const nextPlayers = [
    { name: 'Rajat Patidar', image: 'player_image_url' },
    { name: 'Faf Du Plessis', image: 'player_image_url' },
    { name: 'Deepak Hooda', image: 'player_image_url' },
    { name: 'KL Rahul', image: 'player_image_url' },
  ];

  const soldPlayers = [
    { name: 'Arshin Kulkarni', price: 1200, image: 'player_image_url' },
    { name: 'Mayank Yadav', price: 1300, image: 'player_image_url' },
    { name: 'Will Jacks', price: 3400, image: 'player_image_url' },
    { name: 'Rajan Kumar', price: 700, image: 'player_image_url' },
  ];

  const bids = [
    { phone: "9515206990", name: "Sreevardhan", price: 1050, initial: "S" },
    { phone: "9515206990", name: "Elisha", price: 1100, initial: "E" },
  ];

  return (
    <div className="player-page">
      <div className="header">
        <div className="header-left">
          <img src="https://tse4.mm.bing.net/th?id=OIP.OzuHtcqMSQR6cmY0njCcfwHaG2&pid=Api&P=0&h=180" alt="team logo" className="team-logo" />
          <div>
            <h2>Narasimha</h2>
            <p className="status">Online</p>
          </div>
        </div>
        <button className="top-sixer-btn">Top Sixer</button>
      </div>

      <div className="players-section">
        <h3>Next Players</h3>
        <div className="players-list">
          {nextPlayers.map((player, index) => (
            <div key={index} className="player">
              <img src="https://tse1.mm.bing.net/th?id=OIP.VOu1ELjzMvKfncae7slvhAHaHa&pid=Api&P=0&h=180" alt={player.name} className="player-image" />
              <p>{player.name}</p>
            </div>
          ))}
        </div>

        <h3>Sold Players</h3>
        <div className="players-list">
          {soldPlayers.map((player, index) => (
            <div key={index} className="player">
              <img src={"https://www.iplbetonline.in/wp-content/uploads/2023/04/57.png"} alt={player.name} className="player-image" />
              <p>{player.name}</p>
              <span className="price">{player.price}</span>
            </div>
          ))}
        </div>
      </div>

{/* 
      <section className="bidding-section">
        <Card className="player-details">
          <img src="rajat.jpg" alt="Rajat Patidar" />
          <div>
            <h3>Rajat Patidar</h3>
            <p>Starting Price: ₹1000</p>
          </div>
        </Card>

        <div className="bids-list">
          {bids.map((bid, index) => (
            <Card key={index} className="bid-card">
              <p>{bid.phone}</p>
              <p>{bid.name}</p>
              <Badge count={bid.initial} />
              <p className="bid-price">₹{bid.price}</p>
            </Card>
          ))}
        </div>
      </section> */}

      <footer className="bidding-footer">
        <Button>+50</Button>
        <Button>+100</Button>
        <Button>+200</Button>
        <Button>+500</Button>
      </footer>

     
      <Footer/>
    </div>
  );
};

export default USerAuctionPage;
