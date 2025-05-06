import React, { useState } from "react";
import { Button, Modal, Input, Form, notification, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import editVocabulary from "../api/editVocab.api";

//Nút chỉnh sửa bài tập
const EditVocabButton = ({ vocab_id, english, vietnamese, description }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [newEnglish, setEnglish] = useState(english);
    const [newVietnamese, setVietnamese] = useState(vietnamese);
    const [newDescription, setDescription] = useState(description);
    const [mp3, setMp3] = useState(null);
    const [, setLoading] = useState(false);

    const showModal = () => setIsOpen(!isOpen);
    const handleCancel = () => setIsOpen(false);

    // Gửi dữ liệu lên server
    const handleSubmit = async (e) => {
        setLoading(true)
        const formData = new FormData();

        formData.append("english", newEnglish);
        formData.append("vietnamese", newVietnamese);
        formData.append("description", newDescription);
        if (mp3) formData.append("mp3", mp3);
        try {
            await editVocabulary(vocab_id, formData);
            notification.success({
                message: "Chỉnh sửa từ vựng thành công",
                duration: 2
            })
        } catch (error) {
            notification.error({
                message: "Sửa từ vựng thất bại",
                duration: 2
            })
        }

        setIsOpen(false);
        setLoading(false);
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Sửa
            </Button>

            <Modal
                title="Chỉnh sửa Bài Tập"
                open={isOpen}
                onCancel={handleCancel}
                onOk={handleSubmit}
            >
                <Form layout="vertical">

                    <Form.Item label="Từ vựng">
                        <Input
                            placeholder="Nhập câu hỏi"
                            value={newEnglish}
                            onChange={(e) => setEnglish(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item label="Dịch nghĩa">
                        <Input
                            placeholder="Nhập dịch nghĩa"
                            value={newVietnamese}
                            onChange={(e) => setVietnamese(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item label="Mô tả (ví dụ)">
                        <Input
                            placeholder="Nhập mô tả"
                            value={newDescription}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Item>

                    <Form.Item label="File MP3" required>
                        <Upload
                            beforeUpload={(file) => {
                                setMp3(file);
                                return false;
                            }}
                            accept="audio/mp3"
                            showUploadList={false}
                        >
                            <Button icon={<UploadOutlined />}>Chọn file MP3</Button>
                        </Upload>
                        {mp3 && <p>{mp3.name}</p>}
                    </Form.Item>

                </Form>
            </Modal>
        </>
    );
};

export default EditVocabButton;
