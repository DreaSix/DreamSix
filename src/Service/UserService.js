import { CHANGE_PASSWORD, CREATE_USER, FORGOT_PASSWORD, LOGIN_URL, REGISTER_USER, USER_DETAILS } from "../Constants/Constant"
import { GetAPIRequest, PostAPIRequest, PutAPIRequest } from "./Api"

const createUser = (payload) => {
    return PostAPIRequest({
        url: CREATE_USER,
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
        url: USER_DETAILS + "/" + userId + "/find"
    })
}

const changePassword = (payload) => {
    return PutAPIRequest({
        url: CHANGE_PASSWORD,
        data: payload
    })
}

const forgotPassword = (params) => {
    return PutAPIRequest({
        url: FORGOT_PASSWORD,
        params
    })
}

export const userService = {
    createUser,
    loginUser, 
    getUser, 
    changePassword,
    forgotPassword
}