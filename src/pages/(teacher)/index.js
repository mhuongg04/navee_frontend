import { Card, Col, Row } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import MasterLayout from '../../layouts/MasterLayout/masterlayout';
import {
    BookOutlined,
    FileTextOutlined,
    CheckSquareOutlined,
    OrderedListOutlined,
    ReadOutlined,
} from '@ant-design/icons';

const cardStyle = {
    cursor: 'pointer',
    transition: 'transform 0.2s',
    borderRadius: '10px',
    textAlign: 'center',
    backgroundColor: '#e6f7ff',
};

const Management = () => {
    const navigate = useNavigate();

    const cards = [
        {
            title: 'Quản lý khóa học',
            icon: <BookOutlined style={{ fontSize: 36, color: '#1890ff' }} />,
            path: '/manage-learn',
        },
        {
            title: 'Quản lý bài học',
            icon: <FileTextOutlined style={{ fontSize: 36, color: '#1890ff' }} />,
            path: '/manage-lessons',
        },
        {
            title: 'Quản lý bài kiểm tra',
            icon: <CheckSquareOutlined style={{ fontSize: 36, color: '#1890ff' }} />,
            path: '/learn',
        },
        {
            title: 'Quản lý bài tập',
            icon: <OrderedListOutlined style={{ fontSize: 36, color: '#1890ff' }} />,
            path: '/manage-exercise',
        },
        {
            title: 'Quản lý từ điển',
            icon: <ReadOutlined style={{ fontSize: 36, color: '#1890ff' }} />,
            path: '/manage-vocab',
        },
        {
            title: 'Quản lý flashcard',
            icon: <ReadOutlined style={{ fontSize: 36, color: '#1890ff' }} />,
            path: '/manage-flashcard',
        },
    ];

    return (
        <MasterLayout>
            <h1 className="py-5">QUẢN LÝ</h1>
            <Row gutter={[24, 24]}>
                {cards.map((card, index) => (
                    <Col xs={24} sm={12} md={8} lg={6} xl={6} key={index}>
                        <Card
                            hoverable
                            style={cardStyle}
                            onClick={() => navigate(card.path)}
                        >
                            {card.icon}
                            <h3 style={{ marginTop: 12 }}>{card.title}</h3>
                        </Card>
                    </Col>
                ))}
            </Row>
        </MasterLayout>
    );
};

export default Management;
