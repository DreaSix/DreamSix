
// export const BASE_URL = "https://ec2-13-60-233-23.eu-north-1.compute.amazonaws.com:8082";
export const BASE_URL = "https://api.dreamsix.in/v1.0/dreamsix";

export const REGISTER_USER = BASE_URL + "/api/user/create";

export const LOGIN_URL = BASE_URL + "/api/auth/login";

export const USER_DETAILS = BASE_URL + "/api/user"

export const CREATE_USER = BASE_URL + "/api/user/create"

export const GET_MATCH_DETAILS = BASE_URL + "/api/match-details";
export const GET_MATCH_DETAILS_BY_ID = BASE_URL + "/api/match-details/";
export const GET_MATCH_DETAILS_AUCTION_COMPLETED = GET_MATCH_DETAILS + "/get-matches";

export const SAVE_TEAM_PLAYERS = BASE_URL + "/api/player-details/save-team";

export const GET_MATCH_PLAYER_DETAILS = BASE_URL + "/api/player-details/";
export const GET_MATCH_PLAYER_DETAILS_ENDPOINT = "/matchDetails"

export const ADD_DEPOSITE = BASE_URL + "/api/transactions";
export const ADD_WITHDRAW_TRANSACTION = ADD_DEPOSITE + "/withdraw/request";
export const ADD_WITHDRAW = BASE_URL + "/api/withdraw";
export const GET_USER_WITHDRAW_ACCOUNTS = "/get-by-user";

export const  MATCH_WINNER = BASE_URL + "/api/winner-details";

export const USER_BIDS = GET_MATCH_PLAYER_DETAILS + "userBets/"


//change password

export const CHANGE_PASSWORD = BASE_URL + "/api/user/change-password";
export const FORGOT_PASSWORD = BASE_URL + "/api/user/forget-password"

//role

export const GET_ROLES_LIST = BASE_URL + "/api/role/all"

//payments

export const PAYMENTS = BASE_URL + "/api/payments";

//transactions

export const GET_USER_TRANSACTIONS = BASE_URL + "/api/transactions/get-all-transactions-by-user"
export const GET_TRANSACTION_BY_ID = BASE_URL + "/api/transactions";

export const SEND_OTP_URL = BASE_URL + "/api/otp/send"

export const VERIFY_OTP_URL = BASE_URL + "/api/otp/verify";

export const UPDATES = BASE_URL + "/updates";
