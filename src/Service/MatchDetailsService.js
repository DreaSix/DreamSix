import { GET_MATCH_DETAILS, GET_MATCH_DETAILS_BY_ID, GET_MATCH_PLAYER_DETAILS, SAVE_TEAM_PLAYERS } from "../Constants/Constant"
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
        url: GET_MATCH_PLAYER_DETAILS + matchId,
  });
};

export const matchDetailsService = {
    getAllMatches,
    saveTeamPlayers,
    getMtachDetailsById,
    getMatchPlayerDetails
}