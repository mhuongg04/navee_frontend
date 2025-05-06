import MasterLayout from "../../../layouts/MasterLayout/masterlayout"
import { useNavigate, useParams } from 'react-router-dom';
import { List, Card, Button, Row, Col, message, Divider, Badge, Progress, Spin } from 'antd';
import 'antd/dist/reset.css';
import React, { useState, useEffect } from "react";
import { FaArrowRight } from 'react-icons/fa';
import { getLessonByTopicId } from '../api/getAllLesson.api'
import enrollmentSuccessful from "../api/enrollTopics.api";
import { getTopicById } from "../api/getAllTopics.api";
import { getUserPoints } from "../../user/api/userPoints.api";
import { FormOutlined, CheckCircleOutlined, TrophyOutlined } from '@ant-design/icons';
import testApi from "../api/testApi.api";


const Course = () => {

    const navigate = useNavigate();
    const [listLesson, setListLesson] = useState([]);
    const setError = useState(null);
    const { topic_id } = useParams();

    const [currentTopic, setCurrentTopic] = useState(null);
    const [loading, setLoading] = useState(false);
    const [userPoints, setUserPoints] = useState(0);
    const [topicTests, setTopicTests] = useState([]);
    const [isEnrolling, setIsEnrolling] = useState(false);

    //Lấy data khóa học
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Lấy bài học
                const lessonResponse = await getLessonByTopicId(topic_id);
                
                // Lấy thông tin topic
                const topicResponse = await getTopicById(topic_id);
                
                // Lấy điểm người dùng
                const pointsData = await getUserPoints();
                
                // Lấy danh sách bài kiểm tra cho topic này
                const testsResponse = await testApi.getTestsByUnit(topic_id);
                
                // Lấy thêm kết quả bài kiểm tra cho từng bài test nếu đã đăng ký
                const testsData = testsResponse.data || [];
                let testsWithResults = testsData;
                
                try {
                    // Thử lấy kết quả bài kiểm tra nếu người dùng đã đăng ký khóa học
                    testsWithResults = await Promise.all(testsData.map(async (test) => {
                        try {
                            // Thử lấy kết quả bài kiểm tra
                            const resultResponse = await testApi.getTestResult(test.id);
                            if (resultResponse && resultResponse.data) {
                                return {
                                    ...test,
                                    isCompleted: true,
                                    score: resultResponse.data.total_score || 0,
                                    totalScore: resultResponse.data.test.exercises.reduce((sum, ex) => sum + ex.point, 0)
                                };
                            }
                            return test;
                        } catch (error) {
                            // Nếu chưa làm bài kiểm tra hoặc chưa đăng ký thì trả về test gốc
                            return test;
                        }
                    }));
                } catch (error) {
                    // Bỏ qua lỗi khi chưa đăng ký khóa học
                    console.log("Không thể lấy kết quả bài kiểm tra, có thể chưa đăng ký khóa học");
                }
                
                setTopicTests(testsWithResults);
                setListLesson(lessonResponse.data);
                setCurrentTopic(topicResponse.data);
                setUserPoints(pointsData.earnpoints || 0);
            }
            catch (error) {
                console.error('Error fetching data', error);
            }
            finally {
                setLoading(false);
            }
        }

        if (topic_id) {
            fetchData();
        }
    }, [topic_id]);

    //Đăng ký khóa học
    const handleEnrollTopic = async (topic_id) => {
        setIsEnrolling(true);
        try {
            const response = await enrollmentSuccessful(topic_id);
            console.log("Enrollment response:", response); 
            // Kiểm tra response từ API
            if (response && response.status === 201) { 
                message.success("Đăng ký khóa học thành công!", 2, () => {
                    navigate(`/dashboard/${topic_id}`);
                });
            }
        }
        catch (error) {
            console.error('Cannot enroll this course', error);
            // Hiển thị thông báo lỗi nếu cần
            if (error.response && error.response.status === 400 && error.response.data.message === "Already enrolled in this topic") {
                message.info("Bạn đã đăng ký khóa học này rồi!");
                // Chuyển đến trang chi tiết khóa học đã đăng ký
                setTimeout(() => {
                    navigate(`/dashboard/${topic_id}`);
                }, 1500);
            } else {
                message.error("Không thể đăng ký khóa học. Vui lòng thử lại sau.");
            }
        }
        finally {
            setIsEnrolling(false);
        }
    };

    if (!currentTopic) {
        return (
            <MasterLayout>
                <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
                    <Spin size="large" tip="Đang tải..." />
                </div>
            </MasterLayout>
        );
    }

    return (
        <MasterLayout>
            <Row gutter={[16, 16]} className="p-6">
                <Col xs={24} md={16}>
                    <Row gutter={16} className="border rounded" style={{ backgroundColor: '#093673', padding: '16px' }}>

                        <Col xs={24} md={16} className="mt-4" style={{ color: '#FFFFFF' }}>
                            <h1 className="text-3xl font-bold">{currentTopic.topic_name}</h1>
                            <p className="text-gray-600 mt-2">{currentTopic.description}</p>
                        </Col>

                        <Col xs={24} md={8}>
                            <img
                                src={currentTopic.image}
                                alt={currentTopic.title}
                                className="img-fluid rounded h-100"
                            />
                        </Col>

                    </Row>

                    <h2 className="text-2xl font-semibold mt-6 text-start mt-4">Nội dung khóa học</h2>
                    <List
                        className="mt-4 text-start border rounded py-2 px-3"
                        itemLayout="horizontal"
                        dataSource={listLesson}
                        renderItem={(lesson, index) => (
                            <List.Item>
                                <List.Item.Meta
                                    title={
                                        <div className="d-flex justify-content-between align-items-center">
                                            <span className="text-dark font-weight-semibold" style={{ fontSize: '1.1rem' }}>
                                                {lesson.title}
                                            </span>
                                        </div>
                                    }
                                />
                            </List.Item>
                        )}
                    />
                    
                    {/* Phần danh sách kiểm tra - được nâng cấp để hiển thị rõ ràng hơn */}
                    {topicTests && topicTests.length > 0 ? (
                        <div className="mt-5">
                            <Divider />
                            <h2 className="text-2xl font-semibold text-start" style={{ color: '#093673' }}>
                                <FormOutlined className="mr-2" /> BÀI KIỂM TRA
                            </h2>
                            <p className="text-muted text-start">Kiểm tra kiến thức sau khi học xong các bài học</p>
                            
                            <List
                                className="mt-4 text-start border rounded py-2 px-3"
                                itemLayout="horizontal"
                                dataSource={topicTests}
                                renderItem={(test) => (
                                    <List.Item>
                                        <List.Item.Meta
                                            avatar={
                                                test.isCompleted ? 
                                                <TrophyOutlined style={{ color: '#52c41a', fontSize: '24px' }} /> : 
                                                <FormOutlined style={{ color: '#1890ff', fontSize: '24px' }} />
                                            }
                                            title={
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <span className="font-weight-bold" style={{ fontSize: '1.1rem' }}>
                                                        {test.title}
                                                        {test.isCompleted && 
                                                            <Badge 
                                                                className="ml-2" 
                                                                count="Đã hoàn thành" 
                                                                style={{ backgroundColor: '#52c41a' }} 
                                                            />
                                                        }
                                                    </span>
                                                </div>
                                            }
                                            description={
                                                <div>
                                                    <p>{test.description || "Kiểm tra kiến thức"}</p>
                                                    <div className="d-flex mt-1">
                                                        <Badge 
                                                            count={`${test.exercises?.length || 0} câu hỏi`} 
                                                            style={{ backgroundColor: '#1890ff' }} 
                                                        />
                                                        {test.isCompleted && test.score !== undefined && 
                                                            <Badge 
                                                                className="ml-2" 
                                                                count={`Điểm: ${test.score}/${test.totalScore || '?'}`} 
                                                                style={{ backgroundColor: '#722ed1' }} 
                                                            />
                                                        }
                                                    </div>
                                                </div>
                                            }
                                        />
                                    </List.Item>
                                )}
                            />
                        </div>
                    ) : null}
                </Col>

                {/* Cột bên phải: Thông tin khóa học */}
                <Col xs={24} md={8}>
                    <Card className="bg-gray-100 p-4 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold">Thông tin khóa học</h3>
                        <p className="mt-2"><strong>Tổng thời gian:</strong> {currentTopic.totalHours || '-'} giờ</p>
                        <p><strong>Lessons:</strong> {listLesson.length}</p>
                        <p><strong>Bài kiểm tra:</strong> {topicTests.length}</p>
                        {userPoints > 0 && (
                            <p className="mt-2"><strong>Điểm của bạn:</strong> <span className="text-success">{userPoints} điểm</span></p>
                        )}
                        <Button 
                            type="primary" 
                            className="w-full mt-4"
                            onClick={() => handleEnrollTopic(currentTopic.id)}
                            loading={isEnrolling}
                        >
                            Đăng ký học
                        </Button>
                    </Card>
                </Col>
            </Row>
        </MasterLayout>
    )
}

export default Course;