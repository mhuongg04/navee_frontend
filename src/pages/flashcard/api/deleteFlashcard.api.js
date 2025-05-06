const { api } = require('../../../lib/api-client');

const deleteFlashcard = async (fc_id) => {
    return await api.delete(`/flashcard/${fc_id}/delete`);
}

module.exports = {
    deleteFlashcard
}