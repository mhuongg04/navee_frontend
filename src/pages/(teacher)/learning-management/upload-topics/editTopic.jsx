import { useState } from "react"
import editTopic from "./api/editTopic.api";
import { Button, Form, Modal, Input, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

const EditTopicButton = ({ topic_id, topic_name, description, image, level }) => {
    const [newTopicName, setTopicName] = useState('');
    const [newDescription, setDescription] = useState('');
    const [newImage, setImage] = useState(null);
    const [newLevel, setLevel] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [isShow, setShow] = useState(false);

    const handleShow = () => {
        setTopicName(topic_name);
        setDescription(description);
        setImage(image);
        setLevel(level);
        setShow(true);
    }

    const handleCancle = () => {
        setShow(false)
    }

    const handleSave = async () => {
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("topic_name", newTopicName);
            formData.append("description", newDescription);
            formData.append("image", newImage);
            formData.append("level", newLevel);

            await editTopic(topic_id, formData);

            setShow(false);
        }
        catch (error) {
            console.error("Không thể sửa khóa học ", error);
        }
        setLoading(false);
        setShow(false);
    }

    return (
        <>
            <Button type="primary" onClick={handleShow}>Sửa</Button>
            <Modal
                open={isShow}
                onCancel={handleCancle}
                onOk={handleSave}
                confirmLoading={isLoading}
                title="Thêm Chủ Đề"
                centered>
                <Form layout="vertical">
                    <Form.Item
                        label="Tên chủ đề"
                        required
                    >
                        <Input
                            value={newTopicName}
                            onChange={(e) => setTopicName(e.target.value)}
                            placeholder="Nhập tên chủ đề..."
                        />
                    </Form.Item>

                    <Form.Item
                        label="Mô tả"
                        required
                    >
                        <Input
                            value={newDescription}
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
                        {newImage && <p>{newImage.name}</p>}
                    </Form.Item>

                    <Form.Item
                        label="Cấp độ"
                        required
                    >
                        <Select
                            value={newLevel}
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
    )
}

export default EditTopicButton