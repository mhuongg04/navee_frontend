import { api } from "../../../lib/api-client";

const getUserInfo = async (token) => {
    return await api.get(`/info`, {
        headers: {
            Authorization: `Bearer ${token}`, // Đính kèm token vào headers
        },
    })
        .then((res) => {
            return res.data
        }).catch((error) => {
            console.error("Cannot get user's information", error);
        })
}

export default getUserInfo;