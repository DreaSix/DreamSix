import React, { useEffect, useState } from 'react';
import '../UserAuction/UserAuctionPage.scss'
import Footer from '../Footer/Footer';
import { Badge, Button, Card } from 'antd';
import ChatBox from '../Chatbox/Chatbox';
import { useParams } from 'react-router-dom';
import { matchDetailsService } from '../../Service/MatchDetailsService';

const USerAuctionPage = () => {
  const { matchId } = useParams();
  const [showNextPlayers, setShowNextPlayers] = useState(false);
  const [matchData, setMatchDetails] = useState(null);
  const [nextPlayers, setNextPlayers] = useState({});
  const [soldPlayers, setSoldPlayers] = useState({});
  const [selectedPlayer, setSelectedPlayer] = useState();
  const [currentBidId, setCurrentBidId] = useState();


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
        if (!response?.data) {
          console.log("No match data found");
          return;
        }
  
        const unSoldPlayers = response.data.flatMap(match =>
          Object.values(match?.playersDtoMap || {}).filter(player => player?.status === "UNSOLD")
        );
  
        const soldPlayers = response.data.flatMap(match =>
          Object.values(match?.playersDtoMap || {}).filter(player => player?.status === "SOLD")
        );

        const biddingPlayer = response.data.flatMap((match) =>
          Object.values(match?.playersDtoMap || {}).filter(
            (player) => player?.status === "BIDDING"
          )
        );

        setCurrentBidId(biddingPlayer[0]?.bidId)
        setSelectedPlayer(biddingPlayer[0])

        setNextPlayers(unSoldPlayers)
        setSoldPlayers(soldPlayers)
 
      })
      .catch(error => {
        console.log("Error fetching player details:", error);
      });
  };
  

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
          <Button
            className="dropdown-btn"
            onClick={() => setShowNextPlayers(!showNextPlayers)}
          >
            {showNextPlayers ? "Hide Players" : "Players List"}
          </Button>

          {showNextPlayers && (
            <div className="next-players">
              <h3>Next Players</h3>
              <div className="players">
                {nextPlayers?.map((player) => (
                  <div className="player-card" key={player.playerName}>
                    <img
                      src={`data:image/jpeg;base64,${player?.playerImage}`}
                      alt={player.playerName}
                      className="player-img"
                    />
                    <div className="player-name">{player.playerName}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="players-section">
          {showNextPlayers && (
            <div className="next-players">
              <h3>Sold Players</h3>
              <div className="players">
                {soldPlayers?.map((player) => (
                  <div className="player-card" key={player.playerName}>
                    <img
                      src={`data:image/jpeg;base64,${player?.playerImage}`}
                      alt={player.playerName}
                      className="player-img"
                    />
                    <div className="player-name">{player.playerName}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {selectedPlayer && (
          <div className="player-info">
            <img
              src={`data:image/jpeg;base64,${selectedPlayer?.playerImage}`}
              alt={selectedPlayer?.playerName}
              className="selected-player-img"
            />
            <div className="player-details">
              <span className="selected-player-name">{selectedPlayer?.playerName}</span>
              <span className="starting-price">
                Starting Price: <strong>Rs. {selectedPlayer?.basePrice}</strong>
              </span>
            </div>
          </div>
        )}


      <ChatBox currentBidId={currentBidId}/>

      {/* <footer className="bidding-footer">
        <Button>+50</Button>
        <Button>+100</Button>
        <Button>+200</Button>
        <Button>+500</Button>
      </footer> */}


      <Footer />
    </div>
  );
};

export default USerAuctionPage;
