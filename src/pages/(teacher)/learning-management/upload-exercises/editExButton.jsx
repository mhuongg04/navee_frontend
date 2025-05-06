import React, { useState } from "react";
import { Button, Modal, Input, Form, notification } from "antd";
import editExercise from "./api/editEx.api";

//Nút chỉnh sửa bài tập
const EditExerciseButton = ({ ex_id, question, answer, point }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [newQuestion, setQuestion] = useState(question);
    const [newAnswer, setAnswer] = useState(answer);
    const [newPoint, setPoint] = useState(point);

    const showModal = () => setIsOpen(!isOpen);
    const handleCancel = () => setIsOpen(false);

    // Gửi dữ liệu lên server
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await editExercise(ex_id, newQuestion, newAnswer, newPoint);
            notification.success({
                message: "Chỉnh sửa bài tập thành công",
                duration: 2
            })
        } catch (error) {
            notification.error({
                message: "Sửa bài tập thất bại",
                duration: 2
            })
        }

        setIsOpen(false);
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

                    <Form.Item label="Câu hỏi">
                        <Input
                            placeholder="Nhập câu hỏi"
                            value={newQuestion}
                            onChange={(e) => setQuestion(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item label="Đáp án">
                        <Input
                            placeholder="Nhập đáp án"
                            value={newAnswer}
                            onChange={(e) => setAnswer(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item label="Điểm">
                        <Input
                            type="number"
                            placeholder="Nhập điểm"
                            value={newPoint}
                            onChange={(e) => setPoint(e.target.value)}
                        />
                    </Form.Item>

                </Form>
            </Modal>
        </>
    );
};

export default EditExerciseButton;
