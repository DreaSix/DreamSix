import React, { useEffect, useState } from "react";
import "./PlayersFinalList.scss";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { useParams } from "react-router-dom";
import { matchDetailsService } from "../../Service/MatchDetailsService";

const PlayersFinalList = () => {
  const {matchId} = useParams()
  const [matchData, setMatchDetails] = useState()
  const [playersTeam1, setPlayersTeam1] = useState([])
  const [playersTeam2, setPlayersTeam2] = useState([])

  useEffect(() => {
      if (matchId) {
        getMatchDetailsById()
      }
    }, [])
  
    const getMatchDetailsById = () => {
      matchDetailsService.getMtachDetailsById(matchId)
        .then(response => {
          setMatchDetails(response?.data)
        })
        .catch(error => {
          console.log('error', error)
        })
    }

  useEffect(() => {
    getPlayerDetailsByMatchId()
  }, [matchData])

  const getPlayerDetailsByMatchId = () => {
    matchDetailsService.getMatchPlayerDetails(matchId)
      .then(response => {
        const teamOneData = response?.data?.filter(player => player?.teamName === matchData?.teamOneName)
        const teamTwoData = response?.data?.filter(player => player?.teamName === matchData?.teamTwoName)
        setPlayersTeam1(teamOneData)
        setPlayersTeam2(teamTwoData)
      })
      .catch(error => {
        console.log('error', error)
      })
  }

  return (
    <div>
      <Header/>
    <div className="players-final-list">
      
      <div className="top-menu">
        <button className="menu-btn active">Top Sixer</button>
        <button className="menu-btn">Top Scorer</button>
      </div>
      <div className="match-name-container">Match Name: LSG vs RCB</div>
      <div className="players-container">
        <div className="players-column">
          {playersTeam1?.map((player, index) => (
            <div className="player-card" key={index}>
              <div className="player-info">
                <div
                  className="player-image"
                  style={{ backgroundImage: `url(${player.playerImage})` }}
                ></div>
                <div className="details">
                  <div className="player-amount">₹{player.amount}</div>
                  <div className="player-buyer">Buyer: {player.buyer}</div>
                </div>
              </div>
              <div className="player-name">{player.playerName}</div>
            </div>
          ))}
        </div>
        <div className="players-column">
          {playersTeam2.map((player, index) => (
            <div className="player-card" key={index}>
              <div className="player-info">
                <div
                  className="player-image"
                  style={{ backgroundImage: `url(${player.playerImage})` }}
                ></div>
                <div className="details">
                  <div className="player-amount">₹{player.amount}</div>
                  <div className="player-buyer">Buyer: {player.buyer}</div>
                </div>
              </div>
              <div className="player-name">{player.playerName}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="total-amount-container">
        <span>Total Amount =</span> ₹32000
      </div>
      <Footer/>
    </div>
    </div>
  );
};

export default PlayersFinalList;
