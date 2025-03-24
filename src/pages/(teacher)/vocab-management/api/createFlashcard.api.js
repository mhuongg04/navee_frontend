const { api } = require('../../../../lib/api-client');

const adminCreateFlashcard = async (data) => {
    return api.post('/flashcard/admin/create', data)
}

module.exports = {
    adminCreateFlashcard
}