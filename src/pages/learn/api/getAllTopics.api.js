const { api } = require('../../../lib/api-client');

const SuccessGetAllTopic = {
    topics: {
        id: null,
        "topicName": '',
        "description": '',
        "image": '',
        "mp3": '',
        "level": '',
    }
}

const getAllTopics = async () => {
    return await api.post(`/topics/all`)
        .then((res) => {
            return {
                ...SuccessGetAllTopic,
                topics: res.data.topics
            };
        })
        .catch((error) => {
            console.error("Error fetching topics:", error);
            return null;
        });
}

const getTopicByLevel = async (level) => {
    return await api.post(`/topics/searchbylevel`, level)
        .then((res) => {
            return {
                ...SuccessGetAllTopic,
                topics: res.data.topics
            };
        })
        .catch((error) => {
            console.error("Error fetching topics by level:", error);
            return null;
        });
}

module.exports = {
    getAllTopics,
    getTopicByLevel
};