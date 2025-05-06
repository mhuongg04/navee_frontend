import { useState } from "react";
import { Button, Modal, Input, Form, notification, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import uploadTopic from "./api/uploadTopic.api";

const { Option } = Select;


//Tạo mới các khóa học
const UploadTopicButton = ({ onAddTopic }) => {
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [level, setLevel] = useState("");
    const [topicName, setTopicName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const handleSave = async () => {
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("topic_name", topicName);
            formData.append("description", description);
            formData.append("image", image);
            formData.append("level", level);

            await uploadTopic(formData);

            notification.success({
                message: "Tạo topic thành công",
                duration: 2,
            });

            setShow(false);

            setTopicName("");
            setDescription("");
            setImage(null);
            setLevel("");

            onAddTopic();
        } catch (error) {
            console.error("Lỗi khi tạo khóa học", error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            <Button type="primary" onClick={handleShow}>
                Đăng tải khóa học
            </Button>

            <Modal
                open={show}
                onCancel={handleClose}
                onOk={handleSave}
                confirmLoading={loading}
                title="Thêm Chủ Đề"
                centered
            >
                <Form layout="vertical">
                    <Form.Item
                        label="Tên chủ đề"
                        required
                    >
                        <Input
                            value={topicName}
                            onChange={(e) => setTopicName(e.target.value)}
                            placeholder="Nhập tên chủ đề..."
                        />
                    </Form.Item>

                    <Form.Item
                        label="Mô tả"
                        required
                    >
                        <Input
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Nhập mô tả..."
                        />
                    </Form.Item>

                    <Form.Item
                        label="Hình ảnh"
                        required
                    >
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

                    <Form.Item
                        label="Cấp độ"
                        required
                    >
                        <Select
                            value={level}
                            onChange={(value) => setLevel(value)}
                            placeholder="Chọn cấp độ"
                        >
                            <Option value="beginner">Beginner</Option>
                            <Option value="intermediate">Intermediate</Option>
                            <Option value="advanced">Advanced</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default UploadTopicButton;
