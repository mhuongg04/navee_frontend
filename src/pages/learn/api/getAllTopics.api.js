const { api } = require('../../../lib/api-client');


const getAllTopics = async () => {
    return await api.get("/topics/all")
        .then((res) => {
            console.log(res.data)
            return res.data;  // Giả sử response.data là mảng các topic
        })
        .catch((error) => {
            console.error("Error fetching topics:", error);
            return [];
        });
}

const getTopicByLevel = async (level) => {
    return await api.get("/topics/searchbylevel", { params: { level } })
        .then((res) => {
            return res.data;  // Giả sử response.data.topics chứa các topic
        })
        .catch((error) => {
            console.error("Error fetching topics by level:", error);
            return [];
        });
}

const getTopicByID = async (topic_id) => {
    return await api.get(`/${topic_id}`)
        .then((res) => {
            return res.data
        })
        .catch((error) => {
            console.error("Error fetching topic's lessons", error);
            return [];
        })
}

module.exports = {
    getAllTopics,
    getTopicByLevel,
    getTopicByID
};