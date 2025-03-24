import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FlashcardComponent from '../../../components/flashcardData';
import { Flex, Button } from 'antd';
import { getFlashcardData } from '../api/getFlashcard.api';


const FlashcardViewer = () => {

    const navigate = useNavigate();
    const { flashcard_id } = useParams();
    const [flashcardData, setFlashcardData] = useState([]);
    const [, setLoading] = useState(false);

    //console.log("Flashcard id: ", flashcard_id);

    const fetchFlashcardData = async () => {
        setLoading(true);
        try {
            let data = await getFlashcardData(flashcard_id);
            //console.log(data.data[0])
            if (!data || data.length === 0) {
                setFlashcardData([]);
                return;
            }
            setFlashcardData(data.data)
        }
        catch (error) {
            console.error("Không tìm thấy dữ liệu flashcard", error);
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchFlashcardData();
        // console.log(flashcardData);
    }, [flashcard_id])

    return (
        <Flex align="center" justify="center" style={{ height: "100vh", backgroundColor: "#f5f5f5", position: "relative" }}>
            <Button
                type="link"
                onClick={() => navigate("/flashcard")}
                style={{ position: "absolute", top: 20, left: 20, fontSize: 24, fontWeight: "bold", color: "#093673" }}
            >
                &lt; Quay lại
            </Button>
            <FlashcardComponent flashcardData={flashcardData} addFlashcard={false} />
        </Flex >
    )
}

export default FlashcardViewer;