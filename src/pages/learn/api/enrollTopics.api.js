import { api } from '../../../lib/api-client';

//Đăng ký khóa học
const enrollmentSuccessful = async (topicId) => {
    return await api.post('/users/enrollment', topicId);
}

export default enrollmentSuccessful;