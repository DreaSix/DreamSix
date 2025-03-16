import { UPDATES } from "../Constants/Constant"
import { GetAPIRequest } from "./Api"

const getUpdates = () => {
    return GetAPIRequest({
        url: UPDATES
    })
}
export const updateService = {
    getUpdates
}