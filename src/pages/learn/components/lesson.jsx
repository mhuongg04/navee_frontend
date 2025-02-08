import React, { useRef, useEffect, useState } from 'react';
import { Row, Col, Card, Divider, Button } from 'antd';
import traffic1 from '../../../assets/images/traffic1.png';
import traffic from '../../../assets/mp3/topic/traffic-mp3.mp3';
import trafficpractice from '../../../assets/mp3/topic/traffic1-practice.mp3';
import { useNavigate, useParams } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa';
import police from '../../../assets/images/police.png';
import traffic2 from '../../../assets/mp3/topic/traffic2.mp3';
import traffic2practice from '../../../assets/mp3/topic/traffic2-practice.mp3'
import traffic3 from '../../../assets/mp3/topic/traffic3.mp3';
import traffic3practice from '../../../assets/mp3/topic/traffic3-practice.mp3'
import rushhour from '../../../assets/images/rushhour.png';

import trafficjam from '../../../assets/mp3/vocab/trafficjam.mp3';
import pedestrian from '../../../assets/mp3/vocab/pedestrian.mp3';
import passenger from '../../../assets/mp3/vocab/passenger.mp3';
import seatbelt from '../../../assets/mp3/vocab/seatbelt.mp3';
import bumpy from '../../../assets/mp3/vocab/bumpy.mp3';
import motorbike from '../../../assets/mp3/vocab/motorbike.mp3';
import rushhourmp3 from '../../../assets/mp3/vocab/rushhour.mp3';
import handlebar from '../../../assets/mp3/vocab/handlebar.mp3';
import vehicle from '../../../assets/mp3/vocab/vehicle.mp3';
import trafficlaw from '../../../assets/mp3/vocab/trafficlaw.mp3';
import pavement from '../../../assets/mp3/vocab/pavement.mp3';
import car from '../../../assets/mp3/vocab/car.mp3';
import bus from '../../../assets/mp3/vocab/bus.mp3';
import airplane from '../../../assets/mp3/vocab/airplane.mp3';

