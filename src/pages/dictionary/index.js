// import React, { useState, useRef } from 'react';
// import { List, Card, Input, Modal } from 'antd';
// import MasterLayout from '../../layouts/MasterLayout/masterlayout';
// import { useNavigate } from 'react-router-dom';
// import { useMediaQuery } from 'react-responsive';
// import { SearchOutlined, CloseOutlined } from '@ant-design/icons';
// import { FaVolumeUp } from "react-icons/fa";
// import { useEffect } from 'react';
// import { getAllVocabs } from '../(teacher)/vocab-management/api/uploadVocab.api';


// const { Search } = Input;

// const Dictionary = () => {
//     const [filteredData, setFilteredData] = useState(data);
//     const [alphabet, setAlphabet] = useState("");
//     const [searchTerm, setSearchTerm] = useState('');
//     const [topic, setTopic] = useState(null);
//     const navigate = useNavigate();
//     const [current, setCurrent] = useState(1); // Trang hiện tại
//     const pageSize = 15;
//     // const [audioRef, setAudioRef] = useState(null);

//     const playAudio = (word) => {
//         let audio = new Audio(word.mp3);
//         audio.play();
//     };

//     useEffect(() => {
//         const fetchVocabs = async () => {
//             try {
//                 const res = await getAllVocabs
//             }
//         }
//     }, [listVocabs])


//     const filterData = (topic, alphabet, searchTerm) => {
//         let filtered = data;

//         // Lọc theo chủ đề (topic)
//         if (topic) {
//             filtered = filtered.filter(item => item.topicId === parseInt(topic, 10));
//         }

//         // Lọc theo bảng chữ cái (alphabet)
//         if (alphabet) {
//             filtered = filtered.filter(item => item.vocab[0].toLowerCase() === alphabet.toLowerCase());
//         }

//         if (searchTerm) {
//             filtered = filtered.filter(item =>
//                 item.vocab.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                 item.translation.toLowerCase().includes(searchTerm.toLowerCase())
//             );
//         }
//         setFilteredData(filtered);
//     };

//     const paginatedData = filteredData.slice(
//         (current - 1) * pageSize,
//         current * pageSize
//     );

//     const handleTopicChange = (value) => {
//         setTopic(value);
//         filterData(value, alphabet, searchTerm);  // Lọc lại dữ liệu khi thay đổi chủ đề
//     };

//     const handleAlphabetChange = (value) => {
//         setAlphabet(value);
//         filterData(topic, value, searchTerm);  // Lọc lại dữ liệu khi thay đổi bảng chữ cái
//     };

//     const onSearch = (value) => {
//         setCurrent(1);
//         filterData(topic, alphabet, value);
//     };

//     const cancelSearch = () => {
//         setSearchTerm('');
//         filterData(topic, alphabet, '');

//     }

//     const isMobile = useMediaQuery({ maxWidth: 767 });
//     const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });

//     const [isModalVisible, setIsModalVisible] = useState(false);
//     const [selectedWord, setSelectedWord] = useState(null);

//     // Hàm mở Modal
//     const handleCardClick = (word) => {
//         setSelectedWord(word); // Lưu thông tin từ được chọn
//         setIsModalVisible(true); // Hiển thị Modal
//     };

//     const handleModalClose = () => {
//         setIsModalVisible(false); // Ẩn Modal
//         setSelectedWord(null); // Reset từ đã chọn
//     };


//     return (
//         <MasterLayout>
//             <h1>TỪ ĐIỂN</h1>
//             <div className="d-flex align-items-center justify-content-center gap-2 border rounded p-5" style={{ backgroundColor: '#e0f7fa' }}>
//                 <div style={{ width: '150px' }}>
//                     <label htmlFor="vocab" className="form-label fw-bold text-gray-700">Chủ đề</label>
//                     <select
//                         value={topic}
//                         onChange={(e) => handleTopicChange(e.target.value)}
//                         className="form-select border-third p-2"
//                     >
//                         <option value="">All</option>
//                         <option value="1">Traffic Jam</option>
//                         <option value="2">Weather</option>
//                         <option value="3">Jobs</option>

