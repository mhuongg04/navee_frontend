import React, { useState, useEffect } from 'react';
import { getAllVocabs } from '../../(teacher)/vocab-management/api/uploadVocab.api';
import { userCreateFlashcard } from '../api/createFlashcard.api';
import { Input, Form, Modal, Button } from 'antd';
import { ListGroup } from 'react-bootstrap';

const CreateMyFlashcardButton = () => {
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [vocabList, setVocabList] = useState([]);
    const [title, setTitle] = useState("");
    const [choosedVocabs, setChoosedVocabs] = useState([]);

    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false);
        setTitle("");
        setChoosedVocabs([]);
        setLoading(false);
    }

    useEffect(() => {
        const fetchVocabs = async () => {
            try {
                const { data } = await getAllVocabs();
                setVocabList(data.data);
            }
            catch (error) {
                console.error("Lỗi khi lấy danh sách từ vựng", error)
            }
        }

        fetchVocabs();

    }, []);

    const toggleVocabSelection = (vocabId) => {
        setChoosedVocabs((prev) =>
            prev.includes(vocabId) ? prev.filter((id) => id !== vocabId) : [...prev, vocabId]
        );
    };

    const handleSave = async () => {
        if (!title.trim() || choosedVocabs.length === 0) {
            alert("Vui lòng nhập tiêu đề và chọn ít nhất một từ vựng.");
            return;
        }

        setLoading(true);
        try {
            await userCreateFlashcard({
                title,
                vocabs: choosedVocabs
            })
            alert("Flashcard đã được tạo!");
            handleClose();
        } catch (error) {
            console.error("Lỗi khi tạo flashcard", error);
            alert("Có lỗi xảy ra, vui lòng thử lại.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Button
                size="large"
                style={{
                    backgroundColor: "#093673",
                    color: "white",
                    border: "none",
                    fontSize: "24px",
                    padding: "16px 16px",
                }}
                className="rounded-3"
                onClick={handleShow}
            >
                + Tạo Flashcard
            </Button>

            <Modal
                open={show}
                onCancel={handleClose}
                onOk={handleSave}
                confirmLoading={loading}
                title="Tạo Flashcard của tôi"
                centered
                width={800}>
                <Form layout="vertical">
                    <Form.Item lable="Tên Flashcard" required>
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Nhập tiêu đề..."
                        />
                    </Form.Item>
                    <h5>Chọn từ vựng:</h5>
                    <ListGroup style={{ maxHeight: "300px", overflowY: "auto" }}>
                        {vocabList.map((vocab) => (
                            <ListGroup.Item
                                key={vocab.id}
                                onClick={() => toggleVocabSelection(vocab.id)}
                                active={choosedVocabs.includes(vocab.id)}
                                style={{ cursor: "pointer" }}
                            >
                                {vocab.english}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Form>
            </Modal>
        </>
    )
}

export default CreateMyFlashcardButton