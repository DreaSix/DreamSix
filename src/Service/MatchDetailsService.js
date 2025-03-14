import { ADD_DEPOSITE, ADD_WITHDRAW, ADD_WITHDRAW_TRANSACTION, GET_MATCH_DETAILS, GET_MATCH_DETAILS_AUCTION_COMPLETED, GET_MATCH_DETAILS_BY_ID, GET_MATCH_PLAYER_DETAILS, GET_MATCH_PLAYER_DETAILS_ENDPOINT, GET_USER_WITHDRAW_ACCOUNTS, MATCH_WINNER, SAVE_TEAM_PLAYERS, USER_BIDS } from "../Constants/Constant"
import { DeleteAPIRequest, GetAPIRequest, PostAPIRequest } from "./Api"

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

const getAllWIthdrawAccounts = () => {
    return GetAPIRequest({
        url: ADD_WITHDRAW + GET_USER_WITHDRAW_ACCOUNTS
    })
}

const deleteWithdrawAccount = (id) => {
    return DeleteAPIRequest({
        url: ADD_WITHDRAW + "/" + id
    })
}

const getWinners = () => {
    return GetAPIRequest({
      url: MATCH_WINNER,
    });
  };

const getUserBets = (id) => {
    return GetAPIRequest({
        url: USER_BIDS + id
    })
}

const createWithdrawRequest = (payload) => {
    return PostAPIRequest({
        url: ADD_WITHDRAW_TRANSACTION,
        data: payload
    })
}

const getMatches = () => {
    return GetAPIRequest({
        url: GET_MATCH_DETAILS_AUCTION_COMPLETED
    })
}

export const matchDetailsService = {
    getAllMatches,
    saveTeamPlayers,
    getMtachDetailsById,
    getMatchPlayerDetails,
    addDeposite,
    addWithdraw,
    getWinners,
    getAllWIthdrawAccounts,
    deleteWithdrawAccount,
    createWithdrawRequest,
    getUserBets,
    getMatches
}