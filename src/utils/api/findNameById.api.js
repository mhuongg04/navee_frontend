const { api } = require('../../lib/api-client');

const getLessonById = async (lesson_id) => {
    return await api.get(`/lesson/findnamebyID/${lesson_id}`)
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            console.error("Error fetch lesson name by ID", error);
        })
}

module.exports = {
    getLessonById
}
