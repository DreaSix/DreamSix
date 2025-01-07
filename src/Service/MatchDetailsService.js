import { GET_MATCH_DETAILS, SAVE_TEAM_PLAYERS } from "../Constants/Constant"
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

export const matchDetailsService = {
    getAllMatches,
    saveTeamPlayers
}