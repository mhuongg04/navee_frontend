import React, { useEffect, useState } from "react";
import { Button, Spin, Row, Col, Card, Typography, Flex, Modal, Form } from "antd";
import { FaVolumeUp } from "react-icons/fa";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { getMyFlashcard } from "../pages/flashcard/api/getFlashcard.api";
import { userAddVocabToFlashcard } from '../pages/flashcard/api/createFlashcard.api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { Title, Text } = Typography;

const FlashcardComponent = ({ flashcardData, addFlashcard }) => {

    const [index, setIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [loading, setLoading] = useState(false);
    const [myFcList, setMyFcList] = useState([]);
    const [currentVocab, setCurrentVocab] = useState(flashcardData[0]);
    const [currentAudio, setCurrentAudio] = useState(null);
    const [choosedFcId, setChoosedFcId] = useState("");
    const [show, setShow] = useState(false);

    useEffect(() => {
        setCurrentVocab(flashcardData[index]);
    }, [index, flashcardData]);

    useEffect(() => {
        return () => {
            if (currentAudio) {
                currentAudio.pause();
                currentAudio.currentTime = 0;
            }
        };
    }, [currentAudio]);

    const handleNext = () => {
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }
        if (index >= flashcardData.length - 1) return;
        setIndex((prev) => (prev + 1));
        setIsFlipped(false);
    };

    const handlePrev = () => {
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }
        if (index <= 0) return;
        setIndex((prev) => (prev - 1));
        setIsFlipped(false);
    };

    const handleShow = () => setShow(true);
    const handleClose = () => {
        setChoosedFcId("");
        setShow(false);
        setLoading(false);
    }

    const fetchListFlashcard = async () => {
        try {
            const data = await getMyFlashcard();
            setMyFcList(data.data);
        }
        catch (error) {
            console.error("Không thể lấy dữ liệu my flashcard");
        }
        finally {
            setLoading(false)
        }
    }

    const handlePlayAudio = (mp3Url) => {
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }
        const newAudio = new Audio(mp3Url);
        newAudio.play();
        setCurrentAudio(newAudio);
    }

    const handleAddVocabToFlashcard = async () => {
        console.log(currentVocab)
        setLoading(true);
        try {
            await userAddVocabToFlashcard({
                vocab_id: currentVocab.id,
                fc_id: choosedFcId
            });
            toast.success("Thêm từ vựng vào Flashcard thành công!");
        }
        catch (error) {
            toast.error("Không thể thêm từ vựng vào Flashcard!");
            console.error("Không thể thêm từ vựng vào Flashcard", error)
        }
        finally {
            setLoading(false);
        }

    }

    useEffect(() => {
        setLoading(true);
        fetchListFlashcard();
    }, []);

    return (
        <Flex align="center" justify="center" style={{ height: "100vh", backgroundColor: "#f5f5f5", position: "relative" }}>
            {loading ? (
                <Spin size="large" />
            ) : (
                <Flex vertical align="center">
                    <Row className="py-3" align="middle">{addFlashcard && <Button type="primary" style={{ fontSize: "18px" }} className="py-4" onClick={handleShow}>Thêm vào Flashcard</Button>}</Row>
                    <Row align="middle" gutter={24}>
                        <Col>
                            <Button shape="circle" icon={<LeftOutlined />} onClick={handlePrev} disabled={index === 0} />
                        </Col>

                        <Col>
                            <Card
                                hoverable
                                style={{
                                    width: 400,
                                    height: 250,
                                    textAlign: "center",
                                    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    cursor: "pointer",
                                }}
                                onClick={() => setIsFlipped(!isFlipped)}
                            >
                                {flashcardData[index] ? (
                                    !isFlipped ? (
                                        <Title level={1} style={{ fontWeight: "bold" }}>
                                            {flashcardData[index]?.english}
                                        </Title>
                                    ) : (
                                        <>
                                            <Title level={1} style={{ fontWeight: "bold" }}>
                                                {flashcardData[index]?.vietnamese}
                                            </Title>
                                            <Text type="secondary" style={{ fontSize: 18 }}>
                                                {flashcardData[index]?.description}
                                            </Text>
                                        </>
                                    )
                                ) : (
                                    <Title level={2}>Loading...</Title>
                                )}

                                {flashcardData[index]?.mp3 && (
                                    <FaVolumeUp
                                        style={{
                                            position: "absolute",
                                            bottom: 10,
                                            right: 10,
                                            fontSize: 24,
                                            cursor: "pointer",
                                            color: "#1890ff",
                                        }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handlePlayAudio(flashcardData[index].mp3);
                                        }}
                                    />
                                )}
                            </Card>
                        </Col>

                        <Col>
                            <Button
                                shape="circle"
                                icon={<RightOutlined />}
                                onClick={handleNext}
                                disabled={index >= flashcardData.length - 1}
                            />
                        </Col>
                    </Row>

                    <Text type="secondary" style={{ marginTop: 16, fontSize: 18 }}>
                        {flashcardData.length > 0 ? `${index + 1} / ${flashcardData.length}` : "Không có dữ liệu"}
                    </Text>
                </Flex>
            )}

            <Modal
                open={show}
                onCancel={handleClose}
                onOk={handleAddVocabToFlashcard}
                confirmLoading={loading}
                title="Thêm từ vựng vào Flashcard"
                centered
                width={600}
            >
                <Form style={{ fontSize: "18px" }} layout="vertical">
                    <Form.Item label="Chọn Flashcard" required>
                        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                            {myFcList.slice(0, 8).map((fc) => (
                                <Button
                                    key={fc.id}
                                    type={choosedFcId === fc.id ? "primary" : "default"}
                                    onClick={() => setChoosedFcId(fc.id)}
                                    style={{
                                        width: "100%",
                                        textAlign: "left",
                                        fontSize: "18px",
                                        padding: "15px 28px",
                                    }}
                                >
                                    {fc.title}
                                </Button>
                            ))}
                        </div>
                    </Form.Item>
                </Form>
            </Modal>
        </Flex>
    );
}

export default FlashcardComponent;