import React, { useState, useEffect } from 'react';
import { List, Card, Empty, Spin } from 'antd';
import MasterLayout from '../../layouts/MasterLayout/masterlayout';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { getEnrolledTopics } from './api/fetchEnrolledTopics.api';
import { getUserPoints } from "../user/api/userPoints.api";

const MyCourse = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('');
  const [userPoints, setUserPoints] = useState(0);
  const navigate = useNavigate();
  
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        setLoading(true);
        const data = await getEnrolledTopics();
        console.log("Enrolled Courses:", data);
        
        // Kiểm tra dữ liệu trả về
        if (Array.isArray(data)) {
          setEnrolledCourses(data);
        } else {
          setEnrolledCourses([]);
          console.error('Invalid data format received from API');
        }
        
        // Lấy thông tin điểm của người dùng
        const pointsData = await getUserPoints();
        setUserPoints(pointsData.earnpoints || 0);
      } catch (error) {
        console.error('Error loading enrolled courses:', error);
        setError('Không thể tải danh sách khóa học đã đăng ký');
      } finally {
        setLoading(false);
      }
    };
    
    fetchEnrolledCourses();
  }, []);

  // Lọc khóa học theo trạng thái
  const filteredCourses = enrolledCourses.filter(course => {
    if (!course || !course.topic) return false;
    
    if (!filterStatus) return true;
    
    // Cải thiện cách tính toán trạng thái hoàn thành
    const lessonProgress = course.lessonProgress || [];
    const totalLessons = lessonProgress.length;
    
    // Đếm số bài học đã hoàn thành
    const completedLessons = lessonProgress.filter(lesson => lesson.completed).length;
    
    console.log(`Course ${course.topic.topic_name}: ${completedLessons}/${totalLessons} lessons completed`);
    
    const isCompleted = totalLessons > 0 && completedLessons === totalLessons;
    
    return (filterStatus === 'completed' && isCompleted) || 
           (filterStatus === 'in-progress' && !isCompleted);
  });

  if (isLoading) {
    return (
      <MasterLayout>
        <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
          <Spin size="large" tip="Đang tải..." />
        </div>
      </MasterLayout>
    );
  }

  return (
    <MasterLayout>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>KHÓA HỌC CỦA TÔI</h1>
        <div className="points-display bg-success text-white px-4 py-2 rounded-pill shadow">
          <i className="fas fa-star me-2"></i>
          <span className="fw-bold">{userPoints}</span> điểm tích lũy
        </div>
      </div>
      
      <div className="d-flex flex-column align-items-center gap-2 border rounded p-3" style={{ backgroundColor: '#e0f7fa' }}>
        <div style={{ width: '150px' }}>
          <label htmlFor="status" className="form-label fw-bold text-gray-700">Trạng thái</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="form-select border-secondary shadow-sm p-2"
          >
            <option value="">Tất cả</option>
            <option value="completed">Đã hoàn thành</option>
            <option value="in-progress">Đang học</option>
          </select>
        </div>
      </div>
      
      {error ? (
        <div className="alert alert-danger mt-4">
          <p>{error}</p>
        </div>
      ) : filteredCourses.length === 0 ? (
        <div className="text-center mt-4">
          <p>Bạn chưa đăng ký khóa học nào</p>
          <button
            className="btn btn-primary"
            onClick={() => navigate('/learn')}
          >
            Khám phá khóa học
          </button>
        </div>
      ) : (
        <List
          className="custom-scrollbar mt-4 max-h-[450px] pb-4"
          grid={{ gutter: 16, column: isMobile ? 1 : isTablet ? 2 : 5 }}
          dataSource={filteredCourses}
          bordered
          locale={{ emptyText: <Empty description="Không tìm thấy khóa học" /> }}
          renderItem={(course) => {
            // Xác định các ID bài học từ lessonProgress
            const lessonProgress = course.lessonProgress || [];
            
            // Log dữ liệu chi tiết để debug
            console.log(`Course ${course.topic.topic_name} - Progress data:`, lessonProgress);
            
            const totalLessons = lessonProgress.length;
            const completedLessons = lessonProgress.filter(lp => lp.completed).length;
            
            // Log kết quả tính toán
            console.log(`Course ${course.topic.topic_name}: ${completedLessons}/${totalLessons} completed (${Math.round((completedLessons / totalLessons) * 100)}%)`);
            
            const progressPercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
            const isCompleted = totalLessons > 0 && completedLessons === totalLessons;
            
            return (
              <List.Item>
                {course.topic && (
                  <Card
                    cover={
                      <img
                        alt={course.topic.topic_name || "Khóa học"}
                        src={course.topic.image || "/placeholder-image.jpg"}
                        style={{ height: '13rem', objectFit: 'cover' }}
                        onError={(e) => {
                          e.target.src = "/placeholder-image.jpg";
                        }}
                      />
                    }
                    onClick={() => {
                      console.log("Navigating to course:", course);
                      // Get the topic ID from the course object
                      const topicId = course.topic_id || (course.topic && course.topic.id);
                      
                      if (!topicId) {
                        console.error("Could not find topic ID for navigation", course);
                        return;
                      }
                      
                      navigate(`/dashboard/${topicId}`);
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    <h5>{course.topic.topic_name}</h5>
                    <div>
                      <p>Level: {course.topic.level || "N/A"}</p>
                      <div className="progress-section">
                        <div className="progress">
                          <div
                            className={`progress-bar ${isCompleted ? 'bg-success' : 'bg-primary'}`}
                            role="progressbar"
                            style={{ width: `${progressPercent}%` }}
                            aria-valuenow={progressPercent}
                            aria-valuemin="0"
                            aria-valuemax="100"
                          >
                            {progressPercent}%
                          </div>
                        </div>
                      </div>
                      <p className="mt-2">
                        Đã hoàn thành: {completedLessons}/{totalLessons} bài học
                      </p>
                    </div>
                  </Card>
                )}
              </List.Item>
            );
          }}
        />
      )}
      
      <style>{`
        .progress-section {
          margin: 16px 0;
        }
        .progress {
          height: 20px;
        }
        .progress-bar {
          transition: width 0.3s ease;
        }
      `}</style>
    </MasterLayout>
  );
};

export default MyCourse;