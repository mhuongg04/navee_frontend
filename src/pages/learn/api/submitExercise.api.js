const { api } = require('../../../lib/api-client');

// Gửi câu trả lời bài tập
const submitExerciseAnswer = async (exerciseId, answer) => {
    try {
        console.log(`Calling API to submit exercise ${exerciseId} with answer: ${answer}`);
        const response = await api.post('/submit', {
            exerciseId,
            answer
        });
        
        console.log("API response for exercise submission:", response.data);
        
        // Nếu phản hồi có chứa thông tin điểm mới, cập nhật localStorage
        if (response.data && response.data.updatedUserPoints !== undefined) {
            localStorage.setItem('userPoints', response.data.updatedUserPoints.toString());
        }
        
        return response.data;
    } catch (error) {
        console.error("Error submitting exercise:", error.response || error);
        throw error;
    }
};

// Lấy kết quả bài tập của người dùng cho một bài học
const getUserExerciseResults = async (lessonId) => {
    try {
        const response = await api.get(`/results/${lessonId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching exercise results:", error);
        return { results: [] };
    }
};

module.exports = {
    submitExerciseAnswer,
    getUserExerciseResults
}; 