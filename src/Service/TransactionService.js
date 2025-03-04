import { GET_TRANSACTION_BY_ID, GET_USER_TRANSACTIONS } from "../Constants/Constant"
import { GetAPIRequest } from "./Api"

const getUserTransactions = () => {
    return GetAPIRequest({
        url: GET_USER_TRANSACTIONS
    })
}

const getTransactionById = (id) => {
    return GetAPIRequest({
        url: GET_TRANSACTION_BY_ID + "/" + id
    })
}

export const transactionService = {
    getUserTransactions,
    getTransactionById
}