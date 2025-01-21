import { LOGIN_URL, REGISTER_USER, USER_DETAILS } from "../Constants/Constant"
import { GetAPIRequest, PostAPIRequest } from "./Api"

const createUser = (payload) => {
    return PostAPIRequest({
        url: REGISTER_USER,
        data: payload
    })
}

const loginUser = (payload) => {
    return PostAPIRequest({
        url: LOGIN_URL,
        data: payload
    })
}

const getUser = (userId) => {
    return GetAPIRequest({
        url: USER_DETAILS + "/" + userId
    })
}

export const userService = {
    createUser,
    loginUser, 
    getUser
}