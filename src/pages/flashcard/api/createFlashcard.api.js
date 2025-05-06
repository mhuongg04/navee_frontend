const { api } = require('../../../lib/api-client');

const userCreateFlashcard = async (data) => {
    //console.log(data.vocabs)
    return api.post('/flashcard/user/create', data)
}

const userAddVocabToFlashcard = async (data) => {
    return api.post(`/flashcard/${data.fc_id}`, data)
        .catch((error) => {
            console.error("Cannot add vocab to flashcard", error);
        })
}

module.exports = {
    userCreateFlashcard,
    userAddVocabToFlashcard
}