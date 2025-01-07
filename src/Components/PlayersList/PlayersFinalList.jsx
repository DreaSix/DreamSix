import React from "react";
import "./PlayersFinalList.scss";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

const PlayersFinalList = () => {
  const playersLeft = [
    { name: "KL Rahul", amount: 2000, buyer: "Aditi Sharma", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUcR_4M1U-SyADac_IqQ209kzVkeCPM00ajg&s" },
    { name: "Quinton De Kock", amount: 5000, buyer: "Kabir Verma", image: "https://www.cricketcountry.com/wp-content/uploads/2024/07/Rohit-sharma-15.jpg" },
    { name: "Deepak Hooda", amount: 600, buyer: "Meera Kapoor", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIHd_YV7rH-c4PT0cmXp0rY4zYfzsECxNQiA&s" },
    { name: "KL Rahul", amount: 2000, buyer: "Aditi Sharma", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS09XRPL0EYGO9jzMOmPADjEcamWlaXg96Rag&s" },
    { name: "Quinton De Kock", amount: 5000, buyer: "Kabir Verma", image: "https://www.cricketcountry.com/wp-content/uploads/2024/07/Rohit-sharma-15.jpg" },
    { name: "Deepak Hooda", amount: 600, buyer: "Meera Kapoor", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS09XRPL0EYGO9jzMOmPADjEcamWlaXg96Rag&s" },
  ];

  const playersRight = [
    { name: "Faf Du Plessis", amount: 1000, buyer: "Rohan Iyer", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIHd_YV7rH-c4PT0cmXp0rY4zYfzsECxNQiA&s" },
    { name: "Rajat Patidar", amount: 3000, buyer: "Priya Desai", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS09XRPL0EYGO9jzMOmPADjEcamWlaXg96Rag&s" },
    { name: "Virat Kohli", amount: 7000, buyer: "Nikhil Reddy", image: "https://www.cricketcountry.com/wp-content/uploads/2024/07/Rohit-sharma-15.jpg" },
    { name: "Faf Du Plessis", amount: 1000, buyer: "Rohan Iyer", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIHd_YV7rH-c4PT0cmXp0rY4zYfzsECxNQiA&s" },
    { name: "Rajat Patidar", amount: 3000, buyer: "Priya Desai", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS09XRPL0EYGO9jzMOmPADjEcamWlaXg96Rag&s" },
    { name: "Virat Kohli", amount: 7000, buyer: "Nikhil Reddy", image: "https://www.cricketcountry.com/wp-content/uploads/2024/07/Rohit-sharma-15.jpg" },
  ];

  return (
    <main>
    <div>
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
    </div>
    </main>
  );
};

export default PlayersFinalList;
