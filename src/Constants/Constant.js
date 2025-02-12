// export const BASE_URL = "https://ec2-13-60-233-23.eu-north-1.compute.amazonaws.com:8082";
export const BASE_URL = "http://localhost:8080";

export const REGISTER_USER = BASE_URL + "/api/user/create";

export const LOGIN_URL = BASE_URL + "/api/auth/login";

export const USER_DETAILS = BASE_URL + "/api/user"

export const CREATE_USER = BASE_URL + "/api/user/create"

export const GET_MATCH_DETAILS = BASE_URL + "/api/match-details";
export const GET_MATCH_DETAILS_BY_ID = BASE_URL + "/api/match-details/";

export const SAVE_TEAM_PLAYERS = BASE_URL + "/api/player-details/save-team";

export const GET_MATCH_PLAYER_DETAILS = BASE_URL + "/api/player-details/";

export const ADD_DEPOSITE = BASE_URL + "/api/transactions"
export const ADD_WITHDRAW = BASE_URL + "/api/withdraw";

//change password

export const CHANGE_PASSWORD = BASE_URL + "/api/user/change-password";

//role

export const GET_ROLES_LIST = BASE_URL + "/api/role/all"

//payments

export const PAYMENTS = BASE_URL + "/api/payments"

