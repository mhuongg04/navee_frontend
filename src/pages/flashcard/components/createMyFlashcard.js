import React, { useState, useEffect } from 'react';
import { getAllVocabs } from '../../(teacher)/vocab-management/api/uploadVocab.api';
import { userCreateFlashcard } from '../api/createFlashcard.api';
import { Input, Form, Modal, Button, notification, Select } from 'antd';

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

    // const toggleVocabSelection = (vocabId) => {
    //     setChoosedVocabs((prev) =>
    //         prev.includes(vocabId) ? prev.filter((id) => id !== vocabId) : [...prev, vocabId]
    //     );
    // };


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
            notification.success({
                message: "Tạo flashcard thành công",
                duration: 2
            })
            handleClose();
        } catch (error) {
            console.error("Lỗi khi tạo flashcard", error);
            notification.error({
                message: "Tạo flashcard thất bại",
                duration: 2
            })
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Button
                size="large"
                style={{
                    fontSize: "20px",
                }}
                className="rounded-3"
                type='primary'
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
                    <Form.Item label="Chọn từ vựng" required>
                        <Select
                            mode="multiple"
                            value={choosedVocabs}
                            options={vocabList.map((vocab) => ({
                                label: vocab.english,
                                value: vocab.id
                            }))}
                            onChange={setChoosedVocabs}>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default CreateMyFlashcardButton