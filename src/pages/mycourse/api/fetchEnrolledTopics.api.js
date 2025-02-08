import { api } from "../../../lib/api-client"

const getEnrolledTopics = async () => {
    return await api.get('/enrollment/topics/all')
}

export default getEnrolledTopics;