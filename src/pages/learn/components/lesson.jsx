import React, { useRef, useEffect, useState } from 'react';
import { Row, Col, Card, Divider, Button } from 'antd';
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa';
import { getLesson } from '../api/getAllLesson.api';
import { useMediaQuery } from 'react-responsive';

const Lesson = () => {
    const audioRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();
    const { lessonId } = useParams();
    const [currentLesson, setCurrentLesson] = useState(null);
    const [, setLoading] = useState(false);
    const topic_id = location.state?.topic_id;
    const [isPracticeMode, setIsPracticeMode] = useState(false);
    //const [hasInteracted,] = useState(false);

    // const handlePlayAudio = () => {
    //     setHasInteracted(true);  // Đánh dấu rằng người dùng đã tương tác
    // };

    // const isMobile = useMediaQuery({ maxWidth: 767 });
    const isTabletOrLaptop = useMediaQuery({ minWidth: 768 });


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
    // useEffect(() => {
    //     if (hasInteracted && audioRef.current) {
    //         audioRef.current.pause();
    //         audioRef.current.currentTime = 0;

    //         const timer = setTimeout(() => {
    //             audioRef.current.src = isPracticeMode ? currentLesson.mp3_prac : currentLesson.mp3;
    //             audioRef.current.load();
    //             audioRef.current.addEventListener('canplaythrough', () => {
    //                 audioRef.current.play();
    //             }).catch(error => {
    //                 console.error("Playback error:", error);
    //             });
    //         }, 500);

    //         return () => {
    //             clearTimeout(timer);
    //         };
    //     }
    // }, [isPracticeMode, currentLesson, hasInteracted]);
    useEffect(() => {
        //if (!hasInteracted) return;
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
                    onClick={() => navigate(`/learn/${topic_id}`)}
                    style={{ cursor: 'pointer' }}
                >
                    <FaArrowLeft className="mr-2" />
                    <span className='px-3 fs-5'>Trở lại trang học tập</span>
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

            <div className="container border rounded border-info border-2 mt-3" style={{ padding: '20px' }}>
                <Row gutter={[16, 16]} align="top">
                    <Col xs={24} sm={24} md={11} className="w-100">
                        <Card title="Audio Player" bordered={false}>
                            <div>
                                <audio ref={audioRef} controls>
                                    <source src={isPracticeMode ? currentLesson.mp3_prac : currentLesson.mp3} type="audio/mp3" />
                                    Your browser does not support the audio element.
                                </audio>
                            </div>
                            {isTabletOrLaptop && (
                                <div className='mt-4'>
                                    <img
                                        alt='traffic-jam'
                                        src={currentLesson.image}
                                        style={{ width: '70%', objectFit: 'cover' }}
                                    />
                                </div>
                            )}
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

                    <Col xs={24} sm={24} md={11} className="w-100 h-full">
                        <Card title="Story" bordered={false}>
                            <h5 className="text-start">Script:</h5>
                            <p className="text-start">
                                {isPracticeMode ? currentLesson.des_prac : currentLesson.description}
                            </p>
                        </Card>
                    </Col>
                </Row>
            </div>

            <Row gutter={[16, 16]} justify="center" style={{ marginTop: '20px' }}>
                <Col xs={24} sm={12} md={6} className="d-flex justify-content-center">
                    <Button
                        onClick={() => navigate(`/practice/${lessonId}`, { state: { topic_id } })}
                        className="rounded-4"
                        style={{
                            backgroundColor: "#093673",
                            color: "white",
                            border: "none",
                            fontSize: "1rem",
                            padding: "20px 28px",
                            width: "100%",
                            maxWidth: '250px'
                        }}
                    >
                        Kiểm tra Từ mới
                    </Button>
                </Col>

                <Col xs={24} sm={12} md={6} className="d-flex justify-content-center">
                    <Button
                        onClick={() => {
                            setIsPracticeMode(!isPracticeMode);
                            if (audioRef.current) {
                                audioRef.current.pause();
                                audioRef.current.currentTime = 0;
                            }
                        }}
                        className="rounded-4"
                        style={{
                            backgroundColor: "#093673",
                            color: "white",
                            border: "none",
                            fontSize: "1rem",
                            padding: "20px 28px",
                            width: "100%",
                            maxWidth: '250px'
                        }}
                    >
                        {isPracticeMode ? "< Quay lại bài học" : "Luyện tập >"}
                    </Button>
                </Col>
            </Row>

        </>
    );
};

export default Lesson;
