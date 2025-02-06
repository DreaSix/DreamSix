import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './MatchCountDown.scss';
import { matchDetailsService } from '../../Service/MatchDetailsService';

const CountdownPage = () => {
  const { matchId } = useParams();
  const navigate = useNavigate();

  const [matchData, setMatchDetails] = useState(null);
  const [playersTeam1, setPlayersTeam1] = useState([]);
  const [playersTeam2, setPlayersTeam2] = useState([]);
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

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
    if (matchData?.countdownEndTime) {
      const calculateTimeLeft = () => {
        const now = new Date();
        const endTime = new Date(matchData.countdownEndTime);
        const difference = endTime - now;

        if (difference > 0) {
          return {
            hours: Math.floor(difference / (1000 * 60 * 60)),
            minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((difference % (1000 * 60)) / 1000)
          };
        }
        return { hours: 0, minutes: 0, seconds: 0 };
      };

      // Set initial time
      setTimeLeft(calculateTimeLeft());

      const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [matchData?.countdownEndTime]);

  useEffect(() => {
    if (matchData) {
      getPlayerDetailsByMatchId();
    }
  }, [matchData]);

  const getPlayerDetailsByMatchId = () => {
    matchDetailsService.getMatchPlayerDetails(matchId)
      .then(response => {
        const teamOneData = response?.data?.filter(player => player?.teamName === matchData?.teamOneName);
        const teamTwoData = response?.data?.filter(player => player?.teamName === matchData?.teamTwoName);
        setPlayersTeam1(teamOneData || []);
        setPlayersTeam2(teamTwoData || []);
      })
      .catch(error => {
        console.log('Error fetching player details:', error);
      });
  };

  const handleImageClick = () => {
    navigate('/user-auctionpage');
  };

  return (
    <main>
      <div className="cricket-page-container">
        <div className="match-info">
          {matchData?.matchImage && (
            <img
              src={`data:image/jpeg;base64,${matchData.matchImage}`}
              alt={`${matchData.teamOneName} vs ${matchData.teamTwoName}`}
              className="match-banner"
              onClick={handleImageClick}
              style={{ cursor: 'pointer' }}
            />
          )}
          <div className="bid-info">
            <div className="top-sixer">Top Sixer</div>
            <h4>Get Ready, Bid Will Start Soon</h4>
            <div className="countdown">
              {String(timeLeft.hours).padStart(2, "0")} :
              {String(timeLeft.minutes).padStart(2, "0")} :
              {String(timeLeft.seconds).padStart(2, "0")}
            </div>
          </div>
        </div>

        <div className="player-list-container">
          <div className='heading-container'>
            <h4>{matchData?.teamOneName} vs {matchData?.teamTwoName}</h4>
            <p>Expected Players</p>
          </div>
          <table className="player-list-table">
            <thead>
              <tr>
                <th className='header-name'>{matchData?.teamOneName}</th>
                <th className='header-name'>{matchData?.teamTwoName}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="player-list">
                    {playersTeam1.map((player, index) => (
                      <div key={index} className="player-item">
                        <img src={`data:image/jpeg;base64,${player?.playerImage}`} alt={player.playerName} className="player-icon" />
                        <span>{player.playerName}</span>
                      </div>
                    ))}
                  </div>
                </td>
                <td>
                  <div className="player-list">
                    {playersTeam2.map((player, index) => (
                      <div key={index} className="player-item">
                        <img src={`data:image/jpeg;base64,${player?.playerImage}`} alt={player.playerName} className="player-icon" />
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
    </main>
  );
};

export default CountdownPage;
