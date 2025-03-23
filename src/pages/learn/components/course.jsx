import MasterLayout from "../../../layouts/MasterLayout/masterlayout"
import { useNavigate, useParams } from 'react-router-dom';
import { List, Card, Button, Row, Col, message } from 'antd';
import 'antd/dist/reset.css';
import React, { useState, useEffect } from "react";
import { FaArrowRight } from 'react-icons/fa';
import { getLessonByTopicId } from '../api/getAllLesson.api'
import enrollmentSuccessful from "../api/enrollTopics.api";
import { getTopicById } from "../api/getAllTopics.api";
import { getUserPoints } from "../../user/api/userPoints.api";


const Course = () => {

    const navigate = useNavigate();
    const [listLesson, setListLesson] = useState([]);
    const setError = useState(null);
    const { topic_id } = useParams();

    const [currentTopic, setCurrentTopic] = useState(null);
    const [loading, setLoading] = useState(false);
    const [userPoints, setUserPoints] = useState(0);

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
        setLoading(true);
        try {
            const response = await enrollmentSuccessful(topic_id);
            console.log("Enrollment response:", response); 
            // Kiểm tra response từ API
            if (response && response.status === 201) { 
                message.success("Đăng ký khóa học thành công!", 2, () => {
                    navigate('/dashboard');
                });
            }
        }
        catch (error) {
            console.error('Cannot enroll this course', error);
            // Hiển thị thông báo lỗi nếu cần
            if (error.response && error.response.status === 400 && error.response.data.message === "Already enrolled in this topic") {
                alert("Bạn đã đăng ký khóa học này rồi!");
            } else {
                alert("Không thể đăng ký khóa học. Vui lòng thử lại sau.");
            }
        }
        finally {
            setLoading(false);
        }
    };

    if (!currentTopic) {
        return (<div>Không thể tìm thấy khóa học</div>)
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

                {/* Cột bên phải: Thông tin khóa học */}
                <Col xs={24} md={8}>
                    <Card className="bg-gray-100 p-4 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold">Thông tin khóa học</h3>
                        <p className="mt-2"><strong>Tổng thời gian:</strong> {currentTopic.totalHours} giờ</p>
                        <p><strong>Lessons:</strong> {currentTopic.lessonsCount}</p>
                        {userPoints > 0 && (
                            <p className="mt-2"><strong>Điểm của bạn:</strong> <span className="text-success">{userPoints} điểm</span></p>
                        )}
                        <Button type="primary" className="w-full mt-4" onClick={() => handleEnrollTopic(currentTopic.id)}>Đăng ký học</Button>
                    </Card>
                </Col>
            </Row>
        </MasterLayout>
    )
}

export default Course;