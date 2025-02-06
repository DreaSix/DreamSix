import { PAYMENTS } from "../Constants/Constant"
import { GetAPIRequest } from "./Api"

const getAllPayments = () => {
    return GetAPIRequest({
        url: PAYMENTS
    })
}

export const paymentService = {
    getAllPayments
}