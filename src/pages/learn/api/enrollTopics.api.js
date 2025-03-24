import { api } from '../../../lib/api-client';

//Đăng ký khóa học
const enrollmentSuccessful = async (topicId) => {
    console.log("Enrolling in topic with ID:", topicId);
    return await api.post('/enroll', {
        topicId
    });
};

export default enrollmentSuccessful;