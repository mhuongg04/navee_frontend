import React, { useState, useRef } from 'react';
import { List, Card, Input, Modal } from 'antd';
import MasterLayout from '../../layouts/MasterLayout/masterlayout';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { SearchOutlined, CloseOutlined } from '@ant-design/icons';
import { FaVolumeUp } from "react-icons/fa";

import trafficjam from '../../assets/mp3/vocab/trafficjam.mp3';
import pedestrian from '../../assets/mp3/vocab/pedestrian.mp3';
import passenger from '../../assets/mp3/vocab/passenger.mp3';
import seatbelt from '../../assets/mp3/vocab/seatbelt.mp3';
import bumpy from '../../assets/mp3/vocab/bumpy.mp3';
import motorbike from '../../assets/mp3/vocab/motorbike.mp3';
import rushhourmp3 from '../../assets/mp3/vocab/rushhour.mp3';
import handlebar from '../../assets/mp3/vocab/handlebar.mp3';
import vehicle from '../../assets/mp3/vocab/vehicle.mp3';
import trafficlaw from '../../assets/mp3/vocab/trafficlaw.mp3';
import pavement from '../../assets/mp3/vocab/pavement.mp3';
import car from '../../assets/mp3/vocab/car.mp3';
import bus from '../../assets/mp3/vocab/bus.mp3';
import airplane from '../../assets/mp3/vocab/airplane.mp3';
import doctor from '../../assets/mp3/vocab/doctor.mp3';
import sunny from '../../assets/mp3/vocab/sunny.mp3';
//data mẫu
const data = [
    {
        id: 1,
        topicId: 1,
        pronounce: '(noun) /ˈtræf.ɪk ˌdʒæm/',
        vocab: 'traffic jam',
        translation: 'tắc đường',
        mp3: trafficjam,
        description: 'Tình trạng giao thông bị ùn tắc, các phương tiện không thể di chuyển dễ dàng.',
        example: 'I was late because of a traffic jam.'
    },
    {
        id: 2,
        topicId: 1,
        pronounce: '(noun) /pəˈdes.tri.ən/',
        vocab: 'pedestrian',
        translation: 'người đi bộ',
        mp3: pedestrian,
        description: 'Người tham gia giao thông đi bằng chân.',
        example: 'Pedestrians should use the sidewalk.'
    },
    {
        id: 3,
        topicId: 1,
        pronounce: '(noun) /ˈpæs.ən.dʒɚ/',
        vocab: 'passenger',
        translation: 'hành khách',
        mp3: passenger,
        description: 'Người di chuyển trên phương tiện giao thông nhưng không phải là tài xế.',
        example: 'The passengers boarded the train.'
    },
    {
        id: 4,
        topicId: 1,
        pronounce: '(noun) /ˈsiːt ˌbelt/',
        vocab: 'seat belt',
        translation: 'dây an toàn',
        mp3: seatbelt,
        description: 'Dây dùng để bảo vệ an toàn khi ngồi trên ô tô hoặc máy bay.',
        example: 'Please fasten your seat belt.'
    },
    {
        id: 5,
        topicId: 1,
        pronounce: '(adjective) /ˈbʌm.pi/',
        vocab: 'bumpy',
        translation: 'gập ghềnh',
        mp3: bumpy,
        description: 'Mô tả bề mặt đường không bằng phẳng, có nhiều gợn sóng.',
        example: 'The road was bumpy and hard to drive on.'
    },
    {
        id: 6,
        topicId: 1,
        pronounce: '(noun) /ˈviː.ə.kəl/',
        vocab: 'vehicle',
        translation: 'phương tiện giao thông',
        mp3: vehicle,
        description: 'Các phương tiện được sử dụng để di chuyển trên đường.',
        example: 'Cars, buses, and bikes are types of vehicles.'
    },
    {
        id: 7,
        topicId: 1,
        pronounce: '(noun) /ˈmoʊ.t̬ɚ.baɪk/',
        vocab: 'motorbike',
        translation: 'xe máy',
        mp3: motorbike,
        description: 'Phương tiện di chuyển hai bánh sử dụng động cơ.',
        example: 'He rides a motorbike to work.'
    },
    {
        id: 8,
        topicId: 1,
        pronounce: '(noun) /ˈpeɪv.mənt/',
        vocab: 'pavement',
        translation: 'vỉa hè',
        mp3: pavement,
        description: 'Lối đi dành cho người đi bộ bên lề đường.',
        example: 'Walk on the pavement for safety.'
    },
    {
        id: 9,
        topicId: 1,
        pronounce: '(noun) /ˈtræf.ɪk lɑː/',
        vocab: 'Traffic Law',
        translation: 'Luật giao thông',
        mp3: trafficlaw,
        description: 'Bộ quy tắc quy định hành vi của người tham gia giao thông.',
        example: 'Everyone must follow the traffic laws.'
    },
    {
        id: 10,
        topicId: 1,
        pronounce: '(noun) /ˈhæn.dəl.bɑːr/',
        vocab: 'handlebar',
        translation: 'tay lái',
        mp3: handlebar,
        description: 'Bộ phận điều khiển hướng của xe đạp hoặc xe máy.',
        example: 'Hold the handlebar tightly while riding.'
    },
    {
        id: 11,
        topicId: 1,
        pronounce: '(noun) /ˈrʌʃ ˌaʊr/',
        vocab: 'rush hour',
        translation: 'giờ cao điểm',
        mp3: rushhourmp3,
        description: 'Thời điểm mà lượng giao thông đông đúc nhất trong ngày.',
        example: 'Try to avoid traveling during rush hour.'
    },
    {
        id: 12,
        topicId: 1,
        pronounce: '(noun) /kɑːr/',
        vocab: 'car',
        translation: 'xe ô tô',
        mp3: car,
        description: 'Phương tiện giao thông bốn bánh chạy bằng động cơ.',
        example: 'She bought a new car yesterday.'
    },
    {
        id: 13,
        topicId: 1,
        pronounce: '(noun) /bʌs/',
        vocab: 'bus',
        translation: 'xe buýt',
        mp3: bus,
        description: 'Phương tiện giao thông công cộng chở nhiều hành khách.',
        example: 'The bus stops at the next corner.'
    },
    {
        id: 14,
        topicId: 1,
        pronounce: '(noun) /ˈer.pleɪn/',
        vocab: 'airplane',
        translation: 'máy bay',
        mp3: airplane,
        description: 'Phương tiện giao thông bay trên không.',
        example: 'The airplane landed safely.'
    },
    {
        id: 15,
        topicId: 3,
        pronounce: 'doctor',
        vocab: 'doctor',
        translation: 'bác sĩ',
        mp3: doctor,
        description: 'Người chuyên khám và chữa bệnh cho bệnh nhân.',
        example: 'She is a doctor at the local hospital.'
    },
    {
        id: 16,
        topicId: 3,
        pronounce: 'engineer',
        vocab: 'engineer',
        translation: 'kỹ sư',
        mp3: '',
        description: '',
        example: ''
    },
    {
        id: 17,
        topicId: 3,
        pronounce: 'teacher',
        vocab: 'teacher',
        translation: 'giáo viên',
        mp3: '',
        description: '',
        example: ''
    },
    {
        id: 18,
        topicId: 3,
        pronounce: 'scientist',
        vocab: 'scientist',
        translation: 'nhà khoa học',
        mp3: '',
        description: '',
        example: ''
    },
    {
        id: 19,
        topicId: 2,
        pronounce: 'sunny',
        vocab: 'sunny',
        translation: 'nhiều nắng',
        mp3: sunny,
        description: '',
        example: ''
    },
    {
        id: 20,
        topicId: 2,
        pronounce: 'cloudy',
        vocab: 'cloudy',
        translation: 'nhiều mây',
        mp3: '',
        description: '',
        example: ''
    },
]



