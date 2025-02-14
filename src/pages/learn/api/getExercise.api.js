const { api } = require('../../../lib/api-client');

//Lấy bài tập của mỗi bài học
const getExercise = async (lesson_id) => {
    return await api.get(`/${lesson_id}/exercise`)
        .then((res) => {
            //console.log(res.data)
            return res.data
        })
        .catch((error) => {
            console.error("Cannot fetch exercise by lesson ID", error);
        })
}

//Lấy danh sách các bài tập
const getAllExercise = async () => {
    return await api.get(`/exercises/all`)
        .then((res) => {
            return res.data
        })
        .catch((error) => {
            console.error("Cannot get all exercises", error)
        })
}

module.exports = {
    getExercise,
    getAllExercise
}