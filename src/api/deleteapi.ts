import { APIURL } from "./apiurl";
import api from "./axios";

export const deleteaccount = async () => {
    try {
        const res = await api.delete(APIURL.DELETE_ACCOUNT)
        return res?.data
    } catch (error) {
    }
}