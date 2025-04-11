import MasterLayout from "../../../layouts/MasterLayout/masterlayout"
import { useNavigate, useParams, Link } from 'react-router-dom';
import { List, Card, Button, Row, Col } from 'antd';
import 'antd/dist/reset.css';
import React, { useState, useEffect } from "react";
import { FaArrowRight } from 'react-icons/fa';
import { getLessonByTopicId } from '../api/getAllLesson.api'
import enrollmentSuccessful from "../api/enrollTopics.api";
import { getTopicById } from "../api/getAllTopics.api";


const Course = () => {

    const navigate = useNavigate();
    const [listLesson, setListLesson] = useState([]);
    const { topic_id } = useParams();

    const [currentTopic, setCurrentTopic] = useState(null);
    const [, setLoading] = useState(false);

    //Lấy data khóa học
    useEffect(() => {
        const fetchTopic = async () => {
            let response, topic;
            setLoading(true);
            try {
                response = await getLessonByTopicId(topic_id);
                topic = await getTopicById(topic_id);

                const sortedLessons = response.data.sort((a, b) => {
                    if (a.part !== b.part) {
                        return a.part - b.part;
                    }
                    return a.title.localeCompare(b.title);
                });

                setListLesson(sortedLessons);
                setCurrentTopic(topic.data);
            }
            catch (error) {
                console.error('Cannot find this topic', error)
            }
            finally {
                setLoading(false)
            }
        }

        if (topic_id) {
            fetchTopic();
        }
    }, [topic_id]);


    //Đăng ký khóa học
    const handleEnrollTopic = async (topic_id) => {
        setLoading(true);
        try {
            await enrollmentSuccessful(topic_id);
        }
        catch (error) {
            console.error('Cannot enroll this course', error)
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
                                            <Link
                                                to={`/lesson/${lesson.id}`}
                                                state={{ topic_id }}
                                                className="text-dark font-weight-semibold text-decoration-none"
                                                style={{ fontSize: '1.1rem' }}
                                            >
                                                {lesson.title}
                                            </Link>
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