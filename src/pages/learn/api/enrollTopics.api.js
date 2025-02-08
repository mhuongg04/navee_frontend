import { api } from '../../../lib/api-client';

const enrollmentSuccessful = async (topicId) => {
    return await api.post('/users/enrollment', topicId);
}

export default enrollmentSuccessful;