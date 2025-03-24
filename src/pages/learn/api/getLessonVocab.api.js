const { api } = require("../../../lib/api-client");

//Lấy danh sách từ mới của bài học
const getVocabByLessonId = async (lesson_id) => {
    return await api.get(`/vocab/${lesson_id}`)
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            console.error("Cannot get vocab data from lesson Id", error);
            return [];
        })
}

//Lưu từ vựng vào bộ flashcard
const saveToMyFlashcard = async (flashcard_id, vocab_id) => {
    return await api.post(`/flashcard/${flashcard_id}`, vocab_id)
}

module.exports = {
    getVocabByLessonId,
    saveToMyFlashcard
}