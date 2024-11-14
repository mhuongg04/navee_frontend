import React, { useRef, useEffect, useState } from 'react';
import { Row, Col, Card, Divider, Button } from 'antd';
import traffic1 from '../../assets/images/traffic1.png';
import traffic from '../../assets/mp3/topic/traffic-mp3.mp3';
import trafficpractice from '../../assets/mp3/topic/traffic1-practice.mp3';
import { useNavigate } from 'react-router-dom'

const DemoLearn = () => {
    const audioRef = useRef(null);

    //data mẫu
    const lessons = [
        {
            part: 'Part 1: Listening to the audio',
            audio: traffic,
            eng: 'A man wove at a taxi. The taxi stopped for the man to get in. The passenger told the driver that he was in a hurry for his class at university. After the man fastened the seat belt, the car started. However, things did not go well. The car encountered a red light, a bumpy road, and a traffic jam. In the end, fortunately, the class was postponed.',
            vie: 'Một người đàn ông vẫy tay để gọi một chiếc taxi. Chiếc taxi dừng lại để người đàn ông lên xe. Hành khách nói với tài xế rằng anh ta đang gấp mặt đi học ở trường đại học. Sau khi người đàn ông thắt dây an toàn, chiếc xe bắt đầu di chuyển. Tuy nhiên, mọi việc không diễn ra một cách suôn sẻ. Xe gặp đèn đỏ, đường xóc và kẹt xe. Cuối cùng, may mắn thay, buổi học đã bị hoãn lại.'
        },
        {
            part: 'Part 2: New words',
            audio: traffic,
            eng: (
                <>
                    <h4>passenger</h4>
                    <p>(noun) /ˈpæs.ən.dʒɚ/</p>
                </>
            ),
            vie: (
                <h4>
                    hành khách
                </h4>
            )
        },
        {
            part: 'Part 2: New words',
            audio: traffic,
            eng: (
                <>
                    <h4>seat belt</h4>
                    <p>(noun) /ˈsiːt ˌbelt/</p>
                </>
            ),
            vie: (
                <h4>dây an toàn</h4>
            )
        },
        {
            part: 'Part 2: New words',
            audio: traffic,
            eng: (
                <>
                    <h4>pedestrian</h4>
                    <p>(noun) /pəˈdes.tri.ən/</p>
                </>
            ),
            vie: (
                <h4>người qua đường</h4>
            )
        },
        {
            part: 'Part 2: New words',
            audio: traffic,
            eng: (
                <>
                    <h4>bumpy</h4>
                    <p>(adjective) /ˈbʌm.pi//</p>
                </>
            ),
            vie: (
                <h4>gập ghềnh</h4>
            )
        },
        {
            part: 'Part 2: New words',
            audio: traffic,
            eng: (
                <>
                    <h4>traffic jam</h4>
                    <p>(noun) /ˈtræf.ɪk ˌdʒæm/</p>
                </>
            ),
            vie: (
                <h4>tắc đường</h4>
            )
        },
        {
            part: 'Part 3: Practice',
            audio: trafficpractice,
            eng: (
                <p>Now let's practice with NAVEE!</p>
            ),
            vie: (
                <p>Hãy cùng luyện tập với NAVEE nhé!</p>
            )
        }
    ]

    const [currentIndex, setCurrentIndex] = useState(0);

    // Di chuyển đến bài học tiếp theo
    const handleNext = () => {
        if (currentIndex < lessons.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };


    // Di chuyển về bài học trước
    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    // Lấy dữ liệu của bài học hiện tại
    const currentLesson = lessons[currentIndex];

    const navigate = useNavigate()

    useEffect(() => {
        const timer = setTimeout(() => {
            if (audioRef.current) {
                audioRef.current.load()
                audioRef.current.play();
            }
        }, 1000);

    }, [currentIndex]);

    return (
        <>
            <div className='p-3 text-start' onClick={() => navigate('/learn')} style={{ cursor: 'pointer' }}>

                Return to Dashboard
            </div>
            <h2 className='mt-1'>Lesson 1: Traffic jam</h2>
            <div className="container border rounded border-info border-2 flex-fill mt-3" style={{ padding: '20px' }}>
                <h3 className='text-start'>{currentLesson.part}</h3>
                <Row gutter={16} align="stretch">
                    {/* Cột 1: Audio */}
                    <Col span={11} className="d-flex w-full">
                        <Card title="Audio Player" bordered={false}>
                            <div>
                                <audio ref={audioRef} controls>
                                    <source src={currentLesson.audio} type="audio/mp3" />
                                    Your browser does not support the audio element.
                                </audio>
                            </div>
                            <div className='mt-4'>
                                <img
                                    alt='traffic-jam'
                                    src={traffic1}
                                    style={{ height: '300px' }}
                                />
                            </div>

                        </Card>
                    </Col>

                    <Col span={2}>
                        <Divider
                            type="vertical"
                            style={{
                                height: '100%',
                                borderColor: 'lightblue',
                                borderWidth: '2px',
                            }} />
                    </Col>

                    {/* Cột 2: Script */}
                    <Col span={11} className="d-flex w-full">
                        <Card title="Story" bordered={false}>
                            <h5 className="text-start">English Term</h5>
                            <p className="text-start">
                                {currentLesson.eng}
                            </p>
                            <h5 className="text-start">Translation</h5>
                            <p className="text-start">
                                {currentLesson.vie}
                            </p>
                        </Card>
                    </Col>
                </Row>
            </div>
            <div className="text-center mt-2">
                <Button onClick={handlePrevious} disabled={currentIndex === 0}>
                    Previous
                </Button>

                <Button onClick={handleNext} disabled={currentIndex === lessons.length - 1} className="ml-4">
                    Next
                </Button>
            </div>
        </>
    )
}

export default DemoLearn
