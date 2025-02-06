import { GET_ROLES_LIST } from "../Constants/Constant"
import { GetAPIRequest } from "./Api"

const getRoleList = () => {
    return GetAPIRequest({
        url: GET_ROLES_LIST
    })
}

export const roleService = {
    getRoleList
}