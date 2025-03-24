import React, { useRef, useEffect, useState } from 'react';
import { Row, Col, Card, Divider, Button } from 'antd';
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa';
import { getLesson } from '../api/getAllLesson.api';

const Lesson = () => {
    const audioRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();
    const { lessonId } = useParams();
    const [currentLesson, setCurrentLesson] = useState(null);
    const [, setLoading] = useState(false);
    const topic_id = location.state?.topic_id;
    const [isPracticeMode, setIsPracticeMode] = useState(false);


    // Lấy data bài học
    useEffect(() => {
        const fetchLesson = async (lessonId) => {
            setLoading(true);
            try {
                let response = await getLesson(lessonId);
                setCurrentLesson(response);
                // console.log(response)
            }
            catch (error) {
                console.error('Cannot find this lesson', error)
            }
            finally {
                setLoading(false)
            }
        }
        // console.log(currentLesson)
        fetchLesson(lessonId)

    }, [lessonId]);

    // Mở mp3
    useEffect(() => {
        const timer = setTimeout(() => {
            if (audioRef.current) {
                audioRef.current.src = isPracticeMode ? currentLesson.mp3_prac : currentLesson.mp3;
                audioRef.current.load();
                audioRef.current.addEventListener('canplaythrough', () => {
                    audioRef.current.play();
                });
            }
        }, 500);

        return () => {
            clearTimeout(timer);
        };
    }, [isPracticeMode, currentLesson]);

    if (!currentLesson) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="d-flex align-items-center justify-content-between p-3">
                <div
                    className="d-flex align-items-center text-start"
                    onClick={() => navigate(-1)}
                    style={{ cursor: 'pointer' }}
                >
                    <FaArrowLeft className="mr-2" />
                    <span className='px-3 fs-5'> Trở lại trang học tập</span>
                </div>

                <Button
                    className="rounded-4"
                    style={{
                        backgroundColor: "#093673",
                        color: "white",
                        border: "none",
                        fontSize: "20px",
                        padding: "22px 30px",
                    }}
                    onClick={() => navigate(`/vocab/${lessonId}`, { state: { topic_id } })}
                >
                    Từ vựng
                </Button>
            </div>
            <h2 className='mt-1'>{currentLesson.title}</h2>
            <div className="container border rounded border-info border-2 w-full h-full mt-3" style={{ padding: '20px' }}>
                <Row gutter={[16, 16]} align="top">
                    <Col xs={24} sm={24} md={11} className="w-full">
                        <Card title="Audio Player" bordered={false}>
                            <div>
                                <audio ref={audioRef} controls>
                                    <source src={isPracticeMode ? currentLesson.mp3_prac : currentLesson.mp3} type="audio/mp3" />
                                    Your browser does not support the audio element.
                                </audio>
                            </div>
                            <div className='mt-4'>
                                <img
                                    alt='traffic-jam'
                                    src={currentLesson.image}
                                    style={{ width: '70%', objectFit: 'cover' }}
                                />
                            </div>
                        </Card>
                    </Col>

                    <Col xs={0} sm={0} md={2}>
                        <Divider
                            type="vertical"
                            style={{
                                height: '100%',
                                borderColor: 'lightblue',
                                borderWidth: '2px',
                            }} />
                    </Col>

                    <Col xs={24} sm={24} md={11} className="w-full h-full">
                        <Card title="Story" bordered={false}>
                            <h5 className="text-start">Script:</h5>
                            <p className="text-start">
                                {isPracticeMode ? currentLesson.des_prac : currentLesson.description}
                            </p>
                        </Card>
                    </Col>
                </Row>
            </div>

            <div className="text-center mt-2 d-flex justify-content-center gap-3">
                <Button
                    onClick={() => navigate(`/practice/${lessonId}`, { state: { topic_id } })}
                    className="rounded-4"
                    style={{
                        backgroundColor: "#093673",
                        color: "white",
                        border: "none",
                        fontSize: "20px",
                        padding: "22px 30px",
                    }}
                >
                    Kiểm tra Từ mới
                </Button>

                <Button
                    onClick={() => setIsPracticeMode(!isPracticeMode)}
                    className="rounded-4"
                    style={{
                        backgroundColor: "#093673",
                        color: "white",
                        border: "none",
                        fontSize: "20px",
                        padding: "22px 30px",
                    }}
                >
                    {isPracticeMode ? "< Quay lại bài học" : "Luyện tập >"}
                </Button>
            </div>

        </>
    );
};

export default Lesson;
