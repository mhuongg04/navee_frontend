import React, { useState, useEffect } from 'react';
import MasterLayout from '../../../../layouts/MasterLayout/masterlayout';
import { Button, Modal, Form, Input, Select, notification } from 'antd';
import { adminCreateFlashcard } from '../api/createFlashcard.api';
import { getAllVocabs } from '../api/uploadVocab.api';
import { getFlashcard } from '../../../flashcard/api/getFlashcard.api';
import { deleteFlashcard } from '../../../flashcard/api/deleteFlashcard.api';

const FlashcardManagement = () => {

    const [isOpened, setIsOpened] = useState(false);
    const [title, setTitle] = useState("");
    const [choosedVocabs, setChoosedVocabs] = useState([]);
    const [vocabList, setVocabList] = useState([]);
    const [, setLoading] = useState(false);
    const [flashcards, setFlashcardList] = useState([]);


    const handleOpen = () => {
        setIsOpened(true);
    }

    const handleClose = () => {
        setTitle("");
        setChoosedVocabs([]);
        setIsOpened(false);
        setLoading(false);
    }

    useEffect(() => {
        const fetchVocab = async () => {
            try {
                const { data } = await getAllVocabs();
                setVocabList(data.data);
            }
            catch (error) {
                console.error("Không thể lấy danh sách từ vựng", error);
            }
        }
        fetchVocab();
    }, []);

    useEffect(() => {
        const fetchFlashcard = async () => {
            try {
                const fc = await getFlashcard();
                setFlashcardList(fc.data);
            }
            catch (error) {

            }
        }

        fetchFlashcard();
    }, [flashcards]);

    const handleSave = async () => {
        setLoading(true);
        try {
            await adminCreateFlashcard({
                title,
                vocabs: choosedVocabs
            })
            notification.success({
                message: "Tạo mới flashcard thành công",
                duration: 2
            })
        }
        catch (error) {
            console.error("Không thể lưu flashcard", error);
            notification.error({
                message: "Không thể tạo mới flashcard",
                duration: 2
            })
        }
        finally {
            setLoading(false);
        }
        setIsOpened(false);
    }

    const handleDeleteFlashcard = async (fc_id) => {
        try {
            await deleteFlashcard(fc_id);
        }
        catch (error) {

        }
    }

    return (
        <MasterLayout>
            <h2>Quản lý flashcard</h2>
            <Button onClick={handleOpen}>Thêm mới Flashcard</Button>

            <table border="1" cellPadding="10">
                <thead>
                    <tr>
                        <th>Tên flashcard</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {flashcards?.map((fc) => (
                        <tr key={fc.id}>
                            <td>{fc.title}</td>
                            <td>
                                <button>Edit</button>
                                <button onClick={() => handleDeleteFlashcard(fc.id)} style={{ marginLeft: "10px", color: "red" }}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal
                open={isOpened}
                onOk={handleSave}
                onCancel={handleClose}>
                <Form layout="vertical">
                    <Form.Item label="Tên Flashcard" required>
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder='Nhập tên flashcard...'
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
        </MasterLayout>
    )
}

export default FlashcardManagement;