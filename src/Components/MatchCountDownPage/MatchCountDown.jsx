import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import './MatchCountDown.scss';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { matchDetailsService } from '../../Service/MatchDetailsService';

const CountdownPage = () => {
  const { matchId } = useParams();

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

  const navigate = useNavigate(); 

  const handleImageClick = () => {
    navigate('/user-auctionpage'); 
  };

  return (
    <main>
      <div>
      <div className="cricket-page-container">

        <div className="match-info">
          <img
            src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/poster-design-template-351effd160d6232fa505498a400cd1a1_screen.jpg?ts=1713411077"
            alt="LSG vs RCB"
            className="match-banner"
            onClick={handleImageClick} // Add the click event here
            style={{ cursor: 'pointer' }} // Change cursor to pointer to indicate clickability
          />
          <div className="bid-info">
            <div className="top-sixer">Top Sixer</div>
            <h4>Get Ready Bid Will</h4>
            <div className="countdown">03 : 34 : 23</div>
          </div>
        </div>

        <div className="player-list-container">
          <div className='heading-container'>
            <h4> RCB vs CSK </h4>
            <p>Expected Players</p>
          </div>
          <table className="player-list-table">
            <thead>
              <tr>
                <th className='header-name'>RCB</th>
                <th className='header-name'>CSK</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="player-list">
                    {playersTeam1.map((player, index) => (
                      <div key={index} className="player-item">
                        <img  src={`data:image/jpeg;base64,${player?.playerImage}`} alt={player.playerName} className="player-icon" />
                        <span>{player.playerName}</span>
                      </div>
                    ))}
                  </div>
                </td>
                <td>
                  <div className="player-list">
                    {playersTeam2.map((player, index) => (
                      <div key={index} className="player-item">
                        <img  src={`data:image/jpeg;base64,${player?.playerImage}`} alt={player.playerName} className="player-icon" />
                        <span>{player.playerName}</span>
                      </div>
                    ))}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </main>
  );
};

export default CountdownPage;