//                     </select>
//                 </div>
//                 <div style={{ width: '150px' }}>
//                     <label htmlFor="vocab" className="form-label fw-bold text-gray-700">Bảng chữ cái</label>
//                     <select
//                         value={alphabet}
//                         onChange={(e) => handleAlphabetChange(e.target.value)}
//                         className="form-select border-third p-2"
//                     >
//                         <option value="">All</option>
//                         <option value="a">A</option>
//                         <option value="b">B</option>
//                         <option value="c">C</option>
//                         <option value="d">D</option>
//                         <option value="e">E</option>
//                         <option value="f">F</option>
//                         <option value="g">G</option>
//                         <option value="h">H</option>
//                         <option value="i">I</option>
//                         <option value="k">K</option>
//                         <option value="L">L</option>
//                         <option value="M">M</option>
//                         <option value="n">N</option>
//                         <option value="o">O</option>
//                         <option value="p">P</option>
//                         <option value="q">Q</option>
//                         <option value="r">R</option>
//                         <option value="s">S</option>
//                         <option value="t">T</option>
//                         <option value="u">U</option>
//                         <option value="v">V</option>
//                         <option value="w">W</option>
//                         <option value="x">X</option>
//                         <option value="y">Y</option>
//                         <option value="z">Z</option>

//                     </select>
//                 </div>
//                 <div>
//                     <div><label htmlFor="topic" className="form-label fw-bold text-gray-700 ">Tìm kiếm từ</label></div>
//                     <Search
//                         placeholder="Nhập từ cần tra cứu"
//                         style={{
//                             width: "30rem"
//                         }}
//                         enterButton="Tìm"
//                         size="large"
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                         suffix={

//                             searchTerm ? (
//                                 <CloseOutlined onClick={cancelSearch} style={{ cursor: 'pointer' }} />  // Hiển thị dấu "x" khi có từ tìm kiếm
//                             ) : (
//                                 <SearchOutlined />  // Hiển thị biểu tượng tìm kiếm khi không có từ tìm kiếm
//                             )
//                         }

//                         onSearch={onSearch}
//                     />
//                 </div>

//             </div>
//             {/* <List
//           className="custom-scrollbar mt-4 max-h-[450px] overflow-y-auto pb-4"
//           loading={isLoading}
//           itemLayout="horizontal"
//           dataSource={listTopic}
//           bordered
//           renderItem={(topic) => (
//             <List.Item>
//               <Skeleton avatar pronounce={false} loading={isLoading} active>
//                 <List.Item.Meta
//                   avatar={
//                     <Avatar
//                       className="mt-1"
//                       size={50}
//                       src={topic?.image}
//                     />
//                   }
//                   pronounce={
//                     <div className="mt-3 text-base font-semibold">
//                       {topic?.vocab}
//                     </div>
//                   }
//                 />
//               </Skeleton>
//             </List.Item>)}
//         /> */}
//             <List
//                 className="mt-4 max-h-[450px] overflow-y-auto pb-2"
//                 grid={{ gutter: 16, column: isMobile ? 1 : isTablet ? 2 : 5 }}
//                 dataSource={paginatedData}
//                 renderItem={(item) => (
//                     <List.Item>
//                         <Card
//                             onClick={() => handleCardClick(item)}
//                             className="bg-white text-dark border shadow-sm"
//                             style={{
//                                 cursor: "pointer",
//                                 borderRadius: "10px", // Bo góc card
//                                 boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Bóng mờ
//                                 height: "9rem"
//                             }}
//                         >

//                             <h3>{item.vocab}</h3>
//                             <h4 style={{ color: "blue" }}>{item.translation}</h4>
//                         </Card>
//                     </List.Item>
//                 )}
//                 pagination={{
//                     current,
//                     pageSize,
//                     total: filteredData.length,
//                     onChange: (page) => setCurrent(page),
//                     showSizeChanger: false,
//                 }}
//             />

//             <Modal
//                 title="Vocabulary"
//                 visible={isModalVisible} // Điều khiển hiển thị
//                 onCancel={handleModalClose} // Đóng Modal
//                 footer={null} // Ẩn nút footer
//             >
//                 {selectedWord && ( // Hiển thị chi tiết khi từ được chọn
//                     <>
//                         <div className='d-flex mr-3'>
//                             <h3>{selectedWord.vocab}</h3>
//                             <div onClick={playAudio(selectedWord)}>
//                                 <FaVolumeUp
//                                     style={{ cursor: "pointer", width: "3rem", fontSize: "1.5rem" }}
//                                     className='pt-1'
//                                 />
//                             </div>
//                         </div>
//                         <h4>{selectedWord.pronounce}</h4>
//                         <h4 style={{ color: "blue" }}>{selectedWord.translation}</h4>
//                         <h5>Description</h5>
//                         <p>{selectedWord.description}</p>
//                         <h5>Example</h5>
//                         <p>{selectedWord.example}</p>
//                     </>
//                 )}
//             </Modal>

//         </MasterLayout >
//     )
// }

// export default Dictionary