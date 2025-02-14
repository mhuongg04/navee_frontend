const { api } = require('../../../lib/api-client');

//Lấy toàn bộ các khóa học
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

//Lọc khóa học theo level
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

//Tìm khóa học theo ID
const getTopicById = async (topic_id) => {
    return await api.get(`/${topic_id}`)
        .then((res) => {
            return res.data
        })
        .catch((error) => {
            console.error("Error get Topic by Id", error);
            return;
        })
}

module.exports = {
    getAllTopics,
    getTopicByLevel,
    getTopicById
};