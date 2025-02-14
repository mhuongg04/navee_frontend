import { api } from "../../../lib/api-client";

const editUserInfo = async (data) => {
    return await api.post(`/info/edit`, data)
        .then((res) => {
            return res.data
        })
        .catch((error) => {
            console.error("Cannot edit user's info", error);
        })
}

export default editUserInfo;