import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Card, Button, Alert, Spinner, Row, Col, ListGroup } from 'react-bootstrap';
import testApi from '../api/testApi.api';
import { CheckCircleFill, XCircleFill } from 'react-bootstrap-icons';
// Import CSS
import '../../../styles/TestStyles.css';

const TestResult = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const topic_id = location.state?.topic_id;
  
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchResult = async () => {
      try {
        setLoading(true);
        const response = await testApi.getTestResult(testId);
        
        // Handle the correct response format
        if (response && response.data) {
          setResult(response.data);
        } else {
          throw new Error('Không nhận được dữ liệu kết quả');
        }
      } catch (error) {
        console.error('Error fetching test result:', error);
        setError('Không thể tải kết quả bài kiểm tra. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchResult();
  }, [testId]);
  
  const handleBackToCourse = () => {
    if (topic_id) {
      navigate(`/dashboard/${topic_id}`, {
        state: { testCompleted: true }
      });
    } else {
      navigate('/mycourse');
    }
  };
  
  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Đang tải kết quả bài kiểm tra...</p>
      </div>
    );
  }
  
  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }
  
  if (!result) {
    return (
      <Alert variant="info">
        <p>Bạn chưa hoàn thành bài kiểm tra này.</p>
        <div className="mt-3">
          <Button variant="primary" onClick={() => navigate(`/test/${testId}`, { state: { topic_id } })}>
            Làm bài kiểm tra
          </Button>
          <Button variant="outline-secondary" className="ml-2" onClick={handleBackToCourse}>
            Quay lại khóa học
          </Button>
        </div>
      </Alert>
    );
  }
  
  const totalPoints = result.test.exercises.reduce((sum, ex) => sum + ex.point, 0);
  const percentage = (result.total_score / totalPoints) * 100;
  
  return (
    <div className="test-result py-4">
      <h2 className="mb-4">Kết quả bài kiểm tra: {result.test.title}</h2>
      
      <Row className="mb-4">
        <Col md={8}>
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="mb-0">Điểm số của bạn</h4>
                <h3 className="text-primary mb-0">{result.total_score}/{totalPoints}</h3>
              </div>
              
              <div className="progress-container mb-3">
                <div className="progress" style={{ height: '25px' }}>
                  <div 
                    className={`progress-bar ${percentage >= 70 ? 'bg-success' : percentage >= 40 ? 'bg-warning' : 'bg-danger'}`} 
                    role="progressbar" 
                    style={{ width: `${percentage}%` }}
                    aria-valuenow={percentage} 
                    aria-valuemin="0" 
                    aria-valuemax="100"
                  >
                    {percentage.toFixed(0)}%
                  </div>
                </div>
              </div>
              
              <div className="message mt-3">
                {percentage >= 70 ? (
                  <Alert variant="success">
                    <h5 className="alert-heading">Xuất sắc!</h5>
                    <p>Chúc mừng! Bạn đã hoàn thành tốt bài kiểm tra.</p>
                  </Alert>
                ) : percentage >= 40 ? (
                  <Alert variant="warning">
                    <h5 className="alert-heading">Cần cải thiện</h5>
                    <p>Bạn cần cố gắng hơn để cải thiện kết quả.</p>
                  </Alert>
                ) : (
                  <Alert variant="danger">
                    <h5 className="alert-heading">Chưa đạt</h5>
                    <p>Bạn cần ôn tập lại bài học trước khi thử lại.</p>
                  </Alert>
                )}
              </div>
              
              {result.earnedPoints > 0 && (
                <Alert variant="info" className="mt-3">
                  <p className="mb-0">
                    <strong>+ {result.earnedPoints} điểm</strong> đã được thêm vào tài khoản của bạn!
                  </p>
                </Alert>
              )}
            </Card.Body>
          </Card>
          
          <div className="text-center mt-4">
            <Button variant="primary" onClick={handleBackToCourse}>
              Quay lại khóa học
            </Button>
            {percentage < 70 && (
              <Button variant="outline-primary" className="ml-3" onClick={() => navigate(`/test/${testId}`, { state: { topic_id } })}>
                Làm lại bài kiểm tra
              </Button>
            )}
          </div>
        </Col>
        
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Header className="bg-light">
              <h5 className="mb-0">Chi tiết câu trả lời</h5>
            </Card.Header>
            <ListGroup variant="flush">
              {result.question_results && result.question_results.map((qResult, index) => {
                const question = result.test.exercises.find(ex => ex.id === qResult.exercise_id);
                return (
                  <ListGroup.Item key={qResult.exercise_id} 
                    className={qResult.is_correct ? 'bg-success-light' : 'bg-danger-light'}
                  >
                    <div className="d-flex">
                      <div className="me-2">
                        {qResult.is_correct ? 
                          <CheckCircleFill className="text-success" size={20} /> :
                          <XCircleFill className="text-danger" size={20} />
                        }
                      </div>
                      <div>
                        <p className="mb-1"><strong>Câu {index + 1}:</strong> {question ? question.question : 'N/A'}</p>
                        <p className="mb-1 text-muted">Câu trả lời của bạn: <strong>{qResult.user_answer || '(Không có)'}</strong></p>
                        {!qResult.is_correct && (
                          <p className="mb-0 text-success">Đáp án đúng: <strong>{question ? question.answer : 'N/A'}</strong></p>
                        )}
                      </div>
                    </div>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default TestResult; 