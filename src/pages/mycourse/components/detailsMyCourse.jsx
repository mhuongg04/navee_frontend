import MasterLayout from "../../../layouts/MasterLayout/masterlayout"
import { useNavigate, useParams } from 'react-router-dom';
import { List, Card, Row, Col, Progress, Button, Spin } from 'antd';
import 'antd/dist/reset.css';
import React, { useState, useEffect } from "react";
import { FaArrowRight } from 'react-icons/fa';
import { getLessonByTopicId } from '../../learn/api/getAllLesson.api'
import { getTopicById } from "../../learn/api/getAllTopics.api";
import { getEnrolledTopicById } from "../api/fetchEnrolledTopics.api";
import { getUserPoints } from "../../user/api/userPoints.api";

const DetailsMyCourse = () => {
    const navigate = useNavigate();
    const [listLesson, setListLesson] = useState([]);
    const [error, setError] = useState(null);
    const { topic_id } = useParams();

    const [currentTopic, setCurrentTopic] = useState(null);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0); // Track user progress
    const [enrollment, setEnrollment] = useState(null);
    const [userPoints, setUserPoints] = useState(0);

    // Thêm state để theo dõi khi nào cần làm mới dữ liệu
    const [lastRefreshed, setLastRefreshed] = useState(Date.now());

    console.log("DetailsMyCourse rendering with topic_id:", topic_id);

    // Cập nhật useEffect để làm mới hoàn toàn dữ liệu khi topic_id thay đổi
    useEffect(() => {
        // Reset dữ liệu tiến độ khi topic_id thay đổi
        setProgress(0);
        setEnrollment(null);
        setListLesson([]);
        
        const fetchTopic = async (topic_id) => {
            console.log("Fetching topic with ID:", topic_id);
            let response, topic, enrollmentData;
            setLoading(true);
            try {
                // Lấy thông tin bài học
                response = await getLessonByTopicId(topic_id);
                // Lấy thông tin khóa học
                topic = await getTopicById(topic_id);
                // Lấy thông tin khóa học đã đăng ký
                enrollmentData = await getEnrolledTopicById(topic_id);
                // Lấy thông tin điểm của người dùng
                const pointsData = await getUserPoints();
                
                console.log("API responses for topic_id", topic_id, ":", response, topic, enrollmentData);
                
                setListLesson(response.data || []);
                setCurrentTopic(topic.data);
                setUserPoints(pointsData.earnpoints || 0);
                
                // Cập nhật dữ liệu enrollment và tính toán lại tiến độ - giống index.js
                if (Array.isArray(enrollmentData) && enrollmentData.length > 0) {
                    const currentEnrollment = enrollmentData.find(e => e.topic_id === topic_id);
                    
                    if (currentEnrollment) {
                        setEnrollment(currentEnrollment);
                        
                        // Logic giống index.js
                        const lessonProgress = currentEnrollment.lessonProgress || [];
                        const totalLessons = lessonProgress.length;
                        const completedLessons = lessonProgress.filter(lesson => lesson.completed).length;
                        
                        console.log(`Initial progress for topic ${topic_id}: ${completedLessons}/${totalLessons} completed (${totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0}%)`);
                        
                        // Tính phần trăm hoàn thành - giống index.js
                        setProgress(totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0);
                    } else {
                        console.log(`No enrollment data found for topic_id ${topic_id}`);
                        setEnrollment(null);
                        setProgress(0);
                    }
                } else {
                    console.log("No enrollment data found or invalid format");
                    setEnrollment(null);
                    setProgress(0);
                }
            }
            catch (error) {
                console.error('Cannot find this topic', error);
                setError('Không thể tải thông tin khóa học');
            }
            finally {
                setLoading(false);
            }
        }

        if (topic_id) {
            fetchTopic(topic_id);
        }
    }, [topic_id]);

    // Cập nhật hàm refreshProgress tương tự để đảm bảo lấy đúng dữ liệu
    const refreshProgress = async () => {
        console.log("Refreshing progress for topic:", topic_id);
        setLoading(true);
        try {
            // Lấy thông tin khóa học đã đăng ký mới nhất - làm theo index.js
            const enrollmentData = await getEnrolledTopicById(topic_id);
            // Lấy thông tin điểm của người dùng
            const pointsData = await getUserPoints();
            
            setUserPoints(pointsData.earnpoints || 0);
            
            // Cập nhật logic giống với index.js
            if (Array.isArray(enrollmentData) && enrollmentData.length > 0) {
                // Tìm enrollment cho khóa học hiện tại
                const currentEnrollment = enrollmentData.find(e => e.topic_id === topic_id);
                
                if (currentEnrollment) {
                    setEnrollment(currentEnrollment);
                    
                    // Xử lý lessonProgress - lấy chính xác như trong index.js
                    const lessonProgress = currentEnrollment.lessonProgress || [];
                    const totalLessons = lessonProgress.length;
                    
                    // Đếm số bài học đã hoàn thành - cách tính giống index.js
                    const completedLessons = lessonProgress.filter(lesson => lesson.completed).length;
                    
                    // Log thông tin để debug
                    console.log(`Progress refresh for topic ${topic_id}: ${completedLessons}/${totalLessons} completed (${totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0}%)`);
                    
                    // Tính phần trăm hoàn thành - giống index.js
                    const newProgress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
                    setProgress(newProgress);
                } else {
                    console.log(`No enrollment data found for topic_id ${topic_id} in refresh`);
                    setEnrollment(null);
                    setProgress(0);
                }
            } else {
                console.log("No enrollment data found or invalid format in refresh");
                setProgress(0);
            }
            
            // Cập nhật thời gian làm mới
            setLastRefreshed(Date.now());
        } catch (error) {
            console.error('Error refreshing progress', error);
        } finally {
            setLoading(false);
        }
    };

    // Thêm effect để kiểm tra cập nhật khi component được mount hoặc focus lại
    useEffect(() => {
        // Thêm event listener để cập nhật tiến độ khi tab được focus lại
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible' && topic_id) {
                refreshProgress();
            }
        };
        
        // Cập nhật tiến độ ngay khi component mount
        if (topic_id) {
            refreshProgress();
        }

        document.addEventListener('visibilitychange', handleVisibilityChange);
        
        // Thiết lập interval để tự động cập nhật tiến độ mỗi 30 giây
        const intervalId = setInterval(() => {
            if (topic_id) {
                refreshProgress();
            }
        }, 30000); // 30 giây

        // Cleanup function
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            clearInterval(intervalId);
        };
    }, [topic_id]);

    // Thêm effect để kiểm tra nếu vừa hoàn thành bài tập khi quay về trang khóa học
    useEffect(() => {
        // Kiểm tra xem có cần cập nhật tiến độ không
        const needUpdate = localStorage.getItem('need_progress_update');
        const lastCompletedTopic = localStorage.getItem('last_completed_topic');
        
        if (needUpdate === 'true' && lastCompletedTopic === topic_id) {
            console.log("Auto updating progress after completing exercises...");
            refreshProgress();
            
            // Xóa flag để không cập nhật liên tục
            localStorage.removeItem('need_progress_update');
            localStorage.removeItem('last_completed_topic');
        }
    }, [topic_id]); // Chạy khi topic_id thay đổi hoặc component mount

    if (loading) {
        return (
            <MasterLayout>
                <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
                    <Spin size="large" tip="Đang tải..." />
                </div>
            </MasterLayout>
        );
    }

    if (error) {
        return (
            <MasterLayout>
                <div className="alert alert-danger m-5">{error}</div>
            </MasterLayout>
        );
    }

    if (!currentTopic) {
        return (
            <MasterLayout>
                <div className="alert alert-warning m-5">Không thể tìm thấy khóa học</div>
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
                            <p className="mt-2">{currentTopic.description}</p>
                        </Col>

                        <Col xs={24} md={8}>
                            <img
                                src={currentTopic.image}
                                alt={currentTopic.topic_name}
                                className="img-fluid rounded h-100"
                            />
                        </Col>
                    </Row>

                    <h2 className="text-2xl font-semibold mt-6 text-start mt-4">Nội dung khóa học</h2>
                    <List
                        className="mt-4 text-start border rounded py-2 px-3"
                        itemLayout="horizontal"
                        dataSource={listLesson}
                        renderItem={(lesson) => (
                            <List.Item onClick={() => navigate(`/lesson/${lesson.id}`, { state: { topic_id } })}>
                                <List.Item.Meta
                                    title={
                                        <div className="d-flex justify-content-between align-items-center">
                                            <a className="text-dark font-weight-semibold text-decoration-none" style={{ fontSize: '1.1rem' }}>
                                                {lesson.title}
                                            </a>
                                            <FaArrowRight className="text-muted" />
                                        </div>
                                    }
                                />
                            </List.Item>
                        )}
                    />
                </Col>

                {/* Right column: Course progress information */}
                <Col xs={24} md={8}>
                    <Card className="bg-gray-100 p-4 rounded-lg shadow-md">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h3 className="text-lg font-semibold mb-0">Tiến độ học tập</h3>
                            <div className="points-badge bg-success text-white px-3 py-1 rounded-pill">
                                <i className="fas fa-star me-1"></i> {userPoints} điểm
                            </div>
                        </div>
                        <Progress 
                            percent={Math.round(progress)} 
                            status="active" 
                            strokeColor="#093673"
                            className="mt-3"
                        />
                        <p className="mt-4"><strong>Tổng thời gian:</strong> {currentTopic.totalHours || 0} giờ</p>
                        
                        {/* Hiển thị số bài học giống trong API response */}
                        <p><strong>Số bài học:</strong> {listLesson.length}</p>
                        
                        {enrollment && enrollment.lessonProgress ? (
                            <p><strong>Bài học đã hoàn thành:</strong> {
                                // Tính toán giống index.js
                                enrollment.lessonProgress.filter(lesson => lesson.completed).length
                            } / {enrollment.lessonProgress.length} bài</p>
                        ) : (
                            <p><strong>Bài học đã hoàn thành:</strong> 0 / {listLesson.length} bài</p>
                        )}
                        
                        {/* Cập nhật hiển thị nút/thông báo dựa trên giá trị progress */}
                        {progress < 100 ? (
                            <Button 
                                type="primary" 
                                className="w-100 mt-3"
                                onClick={() => navigate(`/lesson/${listLesson[0]?.id}`, { state: { topic_id } })}
                            >
                                Tiếp tục học
                            </Button>
                        ) : (
                            <div className="alert alert-success mt-3">
                                Chúc mừng! Bạn đã hoàn thành khóa học này.
                            </div>
                        )}
                    </Card>
                </Col>
            </Row>
        </MasterLayout>
    )
}

export default DetailsMyCourse;

