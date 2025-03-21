import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./MatchCountDown.scss";
import { matchDetailsService } from "../../Service/MatchDetailsService";
import { Button } from "antd";

const CountdownPage = () => {
  const { matchId } = useParams();
  const navigate = useNavigate();

  const [matchData, setMatchDetails] = useState(null);
  const [playersTeam1, setPlayersTeam1] = useState({});
  const [playersTeam2, setPlayersTeam2] = useState({});
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (matchId) {
      getMatchDetailsById();
    }
  }, [matchId]);

  const getMatchDetailsById = () => {
    matchDetailsService
      .getMtachDetailsById(matchId)
      .then((response) => {
        setMatchDetails(response?.data);
      })
      .catch((error) => {
        console.log("Error fetching match details:", error);
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
            seconds: Math.floor((difference % (1000 * 60)) / 1000),
          };
        }
        return { hours: 0, minutes: 0, seconds: 0 };
      };

      setTimeLeft(calculateTimeLeft());

      const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [matchData?.countdownEndTime]);

  useEffect(() => {
    if (matchId) {
      getPlayerDetailsByMatchId();
    }
  }, [matchData]);

  const getPlayerDetailsByMatchId = () => {
    matchDetailsService
      .getMatchPlayerDetails(matchId)
      .then((response) => {
        const teamOneData = response?.data?.find(
          (player) => player?.teamName === matchData?.teamOneName
        );
        const flattenedPlayers1 = teamOneData?.playersDtoMap;
        const teamTwoData = response?.data?.find(
          (player) => player?.teamName === matchData?.teamTwoName
        );
        const flattenedPlayers2 = teamTwoData?.playersDtoMap;

        setPlayersTeam1(flattenedPlayers1);
        setPlayersTeam2(flattenedPlayers2);
      })
      .catch((error) => {
        console.log("Error fetching player details:", error);
      });
  };

  const isBiddingInProgress =
    timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0;

  const handleImageClick = () => {
    navigate(`/user-auctionpage/${matchId}`);
  };

  return (
    <main>
      <div className="cricket-page-container">
        <div className="match-info">
          {/* Match Banner */}
          {matchData?.matchImage && (
            <img
              src={`data:image/jpeg;base64,${matchData.matchImage}`}
              alt={`${matchData.teamOneName} vs ${matchData.teamTwoName}`}
              className="match-banner"
            />
          )}

          {/* Bid Info Section */}
          <div className="bid-info">
            <div className="top-sixer">🔥 Top Sixer Bidding 🔥</div>

            {isBiddingInProgress ? (
              <div className="bidding-in-progress">
                <h2>🎯Bidding is LIVE!🎯</h2>
                <p>Place your bids now and stay ahead in the game! 🚀</p>

                <Button onClick={handleImageClick} className="start-button">
                  Enter Bidding Zone 🚀
                </Button>
              </div>
            ) : (
              <div className="countdown-container">
                <h4>⏳ Get Ready! Bidding Starts Soon</h4>
                <div className="countdown">
                  {String(timeLeft.hours).padStart(2, "0")} :
                  {String(timeLeft.minutes).padStart(2, "0")} :
                  {String(timeLeft.seconds).padStart(2, "0")}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="player-list-container">
          <div className="heading-container">
            <h4>
              {matchData?.teamOneName} vs {matchData?.teamTwoName}
            </h4>
            <p>Expected Players</p>
          </div>
          <table className="player-list-table">
            <thead>
              <tr>
                <th className="header-name">{matchData?.teamOneName}</th>
                <th className="header-name">{matchData?.teamTwoName}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {playersTeam1 && (
                    <div className="player-list">
                      {Object.entries(playersTeam1).map(
                        ([playerId, player]) => (
                          <div key={playerId} className="player-item">
                            <img
                              src={`data:image/jpeg;base64,${player?.playerImage}`}
                              alt={player.playerName}
                              className="player-icon"
                            />
                            <span
                              style={{
                                color:
                                  player?.status === "UNSOLD"
                                    ? "lightGreen"
                                    : "red",
                              }}
                            >
                              {player.playerName}{" "}
                              {player?.soldPrice ? `(${player.soldPrice})` : ""}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  )}
                </td>
                <td>
                  {playersTeam2 && (
                    <div className="player-list">
                      {Object.entries(playersTeam2).map(
                        ([playerId, player]) => (
                          <div key={playerId} className="player-item">
                            <img
                              src={`data:image/jpeg;base64,${player?.playerImage}`}
                              alt={player.playerName}
                              className="player-icon"
                            />
                            <span
                              style={{
                                color:
                                  player?.status === "UNSOLD"
                                    ? "lightGreen"
                                    : "red",
                              }}
                            >
                              {player.playerName}{" "}
                              {player?.soldPrice ? `(${player.soldPrice})` : ""}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  )}
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
