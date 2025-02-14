const { api } = require('../../../lib/api-client');

//Lấy toàn bộ danh sách bài học hệ thống
const getAllLesson = async () => {
    return await api.get('/lessons/all')
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            console.error("Cannot get all lessons", error);
            return [];
        })
}

//Lấy danh sách bài học của khóa học
const getLessonByTopicId = async (topic_id) => {
    return await api.get(`/${topic_id}/lessons`)
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            console.error("Cannot get lesson data from topic Id", error);
            return [];
        })
}

//Lấy nội dung bài học
const getLesson = async (lesson_id) => {
    return await api.get(`/lesson/${lesson_id}`)
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            console.error("Cannot get this lesson", error);
            return;
        })
}

module.exports = {
    getAllLesson,
    getLessonByTopicId,
    getLesson
}
