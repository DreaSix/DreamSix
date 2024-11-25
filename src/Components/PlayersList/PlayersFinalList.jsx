import React from "react";
import "./PlayersFinalList.scss";

const PlayersFinalList = () => {
  const playersLeft = [
    { name: "KL Rahul", amount: 2000, buyer: "Aditi Sharma", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUcR_4M1U-SyADac_IqQ209kzVkeCPM00ajg&s" },
    { name: "Quinton De Kock", amount: 5000, buyer: "Kabir Verma", image: "path_to_image" },
    { name: "Deepak Hooda", amount: 600, buyer: "Meera Kapoor", image: "path_to_image" },
    { name: "KL Rahul", amount: 2000, buyer: "Aditi Sharma", image: "path_to_image" },
    { name: "Quinton De Kock", amount: 5000, buyer: "Kabir Verma", image: "path_to_image" },
    { name: "Deepak Hooda", amount: 600, buyer: "Meera Kapoor", image: "path_to_image" },
  ];

  const playersRight = [
    { name: "Faf Du Plessis", amount: 1000, buyer: "Rohan Iyer", image: "path_to_image" },
    { name: "Rajat Patidar", amount: 3000, buyer: "Priya Desai", image: "path_to_image" },
    { name: "Virat Kohli", amount: 7000, buyer: "Nikhil Reddy", image: "path_to_image" },
    { name: "Faf Du Plessis", amount: 1000, buyer: "Rohan Iyer", image: "path_to_image" },
    { name: "Rajat Patidar", amount: 3000, buyer: "Priya Desai", image: "path_to_image" },
    { name: "Virat Kohli", amount: 7000, buyer: "Nikhil Reddy", image: "path_to_image" },
  ];

  return (
    <div className="players-final-list">
      <div className="top-menu">
        <button className="menu-btn active">Top Sixer</button>
        <button className="menu-btn">Top Scorer</button>
      </div>
      <div className="match-name-container">Match Name: LSG vs RCB</div>
      <div className="players-container">
        <div className="players-column">
          {playersLeft.map((player, index) => (
            <div className="player-card" key={index}>
              <div className="player-info">
                <div
                  className="player-image"
                  style={{ backgroundImage: `url(${player.image})` }}
                ></div>
                <div className="details">
                  <div className="player-amount">₹{player.amount}</div>
                  <div className="player-buyer">Buyer: {player.buyer}</div>
                </div>
              </div>
              <div className="player-name">{player.name}</div>
            </div>
          ))}
        </div>
        <div className="players-column">
          {playersRight.map((player, index) => (
            <div className="player-card" key={index}>
              <div className="player-info">
                <div
                  className="player-image"
                  style={{ backgroundImage: `url(${player.image})` }}
                ></div>
                <div className="details">
                  <div className="player-amount">₹{player.amount}</div>
                  <div className="player-buyer">Buyer: {player.buyer}</div>
                </div>
              </div>
              <div className="player-name">{player.name}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="total-amount-container">
        <span>Total Amount =</span> ₹32000
      </div>
    </div>
  );
};

export default PlayersFinalList;
