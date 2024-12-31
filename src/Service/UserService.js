import { LOGIN_URL, REGISTER_USER } from "../Constants/Constant"
import { PostAPIRequest } from "./Api"

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

export const userService = {
    createUser,
    loginUser
}