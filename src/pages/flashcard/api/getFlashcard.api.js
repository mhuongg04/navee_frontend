const { api } = require('../../../lib/api-client')

//Danh sách flashcard của tôi
const getMyFlashcard = async () => {
    return await api.get('/flashcard/my')
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            console.error("Cannot get my flashcard", error);
        })
}

//Danh sách tất cả flashcard (không bao gồm các flashcard user tạo)
const getFlashcard = async () => {
    return await api.get("/flashcard/all")
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            console.error("Cannot get all flashcard", error)
        })
}

//Lấy dữ liệu flashcard
const getFlashcardData = async (flashcard_id) => {
    return await api.get(`/flashcard/${flashcard_id}`)
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            console.error("Cannot get flashcard data", error)
        })
}

module.exports = {
    getMyFlashcard,
    getFlashcard,
    getFlashcardData
}