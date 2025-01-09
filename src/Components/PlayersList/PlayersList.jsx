import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "antd";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import "./PlayersList.scss";
import { matchDetailsService } from "../../Service/MatchDetailsService";

const PlayersList = () => {

  const {matchId} = useParams()

  const navigate = useNavigate();

  const [matches, setMatches] = useState([])
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
    getAllMatches()
  }, [])

  const getAllMatches = () => {
    matchDetailsService.getAllMatches()
      .then(response => {
        setMatches(response?.data)
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
    <main>
      <div className="match-page">
        <div className="matches-container">
          {matches?.map((match) => (
            <Card
              key={match?.matchId}
              hoverable
              className="match-card"
              onClick={() => navigate(`/players-final-list/${match?.matchId}`)}
            >
              <img
                src={`data:image/jpeg;base64,${match?.matchImage}`}
                alt={`${match.teamOneName} vs ${match.teamTwoName}`}
                className="match-image"
              />
              <div className="match-info">
                <h3>
                  {match.teamOneName} vs {match.teamTwoName}
                </h3>
                <p>{match.countdown}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
};

export default PlayersList;
