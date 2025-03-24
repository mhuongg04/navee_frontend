import React, { useState, useEffect } from "react";
import { getExercise } from "../api/getExercise.api";
import { submitExerciseAnswer, getUserExerciseResults } from "../api/submitExercise.api";
import { getUserPoints, updateUserPoints } from "../../user/api/userPoints.api";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../styles/Practice.css";
import PointsNotification from '../../../components/PointsNotification';

const Practice = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { lessonId } = useParams();
    const [exercises, setExercises] = useState([]);
    const [answers, setAnswers] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [progress, setProgress] = useState(0);
    const [results, setResults] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [earnedPoints, setEarnedPoints] = useState(0);
    const [totalUserPoints, setTotalUserPoints] = useState(0);
    const [showPointsNotification, setShowPointsNotification] = useState(false);
    const topic_id = location.state?.topic_id;

    useEffect(() => {
        const fetchExercises = async () => {
            try {
                const response = await getExercise(lessonId);
                setExercises(response.exercises);
                
                // Lấy kết quả bài tập đã làm trước đó (nếu có)
                const userResults = await getUserExerciseResults(lessonId);
                if (userResults && userResults.results) {
                    const resultsMap = {};
                    userResults.results.forEach(result => {
                        resultsMap[result.exercise_id] = result;
                    });
                    setResults(resultsMap);
                    
                    // Kiểm tra xem đã hoàn thành tất cả bài tập chưa
                    const allCompleted = response.exercises.every(ex => 
                        resultsMap[ex.id] && resultsMap[ex.id].completed
                    );
                    
                    if (allCompleted) {
                        setIsSubmitted(true);
                        setMessage("Bạn đã hoàn thành tất cả bài tập!");
                    }
                }
                
                // Lấy thông tin điểm của người dùng từ API mới
                const pointsData = await getUserPoints(true);
                setTotalUserPoints(pointsData.earnpoints || 0);
            } catch (error) {
                console.error("Lỗi khi lấy bài tập:", error);
            }
        };

        fetchExercises();
    }, [lessonId]);

    const handleChange = (e, id) => {
        setAnswers({ ...answers, [id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        try {
            let totalScore = 0;
            let correctCount = 0;
            let pointsEarned = 0;
            let updatedTotalPoints = totalUserPoints;
            
            console.log("Submitting exercise answers:", answers);
            
            // Xử lý từng bài tập
            for (const ex of exercises) {
                if (!answers[ex.id]) continue;
                
                // Gửi câu trả lời lên server
                console.log(`Submitting answer for exercise ${ex.id}: ${answers[ex.id]}`);
                const result = await submitExerciseAnswer(ex.id, answers[ex.id]);
                console.log("Exercise submission result:", result);
                
                // Cập nhật kết quả
                if (result.exerciseResult.completed) {
                    totalScore += result.earnedPoints;
                    pointsEarned += result.earnedPoints;
                    correctCount++;
                    
                    // Nếu API trả về tổng điểm mới của người dùng, cập nhật giá trị
                    if (result.updatedUserPoints) {
                        updatedTotalPoints = result.updatedUserPoints;
                    }
                }
                
                // Lưu kết quả vào state
                setResults(prev => ({
                    ...prev,
                    [ex.id]: result.exerciseResult
                }));
            }
            
            // Hoàn thành tất cả bài tập, force cập nhật tiến độ
            if (correctCount === exercises.length) {
                console.log("All exercises completed! Forcing progress update...");
                // Đánh dấu bài tập đã hoàn thành trong localStorage để sau này có thể kiểm tra
                localStorage.setItem(`completed_exercise_${lessonId}`, 'true');
                
                // Thông báo cho trang cha cập nhật tiến độ
                if (window.opener) {
                    window.opener.postMessage({ type: "EXERCISES_COMPLETED", lessonId: lessonId }, "*");
                }
            }
            
            setScore(totalScore);
            setEarnedPoints(pointsEarned);
            setProgress((correctCount / exercises.length) * 100);
            setIsSubmitted(true);
            
            // Cập nhật tổng điểm
            if (pointsEarned > 0) {
                const newTotalPoints = totalUserPoints + pointsEarned;
                updateUserPoints(newTotalPoints);
                setTotalUserPoints(newTotalPoints);
                setShowPointsNotification(true);
            }
            
            // Hiển thị thông báo
            if (correctCount === exercises.length) {
                setMessage(`🎉 Chúc mừng! Bạn đã hoàn thành tất cả bài tập và nhận được ${pointsEarned} điểm thưởng!`);
            } else {
                setMessage("Bạn cần hoàn thành tất cả bài tập để nhận điểm thưởng.");
            }
            
        } catch (error) {
            console.error("Lỗi khi nộp bài tập:", error);
            setMessage("Có lỗi xảy ra khi nộp bài tập. Vui lòng thử lại.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        setIsSubmitted(false);
        setScore(0);
        setAnswers({});
        setMessage("");
    };

    // Thay đổi hàm chuyển hướng quay lại khóa học
    const navigateBackToCourse = () => {
        // Đánh dấu trạng thái cần cập nhật trong localStorage trước khi điều hướng
        localStorage.setItem('need_progress_update', 'true');
        localStorage.setItem('last_completed_topic', topic_id);
        navigate(`/dashboard/${topic_id}`);
    };

    return (
        <div className="container mt-5">
            <div className="card shadow-lg p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2 className="text-primary fw-bold mb-0">🏆 Bài tập 🏆</h2>
                    <div className="points-display bg-light p-2 rounded shadow-sm">
                        <span className="fw-bold">Điểm tích lũy: </span>
                        <span className="badge bg-success fs-6">{totalUserPoints} điểm</span>
                    </div>
                </div>

                {/* Thanh tiến trình */}
                <div className="progress mt-3" style={{ height: "20px" }}>
                    <div
                        className="progress-bar progress-bar-striped progress-bar-animated bg-success"
                        role="progressbar"
                        style={{ width: `${progress}%` }}
                    >
                        {Math.round(progress)}%
                    </div>
                </div>

                {message && (
                    <div className={`alert ${message.includes("Chúc mừng") ? "alert-success" : "alert-info"} mt-3`}>
                        {message}
                    </div>
                )}

                {earnedPoints > 0 && (
                    <div className="alert alert-success mt-3 d-flex align-items-center">
                        <div className="points-animation me-3">🎯</div>
                        <div>
                            <strong>+{earnedPoints} điểm</strong> đã được thêm vào điểm tích luỹ của bạn!
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="mt-4">
                    {exercises.length > 0 ? (
                        exercises.map((ex, index) => {
                            const isCorrect = results[ex.id]?.completed;
                            const hasSubmitted = isSubmitted || results[ex.id];
                            
                            return (
                                <div
                                    key={ex.id}
                                    className={`card p-3 mb-3 shadow-sm border-0 ${hasSubmitted && !isCorrect ? "shake" : ""}`}
                                >
                                    <div className="d-flex justify-content-between">
                                        <p className="mb-2 fw-bold">
                                            🚧 Câu {index + 1}: {ex.question}
                                        </p>
                                        <span className="badge bg-info">{ex.point} điểm</span>
                                    </div>
                                    <input
                                        type="text"
                                        onChange={(e) => handleChange(e, ex.id)}
                                        value={answers[ex.id] || ""}
                                        disabled={hasSubmitted && isCorrect}
                                        className={`form-control rounded-pill ${hasSubmitted && isCorrect ? "bg-light" : ""}`}
                                        placeholder="Nhập câu trả lời..."
                                    />
                                    {hasSubmitted && (
                                        <p
                                            className={`mt-2 fw-bold ${isCorrect ? "text-success" : "text-danger"}`}
                                        >
                                            {isCorrect
                                                ? "✅ Đúng! Bạn vượt qua chướng ngại vật!"
                                                : `❌ Sai, Đáp án: ${ex.answer}`}
                                        </p>
                                    )}
                                </div>
                            );
                        })
                    ) : (
                        <p className="text-center text-warning">⏳ Đang tải bài tập...</p>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitted || isLoading}
                        className="btn btn-primary w-100 mt-3 fw-bold"
                    >
                        {isLoading ? "⏳ Đang xử lý..." : "🏁 Nộp bài"}
                    </button>
                </form>

                {isSubmitted && (
                    <div className="text-center mt-4">
                        <h3 className="text-info fw-bold">🎉 Điểm của bạn: {score} 🎉</h3>
                        <div className="d-flex justify-content-center gap-3 mt-3">
                            <button onClick={handleReset} className="btn btn-outline-primary">
                                🔄 Làm lại
                            </button>
                            <button
                                onClick={navigateBackToCourse}
                                className="btn btn-success"
                            >
                                ⏪ Trở về khóa học
                            </button>
                        </div>
                    </div>
                )}
            </div>
            
            <style jsx>{`
                .points-animation {
                    animation: bounce 1s infinite;
                    font-size: 1.5rem;
                }
                
                @keyframes bounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                
                .shake {
                    animation: shake 0.5s;
                }
                
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                    20%, 40%, 60%, 80% { transform: translateX(5px); }
                }
            `}</style>

            {showPointsNotification && (
                <PointsNotification 
                    points={earnedPoints} 
                    onClose={() => setShowPointsNotification(false)} 
                />
            )}
        </div>
    );
};

export default Practice;
