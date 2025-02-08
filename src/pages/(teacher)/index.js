import { Card, Col, Row } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import MasterLayout from '../../layouts/MasterLayout/masterlayout';

const Management = () => {
    const navigate = useNavigate();

    return (
        <MasterLayout>
            <h1 className='py-5'>QUẢN LÝ</h1>
            <Row gutter={16} justify="start">
                <Col xs={24} sm={12} md={12} lg={8} xl={6}>
                    <Card onClick={() => navigate('/manage-learn')}>
                        <h3>Quản lý tài liệu</h3>
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={12} lg={8} xl={6}>
                    <Card onClick={() => navigate('/manage-lessons')}>
                        <h3>Quản lý bài học</h3>
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={12} lg={8} xl={6}>
                    <Card onClick={() => navigate('/learn')}>
                        <h3>Quản lý bài kiểm tra</h3>
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={12} lg={8} xl={6}>
                    <Card onClick={() => navigate('/learn')}>
                        <h3>Quản lý trò chơi</h3>
                    </Card>
                </Col>
            </Row>
        </MasterLayout>
    )
}

export default Management