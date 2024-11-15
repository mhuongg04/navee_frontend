import MasterLayout from "../../../layouts/MasterLayout/masterlayout"
import { useNavigate } from 'react-router-dom';
import { List, Card, Button, Row, Col } from 'antd';
import 'antd/dist/reset.css';
import React from "react";
import { FaArrowRight } from 'react-icons/fa';
import traffic from '../../../assets/images/traffic1.png'

const courseData = {
    id: 'traffic-jam',
    title: 'Traffic Jam and Urban Mobility',
    description: 'Learn about traffic congestion, its causes, effects, and solutions to improve urban mobility.',
    instructor: 'John Doe',
    rating: 4.5,
    totalHours: 10,
    lessonsCount: 5,
    lessons: [
        { id: 1, title: 'Introduction to Traffic Jams', description: 'Overview of what traffic jams are and why they happen.' },
        { id: 2, title: 'Causes of Traffic Jams', description: 'Explore various factors that lead to traffic congestion.' },
        { id: 3, title: 'Effects on the Environment', description: 'Understand how traffic jams impact the environment.' },
        { id: 4, title: 'Economic Impacts', description: 'Learn how traffic jams affect the economy.' },
        { id: 5, title: 'Solutions to Reduce Traffic Jams', description: 'Examine different strategies to mitigate traffic jams.' },
    ],
    image: traffic
};

const Lessons = () => {

    const navigate = useNavigate();


    return (
        <MasterLayout>
            <Row gutter={[16, 16]} className="p-6">
                {/* Cột bên trái: Danh sách bài học */}
                <Col xs={24} md={16}>
                    <Row gutter={16} className="border rounded" style={{ backgroundColor: '#093673', padding: '16px' }}>

                        {/* Tiêu đề khóa học và thông tin bên cạnh hình ảnh */}
                        <Col xs={24} md={16} className="mt-4" style={{ color: '#FFFFFF' }}>
                            <h1 className="text-3xl font-bold">{courseData.title}</h1>
                            <p className="text-gray-600 mt-2">{courseData.description}</p>
                        </Col>

                        {/* Hình ảnh và tiêu đề trong cùng một dòng */}
                        <Col xs={24} md={8}>
                            <img
                                src={courseData.image}
                                alt={courseData.title}
                                className="img-fluid rounded"
                                style={{ width: '100%', height: 'auto' }}
                            />
                        </Col>

                    </Row>

                    <h2 className="text-2xl font-semibold mt-6 text-start mt-4">Course Content</h2>
                    <List
                        className="mt-4 text-start border rounded py-2 px-3"
                        itemLayout="horizontal"
                        dataSource={courseData.lessons}
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
                        <h3 className="text-lg font-semibold">Course Information</h3>
                        <p className="mt-2"><strong>Total hours:</strong> {courseData.totalHours} hours</p>
                        <p><strong>Lessons:</strong> {courseData.lessonsCount}</p>
                        <Button type="primary" className="w-full mt-4">Enroll Now</Button>
                    </Card>
                </Col>
            </Row>
        </MasterLayout>
    )
}

export default Lessons;