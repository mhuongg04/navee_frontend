import React, { useState, useEffect } from "react";
import uploadEx from "./uploadEx.api";
import { getAllLesson } from "../../../learn/api/getAllLesson.api";
import { Button, Modal, Input, Form, notification, Select, Space } from "antd";

const { Option } = Select;

const UploadExerciseButton = () => {
    const [lessonId, setLessonId] = useState("");
    const [lessons, setLessons] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [exercises, setExercises] = useState([
        { question: "", answer: "", point: "" }
    ]);

    useEffect(() => {
        const fetchLessons = async () => {
            try {
                const { data } = await getAllLesson();
                setLessons(data);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách topic:", error);
            }
        };

        fetchLessons();
    }, []);

    const showModal = () => setIsOpen(!isOpen);
    const handleCancel = () => setIsOpen(false);

    // Thêm một câu hỏi mới vào danh sách
    const addExercise = () => {
        setExercises([...exercises, { question: "", answer: "", point: "", lessonId: "" }]);
    };

    // Cập nhật giá trị của một câu hỏi
    const updateExercise = (index, field, value) => {
        const newExercises = [...exercises];
        newExercises[index][field] = value;
        setExercises(newExercises);
    };

    // Xóa một câu hỏi
    const removeExercise = (index) => {
        const newExercises = exercises.filter((_, i) => i !== index);
        setExercises(newExercises);
    };

    // Gửi dữ liệu lên server
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("Data to post: ", exercises)
            const response = await uploadEx(exercises, lessonId)
            console.log("Response:", response.data);
        } catch (error) {
            console.error("Error:", error);
        }

        setExercises([]);
        setIsOpen(false);
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Thêm Bài Tập
            </Button>

            <Modal
                title="Thêm Bài Tập"
                open={isOpen}
                onCancel={handleCancel}
                onOk={handleSubmit}
                okText="Gửi"
                cancelText="Hủy"
            >
                <Form layout="vertical">
                    {exercises.map((ex, index) => (
                        <div key={index} style={{ marginBottom: 16, border: "1px solid #ddd", padding: 10, borderRadius: 5 }}>
                            <Form.Item label={`Câu hỏi ${index + 1}`}>
                                <Input
                                    placeholder="Nhập câu hỏi"
                                    value={ex.question}
                                    onChange={(e) => updateExercise(index, "question", e.target.value)}
                                />
                            </Form.Item>
                            <Form.Item label="Đáp án">
                                <Input
                                    placeholder="Nhập đáp án"
                                    value={ex.answer}
                                    onChange={(e) => updateExercise(index, "answer", e.target.value)}
                                />
                            </Form.Item>
                            <Form.Item label="Điểm">
                                <Input
                                    type="number"
                                    placeholder="Nhập điểm"
                                    value={ex.point}
                                    onChange={(e) => updateExercise(index, "point", e.target.value)}
                                />
                            </Form.Item>
                            <Form.Item label="Chủ đề" required>
                                <Select value={lessonId} onChange={(value) => setLessonId(value)} placeholder="Chọn bài học">
                                    {lessons.map((lesson) => (
                                        <Option key={lesson.id} value={lesson.id}>
                                            {lesson.title}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Button danger onClick={() => removeExercise(index)}>
                                Xóa câu hỏi
                            </Button>
                        </div>
                    ))}
                    <Space>
                        <Button type="dashed" onClick={addExercise}>
                            + Thêm câu hỏi
                        </Button>
                    </Space>
                </Form>
            </Modal>
        </>
    );
};

export default UploadExerciseButton;
