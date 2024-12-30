import { REGISTER_USER } from "../Constants/Constant"
import { PostAPIRequest } from "./Api"

const createUser = (payload) => {
    return PostAPIRequest({
        url: REGISTER_USER,
        data: payload
    })
}

export const userService = {
    createUser
}