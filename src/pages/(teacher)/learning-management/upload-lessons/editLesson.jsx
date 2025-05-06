import React, { useState } from "react";
import { Button, Modal, Input, Form, notification, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { AxiosError } from "axios";
// import { getAllTopics } from "../../../learn/api/getAllTopics.api";
import editingLesson from "./api/editLesson.api";


//Chỉnh sửa bài học cho khóa học
const EditLessonButton = ({ lesson_id, title, description, part, des_prac }) => {
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [newPart, setPart] = useState(part);
    const [newTitle, setTitle] = useState(title);
    const [newDescription, setDescription] = useState(description);
    const [image, setImage] = useState(null);
    const [mp3, setMp3] = useState(null);
    const [mp3Prac, setMp3Prac] = useState(null);
    const [newDesPrac, setDesPrac] = useState(des_prac);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);


    const handleSave = async () => {

        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("title", newTitle);
            formData.append("description", newDescription);
            if (image) formData.append("image", image);
            if (mp3) formData.append("mp3", mp3);
            formData.append("part", newPart);
            if (mp3Prac) formData.append("mp3_prac", mp3Prac);
            formData.append("des_prac", newDesPrac);
            // console.log("Thông tin sửa", lesson_id, {
            //     title: formData.get("title"),
            //     description: formData.get("description"),
            //     part: formData.get("part"),
            //     des_prac: formData.get("des_prac"),
            //     image: formData.get("image"),
            //     mp3: formData.get("mp3"),
            //     mp3_prac: formData.get("mp3_prac"),
            // });

            //console.log(formData.get("title"))
            await editingLesson(lesson_id, formData);

            notification.success({
                message: "Chỉnh sửa bài học thành công",
                duration: 2,
            });

            setShow(false);

        } catch (error) {
            if (error instanceof AxiosError) {
                notification.error({
                    message: "Chỉnh sửa bài học thất bại",
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
                Sửa
            </Button>

            <Modal
                open={show}
                onCancel={handleClose}
                onOk={handleSave}
                confirmLoading={loading}
                title="Chỉnh sửa Bài học"
                centered
            >
                <Form layout="vertical">
                    <Form.Item label="Tên bài học" required>
                        <Input value={newTitle} onChange={(e) => setTitle(e.target.value)} placeholder="Nhập tên bài học..." />
                    </Form.Item>

                    <Form.Item label="Phần" required>
                        <Input value={newPart} onChange={(e) => setPart(e.target.value)} placeholder="Nhập số thứ tự phần..." />
                    </Form.Item>

                    <Form.Item label="Script" required>
                        <Input.TextArea
                            value={newDescription}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Nhập script bài học..."
                            autoSize={{ minRows: 3, maxRows: 6 }}
                        />
                    </Form.Item>

                    <Form.Item label="Hình ảnh" required>
                        <Upload
                            beforeUpload={(file) => {
                                setImage(file);
                                return false;
                            }}
                            accept="image/png, image/jpeg"
                            showUploadList={false}
                        >
                            <Button icon={<UploadOutlined />}>Chọn file hình ảnh</Button>
                        </Upload>
                        {image && <p>{image.name}</p>}

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

                    <Form.Item label="Script" required>
                        <Input.TextArea
                            value={newDesPrac}
                            onChange={(e) => setDesPrac(e.target.value)}
                            placeholder="Nhập sript phần luyện tập..."
                            autoSize={{ minRows: 3, maxRows: 6 }}
                        />
                    </Form.Item>

                    <Form.Item label="File MP3 luyện tập" required>
                        <Upload
                            beforeUpload={(file) => {
                                setMp3Prac(file);
                                return false;
                            }}
                            accept="audio/mp3"
                            showUploadList={false}
                        >
                            <Button icon={<UploadOutlined />}>Chọn file MP3</Button>
                        </Upload>
                        {mp3Prac && <p>{mp3Prac.name}</p>}
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default EditLessonButton;
