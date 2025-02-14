import React, { useState, useEffect } from "react";
import { getExercise } from "../api/getExercise.api";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../style/Practice.css";

const Practice = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { lessonId } = useParams();
    const [exercises, setExercises] = useState([]);
    const [answers, setAnswers] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [progress, setProgress] = useState(0);
    const topic_id = location.state?.topic_id;

    useEffect(() => {
        const fetchExercises = async () => {
            try {
                const response = await getExercise(lessonId);
                setExercises(response.exercises);
            } catch (error) {
                console.error("Lỗi khi lấy bài tập:", error);
            }
        };

        fetchExercises();
    }, [lessonId]);

    const handleChange = (e, id) => {
        setAnswers({ ...answers, [id]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let newScore = 0;
        let correctCount = 0;
        let hasWrongAnswer = false;

        exercises.forEach(ex => {
            if (answers[ex.id]?.toLowerCase().trim() === ex.answer.toLowerCase().trim()) {
                newScore += ex.point;
                correctCount++;
            } else {
                hasWrongAnswer = true;
            }
        });

        setScore(newScore);
        setProgress((correctCount / exercises.length) * 100);
        setIsSubmitted(true);

        if (hasWrongAnswer && navigator.vibrate) {
            navigator.vibrate([200, 100, 200]);
        }
    };

    const handleReset = () => {
        setIsSubmitted(false);
        setScore(0);
        setAnswers({});
    };

    return (
        <div className="container mt-5">
            <div className="card shadow-lg p-4">
                <h2 className="text-center text-primary fw-bold">🏆 Bài tập 🏆</h2>

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

                <form onSubmit={handleSubmit} className="mt-4">
                    {exercises.length > 0 ? (
                        exercises.map((ex, index) => (
                            <div
                                key={ex.id}
                                className={`card p-3 mb-3 shadow-sm border-0 ${isSubmitted && answers[ex.id] !== ex.answer ? "shake" : ""
                                    }`}
                            >
                                <p className="mb-2 fw-bold">
                                    🚧 Câu {index + 1}: {ex.question}
                                </p>
                                <input
                                    type="text"
                                    onChange={(e) => handleChange(e, ex.id)}
                                    disabled={isSubmitted}
                                    className="form-control rounded-pill"
                                    placeholder="Nhập câu trả lời..."
                                />
                                {isSubmitted && (
                                    <p
                                        className={`mt-2 fw-bold ${answers[ex.id] === ex.answer ? "text-success" : "text-danger"
                                            }`}
                                    >
                                        {answers[ex.id] === ex.answer
                                            ? "✅ Đúng! Bạn vượt qua chướng ngại vật!"
                                            : `❌ Sai, Đáp án: ${ex.answer}`}
                                    </p>
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-warning">⏳ Đang tải bài tập...</p>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitted}
                        className="btn btn-primary w-100 mt-3 fw-bold"
                    >
                        🏁 Nộp bài
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
                                onClick={() => navigate(`/learn/${topic_id}`)}
                                className="btn btn-success"
                            >
                                ⏪ Trở về khóa học
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Practice;
