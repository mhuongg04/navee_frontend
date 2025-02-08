import MasterLayout from "../../../layouts/MasterLayout/masterlayout"
import { useNavigate, useParams } from 'react-router-dom';
import { List, Card, Button, Row, Col } from 'antd';
import 'antd/dist/reset.css';
import React, { useState, useEffect } from "react";
import { FaArrowRight } from 'react-icons/fa';
import { getTopicByID } from "../api/getAllTopics.api";


import traffic from '../../../assets/images/traffic1.png'
import enrollmentSuccessful from "../api/enrollTopics.api";


const Course = () => {

    const navigate = useNavigate();
    const [listLesson, setListLesson] = useState([]);
    const setError = useState(null);
    const { topic_id } = useParams(); // ✅ Lấy topic_id từ URL

    const [currentTopic, setCurrentTopic] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchTopic = async (topic_id) => {
            let response;
            setLoading(true);
            try {
                response = await getTopicByID(topic_id);
                setCurrentTopic(response.data)
            }
            catch (error) {
                setError('Cannot find this topic', error)
            }
            finally {
                setLoading(false)
            }
            fetchTopic(topic_id);
        }
    }, [])

    const handleEnrollTopic = async (topic_id) => {
        setLoading(true);
        try {
            await enrollmentSuccessful(topic_id);
        }
        catch (error) {
            setError('Cannot enroll this course', error)
        }
        finally {
            setLoading(false);
        }
    };

    if (!currentTopic) {
        return <div>Không tìm thấy chủ đề.</div>;
    }


    return (
        <MasterLayout>
            <Row gutter={[16, 16]} className="p-6">
                {/* Cột bên trái: Danh sách bài học */}
                <Col xs={24} md={16}>
                    <Row gutter={16} className="border rounded" style={{ backgroundColor: '#093673', padding: '16px' }}>

                        {/* Tiêu đề khóa học và thông tin bên cạnh hình ảnh */}
                        <Col xs={24} md={16} className="mt-4" style={{ color: '#FFFFFF' }}>
                            <h1 className="text-3xl font-bold">{currentTopic.title}</h1>
                            <p className="text-gray-600 mt-2">{currentTopic.description}</p>
                        </Col>

                        {/* Hình ảnh và tiêu đề trong cùng một dòng */}
                        <Col xs={24} md={8}>
                            <img
                                src={currentTopic.image}
                                alt={currentTopic.title}
                                className="img-fluid rounded"
                                style={{ width: '100%', height: 'auto' }}
                            />
                        </Col>

                    </Row>

                    <h2 className="text-2xl font-semibold mt-6 text-start mt-4">Nội dung khóa học</h2>
                    <List
                        className="mt-4 text-start border rounded py-2 px-3"
                        itemLayout="horizontal"
                        dataSource={currentTopic.lessons}
                        renderItem={(lesson) => (
                            <List.Item onClick={() => navigate(`/lesson/${lesson.id}`)}>
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
                        <Button type="primary" className="w-full mt-4" onClick={() => handleEnrollTopic(currentTopic.id)}>Đăng ký học</Button>
                    </Card>
                </Col>
            </Row>
        </MasterLayout>
    )
}

export default Course;