import { useState } from "react";
import { Button, Modal, Input, Form, notification, Select } from "antd";
import uploadTopic from "./api/uploadTopic";
import { AxiosError } from "axios";

const { Option } = Select;


//Tạo mới các khóa học
const UploadTopicButton = () => {
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [level, setLevel] = useState("");
    const [topicName, setTopicName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const handleSave = async () => {
        setLoading(true);

        try {
            const response = await uploadTopic({
                topic_name: topicName,
                description,
                image,
                level
            });

            notification.success({
                message: "Tạo topic thành công",
                duration: 2,
            });

            setShow(false);

            setTopicName("");
            setDescription("");
            setImage("");
            setLevel("");
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.status === 400) {
                    notification.error({
                        message: 'Tạo topic thất bại',
                    });
                } else {
                    notification.error({
                        message: 'Tạo topic thất bại',
                        description: 'Lỗi không xác định',
                    });
                }
                console.error(error);
            }
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
                visible={show}
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
                        <Input
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            placeholder="Nhập link hình ảnh..."
                        />
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
                            <Option value="starter">Starter</Option>
                            <Option value="mover">Mover</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default UploadTopicButton;
