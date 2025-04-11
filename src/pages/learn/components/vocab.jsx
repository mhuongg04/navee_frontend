import React, { useEffect, useState } from 'react';
import FlashcardComponent from '../../../components/flashcardData';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { getVocabByLessonId } from '../api/getLessonVocab.api';
import { FaArrowLeft } from 'react-icons/fa';
import { Flex } from 'antd';

const LessonVocab = () => {

    const location = useLocation();
    const [vocabData, setVocabData] = useState([]);
    const [, setLoading] = useState(false);
    const navigate = useNavigate();
    const { lessonId } = useParams();
    const topic_id = location.state?.topic_id;

    //Lấy danh sách từ vựng
    useEffect(() => {
        const fetchVocabByLessonId = async () => {
            setLoading(true);
            try {
                const data = await getVocabByLessonId(lessonId);
                if (!data || data.length === 0) {
                    return;
                }
                setVocabData(data.data)
            }
            catch (error) {
                console.error("Không tìm thấy từ vựng theo lesson ID", error);
            }
            finally {
                setLoading(false);
            }
        }

        fetchVocabByLessonId();

    }, [lessonId]);

    return (
        <Flex
            align="center"
            justify="center"
            style={{
                height: "100vh",
                backgroundColor: "#f5f5f5",
                position: "relative",
                padding: '10px', // Thêm padding để tránh việc các phần tử bị chèn sát vào các cạnh màn hình
            }}
        >
            <div
                className="text-start"
                onClick={() => navigate(-1, { state: { topic_id } })}
                style={{
                    cursor: 'pointer',
                    position: "absolute",
                    top: 20,
                    left: 20,
                    display: "flex",
                    alignItems: "center",
                    zIndex: 10,
                }}
            >
                <FaArrowLeft className="mr-2" />
                <span className='px-3 fs-5'>Trở lại trang học tập</span>
            </div>

            <FlashcardComponent flashcardData={vocabData} addFlashcard={true} />
        </Flex>
    )
}

export default LessonVocab;