const Lesson = () => {
    const audioRef = useRef(null);
    const navigate = useNavigate();
    //data mẫu
    const lessons = [
        {
            id: 1,
            title: "Lesson 1",
            img: traffic1,
            parts: [
                {
                    part: 'Part 1: Listening to the audio',
                    audio: traffic,
                    eng: 'A man wove at a taxi. The taxi stopped for the man to get in. The passenger told the driver that he was in a hurry for his class at university. After the man fastened the seat belt, the car started. However, things did not go well. The car encountered a red light, a bumpy road, and a traffic jam. In the end, fortunately, the class was postponed.',
                    vie: 'Một người đàn ông vẫy tay để gọi một chiếc taxi. Chiếc taxi dừng lại để người đàn ông lên xe. Hành khách nói với tài xế rằng anh ta đang gấp mặt đi học ở trường đại học. Sau khi người đàn ông thắt dây an toàn, chiếc xe bắt đầu di chuyển. Tuy nhiên, mọi việc không diễn ra một cách suôn sẻ. Xe gặp đèn đỏ, đường xóc và kẹt xe. Cuối cùng, may mắn thay, buổi học đã bị hoãn lại.'
                },
                {
                    part: 'Part 2: New words',
                    audio: passenger,
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
                    audio: seatbelt,
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
                    audio: pedestrian,
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
                    audio: bumpy,
                    eng: (
                        <>
                            <h4>bumpy</h4>
                            <p>(adjective) /ˈbʌm.pi/</p>
                        </>
                    ),
                    vie: (
                        <h4>gập ghềnh</h4>
                    )
                },
                {
                    part: 'Part 2: New words',
                    audio: trafficjam,
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
        },
        {
            id: 2,
            tittle: "Lesson 2",
            img: police,
            parts: [
                {
                    part: 'Part 1: Listening to the audio',
                    audio: traffic2,
                    eng: 'A man was riding a motorbike. Vehicles were bustling on the road. Because of the heavy traffic, he gripped the handlebars tightly and decided to ride up onto the pavement to move more easily, even running a red light. As a result, he had been stopped by the traffic police and fined for his action. After paying the fine, he learned to always obey the traffic laws from now on.',
                    vie: 'Một người đàn ông đang điều khiển xe máy. Trên đường, có rất nhiều phương tiện giao thông. Do giao thông tắc nghẽn, anh ta nắm chặt tay lái và quyết định lái xe lên vỉa hè để di chuyển dễ dàng hơn, thậm chí còn vượt đèn đỏ. Kết quả là anh ta bị cảnh sát giao thông chặn lại và bị phạt. Sau khi trả tiền phạt, anh ta đã học được bài học là phải luôn tuân thủ luật giao thông.'
                },
                {
                    part: 'Part 2: New words',
                    audio: motorbike,
                    eng: (
                        <>
                            <h4>motorbike</h4>
                            <p>(noun) /ˈmoʊ.t̬ɚ.baɪk/</p>
                        </>
                    ),
                    vie: (
                        <h4>
                            xe máy
                        </h4>
                    )
                },
                {
                    part: 'Part 2: New words',
                    audio: vehicle,
                    eng: (
                        <>
                            <h4>vehicle</h4>
                            <p>(noun) /ˈviː.ə.kəl/</p>
                        </>
                    ),
                    vie: (
                        <h4>phương tiện giao thông</h4>
                    )
                },
                {
                    part: 'Part 2: New words',
                    audio: pavement,
                    eng: (
                        <>
                            <h4>pavement</h4>
                            <p>(noun) /ˈpeɪv.mənt/</p>
                        </>
                    ),
                    vie: (
                        <h4>vỉa hè</h4>
                    )
                },
                {
                    part: 'Part 2: New words',
                    audio: handlebar,
                    eng: (
                        <>
                            <h4>handlebar</h4>
                            <p>(noun) /ˈhæn.dəl.bɑːr/</p>
                        </>
                    ),
                    vie: (
                        <h4>tay lái</h4>
                    )
                },
                {
                    part: 'Part 2: New words',
                    audio: trafficlaw,
                    eng: (
                        <>
                            <h4>Traffic Law</h4>
                            <p>(noun) /ˈtræf.ɪk lɑː/</p>
                        </>
                    ),
                    vie: (
                        <h4>Luật giao thông</h4>
                    )
                },
                {
                    part: 'Part 3: Practice',
                    audio: traffic2practice,
                    eng: (
                        <p>Now let's practice with NAVEE!</p>
                    ),
                    vie: (
                        <p>Hãy cùng luyện tập với NAVEE nhé!</p>
                    )
                }
            ]
        },
        {
            id: 3,
            tittle: "Lesson 3",
            img: rushhour,
            parts: [
                {
                    part: 'Part 1: Listening to the audio',
                    audio: traffic3,
                    eng: 'A girl was going to school on a bus. It was rush hour, cars and motorbikes were bustling on the road, while buses were pulling over to the curb to pick up passengers. Suddenly, she heard a buzzing overhead. Looking up, she noticed an airplane flying in the sky. She thought that if each type of vehicle had as much space to move as that, the traffic situation would be greatly improved.',
                    vie: 'Một cô gái đang trên đường đến trường bằng xe buýt. Vào giờ cao điểm, xe ô tô và xe máy tấp nập trên đường, còn xe buýt thì dừng lại bên lề để đón hành khách. Đột nhiên, cô nghe thấy tiếng rè rè trên đầu. Nhìn lên, cô thấy một chiếc máy bay đang bay trên bầu trời. Cô nghĩ rằng nếu mỗi loại phương tiện có không gian để di chuyển giống như chiếc máy bay kia, tình trạng giao thông sẽ được cải thiện rất nhiều'
                },
                {
                    part: 'Part 2: New words',
                    audio: rushhourmp3,
                    eng: (
                        <>
                            <h4>rush hour</h4>
                            <p>(noun) /ˈrʌʃ ˌaʊr/</p>
                        </>
                    ),
                    vie: (
                        <h4>
                            giờ cao điểm
                        </h4>
                    )
                },
                {
                    part: 'Part 2: New words',
                    audio: car,
                    eng: (
                        <>
                            <h4>car</h4>
                            <p>(noun) /kɑːr/</p>
                        </>
                    ),
                    vie: (
                        <h4>xe ô tô</h4>
                    )
                },
                {
                    part: 'Part 2: New words',
                    audio: bus,
                    eng: (
                        <>
                            <h4>bus</h4>
                            <p>(noun) /bʌs/</p>
                        </>
                    ),
                    vie: (
                        <h4>xe buýt</h4>
                    )
                },
                {
                    part: 'Part 2: New words',
                    audio: airplane,
                    eng: (
                        <>
                            <h4>airplane</h4>
                            <p>(noun) /ˈer.pleɪn/</p>
                        </>
                    ),
                    vie: (
                        <h4>máy bay</h4>
                    )
                },
                {
                    part: 'Part 3: Practice',
                    audio: traffic3practice,
                    eng: (
                        <p>Now let's practice with NAVEE!</p>
                    ),
                    vie: (
                        <p>Hãy cùng luyện tập với NAVEE nhé!</p>
                    )
                }
            ]
        }
    ]

    const { lessonId } = useParams();
    const [currentLesson, setCurrentLesson] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Update lesson data based on lessonId
    useEffect(() => {
        const lesson = lessons.find(lesson => lesson.id === parseInt(lessonId));
        console.log(lessonId)
        if (lesson) {

            setCurrentLesson(lesson);
        }
    }, [lessonId]);

    const handleNext = () => {
        if (currentIndex < currentLesson.parts.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    // Ensure that useEffect hooks are always called
    useEffect(() => {
        const timer = setTimeout(() => {
            if (audioRef.current) {
                audioRef.current.load();
                audioRef.current.addEventListener('canplaythrough', () => {
                    audioRef.current.play();
                });
            }
        }, 500);

        return () => {
            clearTimeout(timer);
        };
    }, [currentIndex]);

    if (!currentLesson) {
        return <div>Loading...</div>; // Conditional rendering, but hooks are not affected
    }

    const currentPart = currentLesson.parts[currentIndex];

    return (
        <>
            <div
                className="d-flex align-items-center p-3 text-start"
                onClick={() => navigate('/learn/1')}
                style={{ cursor: 'pointer' }}
            >
                <FaArrowLeft className="mr-2" />
                <span className='px-3 fs-5'>Trở lại trang học tập</span>
            </div>
            <h2 className='mt-1'>{currentLesson.title}</h2>
            <div className="container border rounded border-info border-2 w-full h-full mt-3" style={{ padding: '20px' }}>
                <h3 className='text-start'>{currentPart.part}</h3>
                <Row gutter={[16, 16]} align="top">
                    <Col xs={24} sm={24} md={11} className="w-full">
                        <Card title="Audio Player" bordered={false}>
                            <div>
                                <audio ref={audioRef} controls>
                                    <source src={currentPart.audio} type="audio/mp3" />
                                    Your browser does not support the audio element.
                                </audio>
                            </div>
                            <div className='mt-4'>
                                <img
                                    alt='traffic-jam'
                                    src={currentLesson.img}
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
                            <h5 className="text-start">Tiếng Anh:</h5>
                            <p className="text-start">
                                {currentPart.eng}
                            </p>
                            <h5 className="text-start">Dịch nghĩa</h5>
                            <p className="text-start">
                                {currentPart.vie}
                            </p>
                        </Card>
                    </Col>
                </Row>
            </div>

            <div className="text-center mt-2">
                <Button
                    onClick={handlePrevious}
                    disabled={currentIndex === 0}
                    className="px-5 py-4 btn-lg btn-primary"
                >
                    Trước
                </Button>
                <span className="px-3"></span>
                <Button
                    onClick={handleNext}
                    disabled={currentIndex === currentLesson.parts.length - 1}
                    className="px-5 py-4 btn-lg btn-success"
                >
                    Sau
                </Button>
                <span className="px-3"></span>
                <Button
                    onClick={() => navigate(`/game/${lessonId}`)}
                    className="px-5 py-4 btn-lg btn-warning"
                >
                    Đoán từ
                </Button>
            </div>
        </>
    );
};

export default Lesson;
