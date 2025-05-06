import React, { useState, useEffect } from 'react';
import { getAllVocabs } from '../../(teacher)/vocab-management/api/uploadVocab.api';
import { Input, Form, Modal, notification, Select } from 'antd';
import editFlashcard from '../api/editFlashcard.api';

const EditMyFlashcardModal = ({ isShow, flashcard_id, curTitle, curVocabs, onClose }) => {
    const [show, setShow] = useState(isShow);
    const [loading, setLoading] = useState(false);
    const [vocabList, setVocabList] = useState([]);
    const [title, setTitle] = useState(curTitle);
    const [choosedVocabs, setChoosedVocabs] = useState(curVocabs);

    useEffect(() => {
        console.log("Current vocabs: ", curVocabs);
        setTitle(curTitle);
        setChoosedVocabs(curVocabs.map((vocab) => vocab.id));
    }, [curTitle, curVocabs]);

    const handleClose = (e) => {
        e.stopPropagation();
        onClose();
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

    useEffect(() => {
        console.log("Current vocabs: ", curVocabs);
        setTitle(curTitle);
        setChoosedVocabs(curVocabs.map((vocab) => vocab.id)); // Lưu id từ vựng đã chọn
    }, [curTitle, curVocabs]);

    useEffect(() => {
        setShow(isShow);
    }, [isShow]);

    // const toggleVocabSelection = (vocabId, e) => {
    //     e.stopPropagation();
    //     setChoosedVocabs((prev) =>
    //         prev.includes(vocabId) ? prev.filter((id) => id !== vocabId) : [...prev, vocabId]
    //     );
    // };

    const handleTitleChange = (e) => {
        e.stopPropagation();
        setTitle(e.target.value);
    };

    const handleSaveEditFlashcard = async (e) => {
        setLoading(true);
        e.stopPropagation();
        try {
            await editFlashcard(flashcard_id, title, { data: choosedVocabs });

            notification.success({
                message: "Sửa flashcard thành công!",
                duration: 2
            });
        }
        catch (error) {
            notification.error({
                message: "Không thể sửa flashcard",
                duration: 2
            })
        }
        finally {
            setLoading(false);
            handleClose(e);
        }
    }

    return (
        <>
            <Modal
                open={show}
                onCancel={handleClose}
                onOk={(e) => handleSaveEditFlashcard(e)}
                modalRender={(dom) => <div onClick={(e) => e.stopPropagation()}>{dom}</div>}
                confirmLoading={loading}
                title="Sửa Flashcard"
                centered
                width={800}>
                <Form layout="vertical">
                    <Form.Item label="Tên Flashcard" required>
                        <Input
                            value={title}
                            onClick={(e) => e.stopPropagation()}
                            onChange={handleTitleChange}
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
                            onClick={(e) => e.stopPropagation()}
                            onChange={setChoosedVocabs}>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default EditMyFlashcardModal