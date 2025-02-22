import { ADD_DEPOSITE, ADD_WITHDRAW, GET_MATCH_DETAILS, GET_MATCH_DETAILS_BY_ID, GET_MATCH_PLAYER_DETAILS, GET_MATCH_PLAYER_DETAILS_ENDPOINT, MATCH_WINNER, SAVE_TEAM_PLAYERS } from "../Constants/Constant"
import { GetAPIRequest, PostAPIRequest } from "./Api"

const getAllMatches = () => {
    return GetAPIRequest({
        url: GET_MATCH_DETAILS
    })
}

const saveTeamPlayers = (payload) =>{
    return PostAPIRequest({
        url: SAVE_TEAM_PLAYERS,
        data: payload
    })
}

const getMtachDetailsById = (matchId) => {
    return GetAPIRequest({
      url: GET_MATCH_DETAILS_BY_ID + matchId
      })
  }
  const getMatchPlayerDetails = (matchId) => {
    return GetAPIRequest({
        url: GET_MATCH_PLAYER_DETAILS + matchId + GET_MATCH_PLAYER_DETAILS_ENDPOINT,
  });
};

const addDeposite = (payload) => {
    return PostAPIRequest({
        url: ADD_DEPOSITE,
        data: payload
    })
}

const addWithdraw = (payload) => {
    return PostAPIRequest({
        url: ADD_WITHDRAW,
        data: payload
    })
}

const getWinners = () => {
    return GetAPIRequest({
      url: MATCH_WINNER,
    });
  };

export const matchDetailsService = {
    getAllMatches,
    saveTeamPlayers,
    getMtachDetailsById,
    getMatchPlayerDetails,
    addDeposite,
    addWithdraw,
    getWinners
}