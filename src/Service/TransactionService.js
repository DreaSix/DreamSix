import { GET_USER_TRANSACTIONS } from "../Constants/Constant"
import { GetAPIRequest } from "./Api"

const getUserTransactions = () => {
    return GetAPIRequest({
        url: GET_USER_TRANSACTIONS
    })
}

export const transactionService = {
    getUserTransactions
}