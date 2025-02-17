import React, { useEffect, useState } from 'react';
import '../UserAuction/UserAuctionPage.scss'
import Footer from '../Footer/Footer';
import { Badge, Button, Card } from 'antd';
import ChatBox from '../Chatbox/Chatbox';
import { useParams } from 'react-router-dom';
import { matchDetailsService } from '../../Service/MatchDetailsService';

const USerAuctionPage = () => {
  const { matchId } = useParams();

  const [playersTeam1, setPlayersTeam1] = useState([]);
  const [playersTeam2, setPlayersTeam2] = useState([]);
  const [matchData, setMatchDetails] = useState(null);


  useEffect(() => {
    if (matchId) {
      getMatchDetailsById();
    }
  }, [matchId]);

  const getMatchDetailsById = () => {
    matchDetailsService.getMtachDetailsById(matchId)
      .then(response => {
        setMatchDetails(response?.data);
      })
      .catch(error => {
        console.log('Error fetching match details:', error);
      });
  };

  useEffect(() => {
    if (matchId) {
      getPlayerDetailsByMatchId();
    }
  }, [matchData]);

  const getPlayerDetailsByMatchId = () => {
    matchDetailsService.getMatchPlayerDetails(matchId)
      .then(response => {
        const teamOneData = response?.data?.filter(player => player?.teamName === matchData?.teamOneName)
        const teamTwoData = response?.data?.filter(player => player?.teamName === matchData?.teamTwoName)
        const flattenedPlayers1 = teamOneData?.flatMap(item => item?.playerDetailsResponseList);
        const flattenedPlayers2 = teamTwoData?.flatMap(item => item?.playerDetailsResponseList);

        setPlayersTeam1(flattenedPlayers1)
        setPlayersTeam2(flattenedPlayers2)
      })
      .catch(error => {
        console.log('Error fetching player details:', error);
      });
  };

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

      <ChatBox />

      <footer className="bidding-footer">
        <Button>+50</Button>
        <Button>+100</Button>
        <Button>+200</Button>
        <Button>+500</Button>
      </footer>


      <Footer />
    </div>
  );
};

export default USerAuctionPage;