const { Search } = Input;

const Dictionary = () => {
    const [filteredData, setFilteredData] = useState(data);
    const [alphabet, setAlphabet] = useState("");
    const [searchTerm, setSearchTerm] = useState('');
    const [topic, setTopic] = useState(null);
    const navigate = useNavigate();
    const [current, setCurrent] = useState(1); // Trang hiện tại
    const pageSize = 15;
    // const [audioRef, setAudioRef] = useState(null);

    const playAudio = (word) => {
        let audio = new Audio(word.mp3);
        audio.play();
    };


    const filterData = (topic, alphabet, searchTerm) => {
        let filtered = data;

        // Lọc theo chủ đề (topic)
        if (topic) {
            filtered = filtered.filter(item => item.topicId === parseInt(topic, 10));
        }

        // Lọc theo bảng chữ cái (alphabet)
        if (alphabet) {
            filtered = filtered.filter(item => item.vocab[0].toLowerCase() === alphabet.toLowerCase());
        }

        if (searchTerm) {
            filtered = filtered.filter(item =>
                item.vocab.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.translation.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        setFilteredData(filtered);
    };

    const paginatedData = filteredData.slice(
        (current - 1) * pageSize,
        current * pageSize
    );

    const handleTopicChange = (value) => {
        setTopic(value);
        filterData(value, alphabet, searchTerm);  // Lọc lại dữ liệu khi thay đổi chủ đề
    };

    const handleAlphabetChange = (value) => {
        setAlphabet(value);
        filterData(topic, value, searchTerm);  // Lọc lại dữ liệu khi thay đổi bảng chữ cái
    };

    const onSearch = (value) => {
        setCurrent(1);
        filterData(topic, alphabet, value);
    };

    const cancelSearch = () => {
        setSearchTerm('');
        filterData(topic, alphabet, '');

    }

    const isMobile = useMediaQuery({ maxWidth: 767 });
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedWord, setSelectedWord] = useState(null);

    // Hàm mở Modal
    const handleCardClick = (word) => {
        setSelectedWord(word); // Lưu thông tin từ được chọn
        setIsModalVisible(true); // Hiển thị Modal
    };

    const handleModalClose = () => {
        setIsModalVisible(false); // Ẩn Modal
        setSelectedWord(null); // Reset từ đã chọn
    };


    return (
        <MasterLayout>
            <h1>TỪ ĐIỂN</h1>
            <div className="d-flex align-items-center justify-content-center gap-2 border rounded p-5" style={{ backgroundColor: '#e0f7fa' }}>
                <div style={{ width: '150px' }}>
                    <label htmlFor="vocab" className="form-label fw-bold text-gray-700">Chủ đề</label>
                    <select
                        value={topic}
                        onChange={(e) => handleTopicChange(e.target.value)}
                        className="form-select border-third p-2"
                    >
                        <option value="">All</option>
                        <option value="1">Traffic Jam</option>
                        <option value="2">Weather</option>
                        <option value="3">Jobs</option>

                    </select>
                </div>
                <div style={{ width: '150px' }}>
                    <label htmlFor="vocab" className="form-label fw-bold text-gray-700">Bảng chữ cái</label>
                    <select
                        value={alphabet}
                        onChange={(e) => handleAlphabetChange(e.target.value)}
                        className="form-select border-third p-2"
                    >
                        <option value="">All</option>
                        <option value="a">A</option>
                        <option value="b">B</option>
                        <option value="c">C</option>
                        <option value="d">D</option>
                        <option value="e">E</option>
                        <option value="f">F</option>
                        <option value="g">G</option>
                        <option value="h">H</option>
                        <option value="i">I</option>
                        <option value="k">K</option>
                        <option value="L">L</option>
                        <option value="M">M</option>
                        <option value="n">N</option>
                        <option value="o">O</option>
                        <option value="p">P</option>
                        <option value="q">Q</option>
                        <option value="r">R</option>
                        <option value="s">S</option>
                        <option value="t">T</option>
                        <option value="u">U</option>
                        <option value="v">V</option>
                        <option value="w">W</option>
                        <option value="x">X</option>
                        <option value="y">Y</option>
                        <option value="z">Z</option>

                    </select>
                </div>
                <div>
                    <div><label htmlFor="topic" className="form-label fw-bold text-gray-700 ">Tìm kiếm từ</label></div>
                    <Search
                        placeholder="Nhập từ cần tra cứu"
                        style={{
                            width: "30rem"
                        }}
                        enterButton="Tìm"
                        size="large"
                        onChange={(e) => setSearchTerm(e.target.value)}
                        suffix={

                            searchTerm ? (
                                <CloseOutlined onClick={cancelSearch} style={{ cursor: 'pointer' }} />  // Hiển thị dấu "x" khi có từ tìm kiếm
                            ) : (
                                <SearchOutlined />  // Hiển thị biểu tượng tìm kiếm khi không có từ tìm kiếm
                            )
                        }

                        onSearch={onSearch}
                    />
                </div>

            </div>
            {/* <List
          className="custom-scrollbar mt-4 max-h-[450px] overflow-y-auto pb-4"
          loading={isLoading}
          itemLayout="horizontal"
          dataSource={listTopic}
          bordered
          renderItem={(topic) => (
            <List.Item>
              <Skeleton avatar pronounce={false} loading={isLoading} active>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      className="mt-1"
                      size={50}
                      src={topic?.image}
                    />
                  }
                  pronounce={
                    <div className="mt-3 text-base font-semibold">
                      {topic?.vocab}
                    </div>
                  }
                />
              </Skeleton>
            </List.Item>)}
        /> */}
            <List
                className="mt-4 max-h-[450px] overflow-y-auto pb-2"
                grid={{ gutter: 16, column: isMobile ? 1 : isTablet ? 2 : 5 }}
                dataSource={paginatedData}
                renderItem={(item) => (
                    <List.Item>
                        <Card
                            onClick={() => handleCardClick(item)}
                            className="bg-white text-dark border shadow-sm"
                            style={{
                                cursor: "pointer",
                                borderRadius: "10px", // Bo góc card
                                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Bóng mờ
                                height: "9rem"
                            }}
                        >

                            <h3>{item.vocab}</h3>
                            <h4 style={{ color: "blue" }}>{item.translation}</h4>
                        </Card>
                    </List.Item>
                )}
                pagination={{
                    current,
                    pageSize,
                    total: filteredData.length,
                    onChange: (page) => setCurrent(page),
                    showSizeChanger: false,
                }}
            />

            <Modal
                title="Vocabulary"
                visible={isModalVisible} // Điều khiển hiển thị
                onCancel={handleModalClose} // Đóng Modal
                footer={null} // Ẩn nút footer
            >
                {selectedWord && ( // Hiển thị chi tiết khi từ được chọn
                    <>
                        <div className='d-flex mr-3'>
                            <h3>{selectedWord.vocab}</h3>
                            <div onClick={playAudio(selectedWord)}>
                                <FaVolumeUp
                                    style={{ cursor: "pointer", width: "3rem", fontSize: "1.5rem" }}
                                    className='pt-1'
                                />
                            </div>
                        </div>
                        <h4>{selectedWord.pronounce}</h4>
                        <h4 style={{ color: "blue" }}>{selectedWord.translation}</h4>
                        <h5>Description</h5>
                        <p>{selectedWord.description}</p>
                        <h5>Example</h5>
                        <p>{selectedWord.example}</p>
                    </>
                )}
            </Modal>

        </MasterLayout >
    )
}

export default Dictionary