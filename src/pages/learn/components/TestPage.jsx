import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Card, Button, ProgressBar, Form, Alert, Spinner, Modal } from 'react-bootstrap';
import { getTestById, submitTest } from '../api/testApi.api';
// Import CSS
import '../../../styles/TestStyles.css';

const TestPage = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const topic_id = location.state?.topic_id;
  
  const [test, setTest] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [result, setResult] = useState(null);
  
  useEffect(() => {
    const fetchTest = async () => {
      try {
        setLoading(true);
        const response = await getTestById(testId);
        
        // Kiểm tra dữ liệu trả về
        if (!response || !response.data) {
          throw new Error('Không tìm thấy dữ liệu bài kiểm tra');
        }
        
        setTest(response.data);
        
        // Khởi tạo object answers rỗng
        const initialAnswers = {};
        if (response.data.exercises && Array.isArray(response.data.exercises)) {
          response.data.exercises.forEach(exercise => {
            initialAnswers[exercise.id] = '';
          });
        }
        setAnswers(initialAnswers);
      } catch (error) {
        console.error('Error fetching test:', error);
        setError('Không thể tải bài kiểm tra. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchTest();
  }, [testId]);
  
  const handleAnswerChange = (exerciseId, value) => {
    setAnswers(prev => ({
      ...prev,
      [exerciseId]: value
    }));
  };
  
  const handleNext = () => {
    if (currentQuestion < test.exercises.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };
  
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };
  
  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const formattedAnswers = Object.entries(answers).map(([exerciseId, answer]) => ({
        exerciseId,
        answer: answer.trim() // Trim to remove whitespace
      }));
      
      // Kiểm tra xem có câu hỏi nào chưa trả lời không
      const unansweredQuestions = formattedAnswers.filter(answer => !answer.answer);
      if (unansweredQuestions.length > 0) {
        if (window.confirm(`Bạn còn ${unansweredQuestions.length} câu chưa trả lời. Bạn có chắc chắn muốn nộp bài?`)) {
          // Proceed with submission
        } else {
          setSubmitting(false);
          return;
        }
      }
      
      const submitResult = await submitTest(testId, formattedAnswers);
      setResult(submitResult);
      setSubmitted(true);
      
      // Lưu đầy đủ thông tin để cập nhật khi quay lại trang khóa học
      localStorage.setItem('need_progress_update', 'true');
      localStorage.setItem('last_completed_topic', topic_id);
      localStorage.setItem('last_test_score', submitResult.total_score);
      localStorage.setItem('test_completed', 'true');
      localStorage.setItem('last_completed_test', testId);
      
      // Thêm dòng sau để lưu tổng điểm bài kiểm tra
      localStorage.setItem('last_test_total_points', submitResult.total_points || 10);
      
      // Hiển thị modal thông báo thành công thay vì chuyển trang ngay lập tức
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Error submitting test:', error);
      setError('Không thể nộp bài kiểm tra. Vui lòng thử lại.');
    } finally {
      setSubmitting(false);
    }
  };
  
  const handleCloseModal = () => {
    setShowSuccessModal(false);
    // Chuyển về trang chi tiết khóa học
    navigate(`/dashboard/${topic_id}`, {
      state: { 
        testCompleted: true,
        testScore: result?.total_score,
        testId: testId
      }
    });
  };
  
  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Đang tải bài kiểm tra...</p>
      </div>
    );
  }
  
  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }
  
  if (!test || !test.exercises || test.exercises.length === 0) {
    return <Alert variant="info">Không tìm thấy bài kiểm tra hoặc bài kiểm tra không có câu hỏi</Alert>;
  }
  
  const currentExercise = test.exercises[currentQuestion];
  const progress = ((currentQuestion + 1) / test.exercises.length) * 100;
  
  return (
    <div className="test-page">
      <h2>{test.title}</h2>
      <p className="text-muted mb-4">{test.description}</p>
      
      <div className="mb-4">
        <div className="d-flex justify-content-between mb-2">
          <span>Tiến độ: {currentQuestion + 1}/{test.exercises.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <ProgressBar 
          now={progress} 
          variant={progress < 50 ? "info" : progress < 100 ? "primary" : "success"} 
          animated 
        />
      </div>
      
      <Card className="mb-4">
        <Card.Header>
          <div className="d-flex justify-content-between align-items-center">
            <span className="fw-bold">Câu hỏi {currentQuestion + 1}</span>
            <span className="badge bg-primary">
              {currentExercise.exercise_type === 'fillInBlank' ? 'Điền từ' : 'Trắc nghiệm'}
            </span>
          </div>
        </Card.Header>
        <Card.Body>
          <Card.Title>{currentExercise.question}</Card.Title>
          
          <div className="exercise-answer my-4">
            {currentExercise.exercise_type === 'fillInBlank' ? (
              // Hiển thị câu hỏi điền từ
              <Form.Group className="mb-0">
                <Form.Label className="fw-medium mb-2">Điền câu trả lời của bạn:</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Nhập câu trả lời của bạn"
                  value={answers[currentExercise.id] || ''}
                  onChange={(e) => handleAnswerChange(currentExercise.id, e.target.value)}
                />
              </Form.Group>
            ) : (
              // Hiển thị câu hỏi trắc nghiệm
              <Form.Group className="mb-0">
                <Form.Label className="fw-medium mb-3">Chọn đáp án đúng:</Form.Label>
                {currentExercise.options && currentExercise.options.map((option, index) => (
                  <Form.Check
                    key={index}
                    type="radio"
                    id={`option-${index}`}
                    label={option}
                    name={`question-${currentExercise.id}`}
                    checked={answers[currentExercise.id] === option}
                    onChange={() => handleAnswerChange(currentExercise.id, option)}
                  />
                ))}
              </Form.Group>
            )}
          </div>
        </Card.Body>
      </Card>
      
      <div className="d-flex justify-content-between">
        <Button 
          variant="outline-secondary" 
          onClick={handlePrevious}
          disabled={currentQuestion === 0 || submitting}
        >
          &larr; Câu trước
        </Button>
        
        {currentQuestion < test.exercises.length - 1 ? (
          <Button 
            variant="primary" 
            onClick={handleNext}
            disabled={submitting}
          >
            Câu tiếp theo &rarr;
          </Button>
        ) : (
          <Button 
            variant="success" 
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Đang nộp bài...
              </>
            ) : 'Nộp bài'}
          </Button>
        )}
      </div>
      
      <div className="mt-4">
        <Card>
          <Card.Body className="py-3">
            <div className="d-flex justify-content-between align-items-center">
              <Button 
                variant="outline-primary" 
                size="sm"
                onClick={() => setCurrentQuestion(0)}
                disabled={currentQuestion === 0 || submitting}
              >
                Câu đầu tiên
              </Button>
              
              <div className="d-flex flex-wrap justify-content-center" style={{ gap: "6px" }}>
                {test.exercises.map((_, index) => (
                  <Button
                    key={index}
                    variant={index === currentQuestion ? "primary" : answers[test.exercises[index].id] ? "outline-success" : "outline-secondary"}
                    size="sm"
                    className="question-navigation-btn"
                    onClick={() => setCurrentQuestion(index)}
                    disabled={submitting}
                  >
                    {index + 1}
                  </Button>
                ))}
              </div>
              
              <Button 
                variant="outline-primary" 
                size="sm"
                onClick={() => setCurrentQuestion(test.exercises.length - 1)}
                disabled={currentQuestion === test.exercises.length - 1 || submitting}
              >
                Câu cuối cùng
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
      
      {/* Modal thông báo nộp bài thành công */}
      <Modal show={showSuccessModal} onHide={handleCloseModal} centered backdrop="static" className="success-modal">
        <Modal.Header>
          <Modal.Title>Nộp bài thành công</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <div className="mb-4">
              <div className="rounded-circle bg-success d-inline-flex align-items-center justify-content-center mb-3" style={{ width: "64px", height: "64px" }}>
                <i className="fas fa-check text-white" style={{ fontSize: "32px" }}></i>
              </div>
              <h4 className="mt-2">Chúc mừng!</h4>
              <p className="mb-2">Bạn đã hoàn thành bài kiểm tra <strong>{test.title}</strong></p>
              
              <div className="badge bg-success py-2 px-3" style={{ fontSize: "0.9rem" }}>
                <i className="fas fa-check-circle me-1"></i> Đã hoàn thành
              </div>
            </div>
            
            {result && (
              <div className="result-summary">
                <h5 className="mb-3">Kết quả</h5>
                <p className="mb-2 fs-5">Điểm số: <strong className="text-primary">{result.total_score}</strong></p>
                {result.earnedPoints > 0 && (
                  <p className="text-success mb-0 fs-6">
                    <i className="fas fa-plus-circle me-1"></i> {result.earnedPoints} điểm tích lũy
                  </p>
                )}
              </div>
            )}
            
            <p className="text-muted mt-3">
              <small>Khi quay lại trang khóa học, bạn sẽ thấy bài kiểm tra này đã được đánh dấu "Đã hoàn thành"</small>
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleCloseModal}>
            Quay lại khóa học
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TestPage;