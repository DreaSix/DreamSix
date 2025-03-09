import React, { useEffect, useState } from "react";
import "./PlayersFinalList.scss";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { useParams } from "react-router-dom";
import { matchDetailsService } from "../../Service/MatchDetailsService";

const PlayersFinalList = () => {
  const { matchId } = useParams();
  const [matchData, setMatchDetails] = useState();
  const [playersTeam1, setPlayersTeam1] = useState([]);
  const [playersTeam2, setPlayersTeam2] = useState([]);

  useEffect(() => {
    if (matchId) {
      getMatchDetailsById();
    }
  }, []);

  const getMatchDetailsById = () => {
    matchDetailsService
      .getMtachDetailsById(matchId)
      .then((response) => {
        setMatchDetails(response?.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  useEffect(() => {
    getPlayerDetailsByMatchId();
  }, [matchData]);

  const getPlayerDetailsByMatchId = () => {
    matchDetailsService
      .getMatchPlayerDetails(matchId)
      .then((response) => {
        const teamOneData = response?.data?.find(
          (player) => player?.teamName === matchData?.teamOneName
        );
        const teamTwoData = response?.data?.find(
          (player) => player?.teamName === matchData?.teamTwoName
        );

        setPlayersTeam1(teamOneData?.playersDtoMap);
        setPlayersTeam2(teamTwoData?.playersDtoMap);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <div>
      <Header />
      <div className="players-final-list">
        <div className="top-menu">
          <button className="menu-btn active">Top Sixer</button>
          <button className="menu-btn">Top Scorer</button>
        </div>
        <div className="match-name-container">
          Match Name: {matchData?.teamOneName} vs {matchData?.teamTwoName}
        </div>
        <div className="players-container">
          <div className="players-column">
            {playersTeam1 &&
              Object.entries(playersTeam1).map(([playerId, player]) => (
                <div className="player-card" key={playerId}>
                  <div className="player-info">
                    <div className="player-image-name-container">
                      <img
                        src={`data:image/jpeg;base64,${player?.playerImage}`}
                        className="match-banner"
                        alt={player?.playerName}
                      />
                      <div className="player-name">{player?.playerName}</div>
                    </div>

                    <div className="details">
                      <div className="player-amount">
                        ₹{player?.soldPrice || 0}
                      </div>
                      <div className="player-buyer">
                        Buyer: {player?.userResponseVO?.name}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          <div className="players-column">
            {playersTeam2 &&
              Object.entries(playersTeam2).map(([playerId, player]) => (
                <div className="player-card" key={playerId}>
                  <div className="player-info">
                  <div className="player-image-name-container">
                      <img
                        src={`data:image/jpeg;base64,${player?.playerImage}`}
                        className="match-banner"
                        alt={player?.playerName}
                      />
                      <div className="player-name">{player?.playerName}</div>
                    </div>
                    <div className="details">
                      <div className="player-amount">
                        ₹{player?.soldPrice || 0}
                      </div>
                      <div className="player-buyer">
                        Buyer: {player?.userResponseVO?.name}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="total-amount-container">
          <span>Total Amount =</span> ₹32000
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default PlayersFinalList;
