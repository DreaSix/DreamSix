import React from 'react';
import './AdminAuctionPage.scss'; // SCSS file for styling

const AdminAuctionPage = () => {
  const nextPlayers = [
    { name: 'Rajat Patidar', image: 'player_image_url' },
    { name: 'Faf Du Plessis', image: 'player_image_url' },
    { name: 'Deepak Hooda', image: 'player_image_url' },
    { name: 'KL Rahul', image: 'player_image_url' },
  ];

  return (
    <div className="player-bid-page">
      <div className="header">
        <div className="header-left">
          <img src="team_logo.png" alt="team logo" className="team-logo" />
          <div>
            <h2>Admin</h2>
            <p className="status">Online</p>
          </div>
        </div>
        <button className="top-sixer-btn">Top Sixer</button>
        <label className="switch">
          <input type="checkbox" />
          <span className="slider round"></span>
        </label>
      </div>

      <div className="players-section">
        <h3>Next Players</h3>
        <div className="players-list">
          {nextPlayers.map((player, index) => (
            <div key={index} className="player">
              <img src={player.image} alt={player.name} className="player-image" />
              <p>{player.name}</p>
              <span className="bid-tag">BID</span>
            </div>
          ))}
        </div>

        <h3>Sold Players</h3>
        <div className="sold-section">
          <p>Sold Players</p>
        </div>
      </div>

      <div className="chat-input">
        <span className="smiley">😊</span>
        <input type="text" placeholder="Final" />
        <button className="send-btn">▶</button>
      </div>
    </div>
  );
};

export default AdminAuctionPage;
