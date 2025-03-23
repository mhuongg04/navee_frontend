const { api } = require('../../../lib/api-client');

const getEnrolledTopics = async () => {
  try {
    // Sử dụng 0 làm giá trị mặc định để lấy tất cả các khóa học đã đăng ký
    const endpoint = `/my-enrollments/0`;
    const res = await api.get(endpoint);
    return res.data || [];
  } catch (error) {
    console.error("Error fetching enrolled topics:", error.message);
    return [];
  }
};

const getEnrolledTopicById = async (topicId) => {
  try {
    if (!topicId) {
      console.error("Missing topic ID");
      return [];
    }
    
    const endpoint = `/my-enrollments/${topicId}`;
    const res = await api.get(endpoint);
    return res.data || [];
  } catch (error) {
    console.error("Error fetching enrolled topic by ID:", error.message);
    return [];
  }
};

module.exports = {
  getEnrolledTopics,
  getEnrolledTopicById
};