import MasterLayout from "../../../layouts/MasterLayout/masterlayout"
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { List, Card, Row, Col, Progress, Button, Spin, Divider, Badge, message } from 'antd';
import 'antd/dist/reset.css';
import React, { useState, useEffect } from "react";
import { FaArrowRight } from 'react-icons/fa';
import { FormOutlined, CheckCircleOutlined, StarOutlined, StarFilled } from '@ant-design/icons';
import { getLessonByTopicId } from '../../learn/api/getAllLesson.api'
import { getTopicById } from "../../learn/api/getAllTopics.api";
import { getEnrolledTopicById } from "../api/fetchEnrolledTopics.api";
import { getUserPoints } from "../../user/api/userPoints.api";
import testApi from "../../learn/api/testApi.api";
// Import CSS
import '../../../styles/TestStyles.css';

const DetailsMyCourse = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [listLesson, setListLesson] = useState([]);
    const [error, setError] = useState(null);
    const { topic_id } = useParams();

    const [currentTopic, setCurrentTopic] = useState(null);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0); // Track user progress
    const [enrollment, setEnrollment] = useState(null);
    const [userPoints, setUserPoints] = useState(0);
    const [topicTests, setTopicTests] = useState([]);

    // Thêm state để theo dõi khi nào cần làm mới dữ liệu
    const [lastRefreshed, setLastRefreshed] = useState(Date.now());

    console.log("DetailsMyCourse rendering with topic_id:", topic_id);

    // Cập nhật useEffect để lấy thêm dữ liệu bài kiểm tra
    useEffect(() => {
        // Reset dữ liệu tiến độ khi topic_id thay đổi
        setProgress(0);
        setEnrollment(null);
        setListLesson([]);
        setTopicTests([]);
        
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
                // Lấy danh sách bài kiểm tra
                const testsResponse = await testApi.getTestsByUnit(topic_id);
                
                // Process test data
                const testsData = testsResponse.data || [];
                setTopicTests(testsData);
                
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
            // Lấy thông tin khóa học đã đăng ký mới nhất
            const enrollmentData = await getEnrolledTopicById(topic_id);
            // Lấy thông tin điểm của người dùng
            const pointsData = await getUserPoints();
            // Lấy danh sách bài kiểm tra cập nhật
            const testsResponse = await testApi.getTestsByUnit(topic_id);
            
            // Hiển thị rõ hơn về dữ liệu API trả về
            console.log("Tests data received in detail:", testsResponse);
            
            const testsData = testsResponse.data || [];
            
            // Kiểm tra xem dữ liệu bài kiểm tra có đúng định dạng không
            console.log("Final tests data to display:", testsData);
            
            if (testsData.length === 0) {
                console.warn("No test data received from API!");
            }
            
            // Kiểm tra từng bài kiểm tra
            testsData.forEach(test => {
                console.log(`Test ${test.id} details:`, {
                    title: test.title,
                    isCompleted: test.isCompleted,
                    score: test.score,
                    totalScore: test.totalScore
                });
            });
            
            
            setTopicTests(testsData);
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

    // Kiểm tra nếu người dùng đã hoàn thành bài kiểm tra khi quay lại trang
    useEffect(() => {
        // Kiểm tra có thông tin từ page test quay về không
        if (location.state && location.state.testCompleted) {
            console.log("Test completed, refreshing progress...");
            refreshProgress();
            // Reset state để không cập nhật liên tục
            navigate(location.pathname, { state: {} }, { replace: true });
        }
    }, [location]);

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
        const testCompleted = localStorage.getItem('test_completed');
        const lastTestId = localStorage.getItem('last_completed_test');
        const lastTestScore = localStorage.getItem('last_test_score');
        const lastTestTotalPoints = localStorage.getItem('last_test_total_points');
        
        if ((needUpdate === 'true' && lastCompletedTopic === topic_id) || testCompleted === 'true') {
            console.log("Auto updating progress after completing exercises or test...");
            
            // Nếu test mới vừa hoàn thành, hiển thị thông báo
            if (testCompleted === 'true') {
                // Giữ lại phần cập nhật điểm số trong state
                if (lastTestId && lastTestScore) {
                    // Tìm và cập nhật điểm số cho bài kiểm tra đã hoàn thành
                    setTopicTests(prevTests => prevTests.map(test => {
                        if (test.id === lastTestId) {
                            return {
                                ...test, 
                                isCompleted: true,
                                score: Number(lastTestScore),
                                totalScore: Number(lastTestTotalPoints || 10)
                            };
                        }
                        return test;
                    }));
                    console.log(`Manually updated test ${lastTestId} with score ${lastTestScore}/${lastTestTotalPoints || 10}`);
                }
            }
            
            refreshProgress();
            
            // Xóa flag để không cập nhật liên tục
            localStorage.removeItem('need_progress_update');
            localStorage.removeItem('last_completed_topic');
            localStorage.removeItem('test_completed');
            localStorage.removeItem('last_completed_test');
            localStorage.removeItem('last_test_score');
            localStorage.removeItem('last_test_total_points');
        }
    }, [topic_id]);

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
                        renderItem={(lesson) => {
                            // Kiểm tra xem bài học đã hoàn thành chưa
                            const isLessonCompleted = enrollment && 
                                enrollment.lessonProgress && 
                                enrollment.lessonProgress.find(progress => 
                                    progress.lesson_id === lesson.id && progress.completed
                                );
                            
                            return (
                                <List.Item 
                                    onClick={isLessonCompleted ? undefined : () => navigate(`/lesson/${lesson.id}`, { state: { topic_id } })}
                                    style={{ 
                                        backgroundColor: isLessonCompleted ? '#f6ffed' : 'white',
                                        transition: 'all 0.3s ease',
                                        padding: '12px',
                                        cursor: isLessonCompleted ? 'default' : 'pointer'
                                    }}
                                    className={isLessonCompleted ? 'lesson-completed-item' : 'hover:bg-gray-50'}
                                >
                                    <List.Item.Meta
                                        avatar={isLessonCompleted ? 
                                            <CheckCircleOutlined style={{ color: '#52c41a', fontSize: '24px' }} /> : 
                                            null
                                        }
                                        title={
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="d-flex align-items-center">
                                                    <span className="text-dark font-weight-semibold" style={{ fontSize: '1.1rem' }}>
                                                        {lesson.title}
                                                    </span>
                                                    {isLessonCompleted && (
                                                        <Badge 
                                                            style={{ 
                                                                backgroundColor: '#52c41a', 
                                                                fontSize: '0.8rem', 
                                                                marginLeft: '8px' 
                                                            }}
                                                            count="Đã hoàn thành"
                                                        />
                                                    )}
                                                </div>
                                                {!isLessonCompleted && <FaArrowRight className="text-muted" />}
                                            </div>
                                        }
                                    />
                                </List.Item>
                            );
                        }}
                    />
                    
                    {/* Phần hiển thị bài kiểm tra */}
                    {topicTests && topicTests.length > 0 && (
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
                                    <List.Item 
                                        onClick={test.isCompleted ? undefined : () => navigate(`/test/${test.id}`, { state: { topic_id } })}
                                        style={{ 
                                            backgroundColor: test.isCompleted ? '#f6ffed' : 'white',
                                            transition: 'all 0.3s ease',
                                            padding: '12px',
                                            cursor: test.isCompleted ? 'default' : 'pointer'
                                        }}
                                        className={`${test.isCompleted ? 'test-completed-item' : 'hover:bg-gray-50'}`}
                                    >
                                        <List.Item.Meta
                                            avatar={test.isCompleted ? 
                                                <CheckCircleOutlined style={{ color: '#52c41a', fontSize: '28px' }} /> : 
                                                <FormOutlined style={{ color: '#1890ff', fontSize: '28px' }} />
                                            }
                                            title={
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div style={{ maxWidth: '80%' }}>
                                                        <div className="d-flex align-items-center">
                                                            <span className="font-weight-bold" style={{ fontSize: '1.1rem', marginRight: '8px' }}>
                                                                {test.title}
                                                            </span>
                                                            {test.isCompleted && (
                                                                <Badge 
                                                                    style={{ 
                                                                        backgroundColor: '#52c41a', 
                                                                        fontSize: '0.8rem', 
                                                                        marginLeft: '8px' 
                                                                    }}
                                                                    count="Đã hoàn thành"
                                                                />
                                                            )}
                                                        </div>
                                                        
                                                        {test.isCompleted && test.score !== undefined && (
                                                            <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center' }}>
                                                                <Badge
                                                                    style={{
                                                                        background: 'linear-gradient(135deg, #ff7e5f, #ff0000)',
                                                                        fontSize: '1rem',
                                                                        fontWeight: 'bold',
                                                                        color: '#fff',
                                                                        padding: '4px 12px',
                                                                        borderRadius: '8px',
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                                                                    }}
                                                                    count={
                                                                        <span>
                                                                            <StarFilled style={{ marginRight: '6px', color: '#ffd700', fontSize: '1.2rem' }} />
                                                                            Điểm: {test.score}/{test.totalScore || 10}
                                                                        </span>
                                                                    }
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                    {!test.isCompleted && <FaArrowRight className="text-muted" />}
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
                                                    </div>
                                                </div>
                                            }
                                        />
                                    </List.Item>
                                )}
                            />
                        </div>
                    )}
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
                                enrollment.lessonProgress.filter(lesson => lesson.completed).length
                            } / {enrollment.lessonProgress.length} bài</p>
                        ) : (
                            <p><strong>Bài học đã hoàn thành:</strong> 0 / {listLesson.length} bài</p>
                        )}
                        
                        {/* Hiển thị thông tin bài kiểm tra đã hoàn thành */}
                        {topicTests && topicTests.length > 0 && (
                            <div className="mt-3">
                                <p><strong>Bài kiểm tra:</strong> {topicTests.length} bài</p>
                                <p><strong>Đã hoàn thành:</strong> {
                                    topicTests.filter(test => test.isCompleted).length
                                } / {topicTests.length} bài</p>
                                
                                {/* Hiển thị điểm số bài kiểm tra */}
                                {topicTests.some(test => test.isCompleted) && (
                                    <div className="mt-3 p-3 bg-light rounded">
                                        <h5 className="font-weight-bold">Điểm bài kiểm tra:</h5>
                                        <div className="mt-2">
                                            {topicTests.filter(test => test.isCompleted).map((test, index) => (
                                                <div key={test.id} className={index > 0 ? "mt-2" : ""}>
                                                    <div className="d-flex justify-content-between">
                                                        <span>{test.title}:</span>
                                                        <span className="text-primary font-weight-bold">
                                                            {test.score}/{test.totalScore || '?'}
                                                        </span>
                                                    </div>
                                                    <Progress 
                                                        percent={test.totalScore ? Math.round((test.score / test.totalScore) * 100) : 0} 
                                                        size="small"
                                                        strokeColor={
                                                            test.totalScore && (test.score / test.totalScore) >= 0.7 ? 
                                                                "#52c41a" : 
                                                                (test.score / test.totalScore) >= 0.4 ? 
                                                                    "#faad14" : "#f5222d"
                                                        }
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
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
