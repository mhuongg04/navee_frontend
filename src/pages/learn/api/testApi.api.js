const { api } = require('../../../lib/api-client');

//Lấy tất cả bài kiểm tra
const getAllTests = async () => {
    return await api.get('/tests/all')
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            console.error("Cannot get all tests", error);
            return [];
        });
};

//Lấy bài kiểm tra theo ID
const getTestById = async (testId) => {
    return await api.get(`/test/${testId}`)
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            console.error("Cannot get test by ID", error);
            return null;
        });
};

//Lấy các bài kiểm tra dành cho người dùng hiện tại
const getUserTests = async () => {
    return await api.get('/user/tests')
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            console.error("Cannot get user tests", error);
            return { data: [] };
        });
};

//Nộp bài kiểm tra
const submitTest = async (testId, answers) => {
    return await api.post(`/test/${testId}/submit`, { answers })
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            console.error("Cannot submit test", error);
            throw error;
        });
};

//Lấy kết quả bài kiểm tra
const getTestResult = async (testId) => {
    return await api.get(`/test/${testId}/result`)
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            console.error("Cannot get test result", error);
            return null;
        });
};

//Lấy bài kiểm tra theo unit (topic)
const getTestsByUnit = async (unitId) => {
    return await api.get(`/unit/${unitId}/tests`)
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            console.error(`Cannot get tests for unit ${unitId}`, error);
            return { data: [] };
        });
};

module.exports = {
    getAllTests,
    getTestById,
    getUserTests,
    submitTest,
    getTestResult,
    getTestsByUnit
}; 