import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Row, Col, Badge } from 'react-bootstrap';
import testApi from '../api/testApi.api';

const TestList = ({ topicId }) => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchTests = async () => {
      try {
        setLoading(true);
        const response = await testApi.getUserTests();
        
        // Ensure we're handling the correct response format
        const testsData = response.data || [];
        
        // Lọc các bài kiểm tra liên quan đến topic hiện tại (nếu có)
        const filteredTests = topicId 
          ? testsData.filter(test => test.units && test.units.includes(topicId))
          : testsData;
          
        setTests(filteredTests);
      } catch (error) {
        console.error('Error fetching tests:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTests();
  }, [topicId]);
  
  const handleTakeTest = (testId) => {
    navigate(`/learn/test/${testId}`);
  };
  
  const handleViewResult = (testId) => {
    navigate(`/learn/test/${testId}/result`);
  };
  
  if (loading) {
    return <div className="text-center my-4">Đang tải bài kiểm tra...</div>;
  }
  
  if (tests.length === 0) {
    return <div className="text-center my-4">Không có bài kiểm tra nào.</div>;
  }
  
  return (
    <div className="test-list my-4">
      <h3 className="mb-4">Bài kiểm tra</h3>
      <Row>
        {tests.map((test) => (
          <Col key={test.id} md={6} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title>{test.title}</Card.Title>
                <Card.Text>{test.description}</Card.Text>
                <div className="d-flex justify-content-between align-items-center">
                  {test.isCompleted ? (
                    <>
                      <Badge bg="success">Đã hoàn thành</Badge>
                      <Button 
                        variant="outline-primary" 
                        onClick={() => handleViewResult(test.id)}
                      >
                        Xem kết quả
                      </Button>
                    </>
                  ) : (
                    <Button 
                      variant="primary" 
                      onClick={() => handleTakeTest(test.id)}
                    >
                      Làm bài
                    </Button>
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default TestList; 