const { api } = require('../../../../lib/api-client')

const uploadVocab = async (formData) => {
    console.log(formData.get(`vocabs`))
    return await api.post('/upload/vocab', formData)
};

const getAllVocabs = async () => {
    return await api.get('/vocab/all');
}

module.exports = {
    uploadVocab,
    getAllVocabs
}