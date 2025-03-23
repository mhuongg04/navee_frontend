const { api } = require('../../../lib/api-client');

// Lấy thông tin điểm của người dùng từ API
const getUserPoints = async (forceRefresh = false) => {
    try {
        // Kiểm tra trong localStorage nếu không bắt buộc phải refresh
        if (!forceRefresh) {
            const storedPoints = localStorage.getItem('userPoints');
            if (storedPoints) {
                return { earnpoints: parseInt(storedPoints, 10) };
            }
        }

        // Lấy điểm từ API
        const response = await api.get('/points');
        const earnpoints = response.data.earnpoints || 0;
        
        // Lưu vào localStorage để sử dụng offline
        localStorage.setItem('userPoints', earnpoints.toString());
        
        return { earnpoints };
    } catch (error) {
        console.error("Error fetching user points:", error);
        // Fallback đến localStorage nếu API fails
        const storedPoints = localStorage.getItem('userPoints');
        return { earnpoints: storedPoints ? parseInt(storedPoints, 10) : 0 };
    }
};

// Cập nhật điểm trong localStorage và đồng bộ với server
const updateUserPoints = async (points) => {
    try {
        localStorage.setItem('userPoints', points.toString());
        return { earnpoints: points };
    } catch (error) {
        console.error("Error updating user points:", error);
        return { earnpoints: 0 };
    }
};

module.exports = {
    getUserPoints,
    updateUserPoints
};