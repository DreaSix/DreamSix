import React from 'react';
import '../UserAuction/UserAuctionPage.scss'

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

  return (
    <div className="player-page">
      <div className="header">
        <div className="header-left">
          <img src="team_logo.png" alt="team logo" className="team-logo" />
          <div>
            <h2>Sreenu</h2>
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

      <div className="amount-input">
        <span className="smiley">😊</span>
        <input type="number" value="100" />
        <button className="send-btn">▶</button>
      </div>

      <div className="keypad">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((key) => (
          <div key={key} className="key">
            {key}
          </div>
        ))}
      </div>
    </div>
  );
};

export default USerAuctionPage;
