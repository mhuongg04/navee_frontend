import React from 'react';
import { Card, Col, Row } from 'antd'
import { useNavigate } from 'react-router-dom';
import MasterLayout from '../../../layouts/MasterLayout/masterlayout';

const DictionaryManagement = () => {
    const navigate = useNavigate();

    return (
        <MasterLayout>
            <div style={{ height: '1rem' }}></div>
            <h1>Quản lý Từ vựng và Flashcard</h1>
            <div style={{ height: '3rem' }}></div>
            <Row gutter={16} justify="start">
                <Col xs={24} sm={12} md={12} lg={8} xl={6}>
                    <Card onClick={() => navigate('/manage-vocab')}>
                        <h3>Quản lý Từ điển</h3>
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={12} lg={8} xl={6}>
                    <Card onClick={() => navigate('/manage-flashcard')}>
                        <h3>Quản lý Flashcard</h3>
                    </Card>
                </Col>
            </Row>
        </MasterLayout>
    )
}

export default DictionaryManagement;