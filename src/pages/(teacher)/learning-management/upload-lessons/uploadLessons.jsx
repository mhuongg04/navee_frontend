import React, { useState, useEffect } from "react";
import uploadLesson from './uploadLesson.api';
import { Button, Modal, Input, Form, notification, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { AxiosError } from "axios";
import { getAllTopics } from "../../../learn/api/getAllTopics.api";


const { Option } = Select;

//Đăng tải bài học cho khóa học
const UploadLessonButton = () => {
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [part, setPart] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [mp3, setMp3] = useState(null);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const [topicId, setTopicId] = useState("");
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const { data } = await getAllTopics();
                setTopics(data);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách topic:", error);
            }
        };

        fetchTopics();
    }, []);


    const handleSave = async () => {
        if (!title || !description || !image || !topicId || !mp3) {
            notification.warning({ message: "Vui lòng nhập đầy đủ thông tin!" });
            return;
        }

        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("topic_id", topicId);
            formData.append("title", title);
            formData.append("description", description);
            formData.append("image", image);
            formData.append("mp3", mp3);
            formData.append("part", part);

            console.log(formData.get("title"))
            await uploadLesson(formData);

            notification.success({
                message: "Tạo bài học thành công",
                duration: 2,
            });

            setShow(false);

            setTitle("");
            setDescription("");
            setImage("");
            setTopicId("");
            setPart("");
            setMp3(null);
        } catch (error) {
            if (error instanceof AxiosError) {
                notification.error({
                    message: "Tạo bài học thất bại",
                    description: error.response?.data?.message || "Lỗi không xác định",
                });
            }
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Button type="primary" onClick={handleShow}>
                Đăng tải bài học
            </Button>

            <Modal
                visible={show}
                onCancel={handleClose}
                onOk={handleSave}
                confirmLoading={loading}
                title="Thêm Bài Học"
                centered
            >
                <Form layout="vertical">
                    <Form.Item label="Tên bài học" required>
                        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Nhập tên bài học..." />
                    </Form.Item>

                    <Form.Item label="Phần" required>
                        <Input value={part} onChange={(e) => setPart(e.target.value)} placeholder="Nhập số thứ tự phần..." />
                    </Form.Item>

                    <Form.Item label="Mô tả" required>
                        <Input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Nhập mô tả..." />
                    </Form.Item>

                    <Form.Item label="Hình ảnh" required>
                        <Input value={image} onChange={(e) => setImage(e.target.value)} placeholder="Nhập link hình ảnh..." />
                    </Form.Item>

                    <Form.Item label="Chủ đề" required>
                        <Select value={topicId} onChange={(value) => setTopicId(value)} placeholder="Chọn chủ đề">
                            {topics.map((topic) => (
                                <Option key={topic.id} value={topic.id}>
                                    {topic.topic_name}
                                </Option>
                            ))}
                        </Select>
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

export default UploadLessonButton;
