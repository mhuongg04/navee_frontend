import React, { useState, useEffect } from "react";
import { getLessonByTopicId } from "../../../learn/api/getAllLesson.api";
import { getLessonById } from "../../../../utils/api/findNameById.api";
import { getAllTopics } from "../../../learn/api/getAllTopics.api";
import { uploadVocab, getAllVocabs } from "../api/uploadVocab.api";
import MasterLayout from "../../../../layouts/MasterLayout/masterlayout";
import { Button, Form, Modal, Select, Upload, Input, notification } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import EditVocabButton from "./editingVocab";
import deleteVocabulary from "../api/deleteVocab.api";

const { Option } = Select;

const VocabManagement = () => {
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [topicId, setTopicId] = useState("");
    const [lessonId, setLessonId] = useState("");
    const [lessons, setLessons] = useState([]);
    const [topics, setTopics] = useState([]);
    const [vocabList, setVocabList] = useState([]);
    const [vocabs, setVocabs] = useState([]);
    const [lessonTitles, setLessonTitles] = useState([]);
    const [refreshKey, setRefreshKey] = useState(0);


    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false);
        setTopicId("");
        setLessonId("");
        setVocabList([]);
        setLoading(false);
    };

    useEffect(() => {
        const fetchVocabs = async () => {
            try {
                const { data } = await getAllVocabs();
                if (!data || data.length === 0) {
                    setVocabs([]);
                    return;
                }
                const sortedVocabs = data.data.sort(
                    (a, b) => new Date(a.created_at) - new Date(b.created_at)
                );

                setVocabs(sortedVocabs);

                //console.log("Danh sách từ vựng: ", data.data);


                //Lấy tên bài học tương ứng với từ vựng
                const lessonIds = [...new Set(sortedVocabs.map(vocab => vocab.lesson_id))];

                //console.log(lessonIds)
                const lessonsOfVocabs = await Promise.all(
                    lessonIds
                        .filter(id => !!id)
                        .map(async id => {
                            const res = await getLessonById(id);
                            return { id, title: res.data };
                        })
                );

                const titleMap = {};
                lessonsOfVocabs.forEach(lesson => {
                    titleMap[lesson.id] = lesson.title;
                });

                setLessonTitles(titleMap);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách từ vựng", error);
            }
        };

        fetchVocabs();
    }, [refreshKey, vocabs]);


    // Fetch danh sách chủ đề
    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const { data } = await getAllTopics();
                if (!data || data.length === 0) {
                    console.warn("Không tìm thấy khóa học.");
                    setTopics([]);
                    return
                }
                setTopics(data);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách chủ đề", error);
            }
        };
        fetchTopics();
    }, []);

    // Fetch danh sách bài học khi chọn chủ đề
    useEffect(() => {
        if (!topicId) return;

        const fetchLessons = async () => {
            try {
                const { data } = await getLessonByTopicId(topicId);
                if (!data || data.length === 0) {
                    console.warn("Không tìm thấy danh sách bài học.");
                    setLessons([]);
                    return
                }
                setLessons(data);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách bài học", error);
            }
        };

        fetchLessons();
    }, [topicId]);

    // Thêm từ vựng mới vào danh sách
    const addVocab = () => {
        setVocabList([
            ...vocabList,
            { category: "", english: "", vietnamese: "", description: "", mp3: null },
        ]);
    };

    // Xóa một từ vựng khỏi danh sách
    const removeVocab = (index) => {
        setVocabList(vocabList.filter((_, i) => i !== index));
    };

    // Cập nhật thông tin của từ vựng
    const updateVocab = (index, field, value) => {
        setVocabList((prevVocabList) =>
            prevVocabList.map((vocab, i) =>
                i === index
                    ? { ...vocab, [field]: field === "mp3" && value ? value : value }
                    : vocab
            )
        );
    };


    // Xử lý lưu danh sách từ vựng
    const handleSave = async () => {
        if (!lessonId) {
            alert("Vui lòng chọn bài học trước khi lưu.");
            return;
        }

        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("lesson_id", lessonId);
            formData.append("topic_id", topicId);

            const vocabData = vocabList.map(({ category, english, vietnamese, description }, index) => {
                return { category, english, vietnamese, description, index };
            });

            formData.append("vocabs", JSON.stringify(vocabData));

            vocabList.forEach((vocab, index) => {
                if (vocab.mp3) {
                    formData.append(`mp3_${index}`, vocab.mp3);
                }
            });

            await uploadVocab(formData);
            notification.success({
                message: "Tạo mới từ vựng thành công",
                duration: 2
            })

            handleClose();
        } catch (error) {
            notification.error({
                message: "Tạo mới từ vựng thất bại. Hãy thử lại",
                duration: 2
            })
        } finally {
            setLoading(false);
            setRefreshKey(prev => prev + 1);
        }
    };

    //Xóa từ vựng khỏi danh sách
    const deleteVocab = async (vocab_id) => {
        await deleteVocabulary(vocab_id);
    }


    return (
        <MasterLayout>
            <h2>Quản lý từ vựng</h2>
            <Button type="primary" onClick={handleShow}>Thêm từ vựng</Button>

            <div className="max-h-[800px] overflow-y-auto mt-4 border border-gray-300 rounded">
                <table className="mt-4 w-full border border-gray-300 text-left">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3 border">Từ</th>
                            <th className="p-3 border">Dịch nghĩa</th>
                            <th className="p-3 border">Loại từ</th>
                            <th className="p-3 border">Mô tả</th>
                            <th className="p-3 border">Bài học</th>
                            <th className="p-3 border text-center">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vocabs?.map((vocab) => (
                            <tr key={vocab.id} className="hover:bg-gray-50">
                                <td className="p-3 border">{vocab.english}</td>
                                <td className="p-3 border">{vocab.vietnamese}</td>
                                <td className="p-3 border">{vocab.category}</td>
                                <td className="p-3 border">{vocab.description}</td>
                                <td className="p-3 border">{lessonTitles[vocab.lesson_id] || vocab.lesson_id}</td>
                                <td className="p-3 border text-center">
                                    <EditVocabButton vocab_id={vocab.id} english={vocab.english} vietnamese={vocab.vietnamese} description={vocab.description} />
                                    <Button type="primary" danger className="ms-2" onClick={() => deleteVocab(vocab.id)}>Xóa</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


            <Modal
                open={show}
                onCancel={handleClose}
                onOk={handleSave}
                confirmLoading={loading}
                title="Thêm từ vựng"
                centered
                width={800}
            >
                <Form layout="vertical">
                    <Form.Item label="Chủ đề" required>
                        <Select value={topicId} onChange={(value) => setTopicId(value)} placeholder="Chọn chủ đề">
                            {topics.map((topic) => (
                                <Option key={topic.id} value={topic.id}>
                                    {topic.topic_name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item label="Bài học" required>
                        <Select value={lessonId} onChange={(value) => setLessonId(value)} placeholder="Chọn bài học">
                            {lessons.map((lesson) => (
                                <Option key={lesson.id} value={lesson.id}>
                                    {lesson.title}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    {vocabList.map((vocab, index) => (
                        <div key={index} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px", borderRadius: "5px" }}>
                            <Form.Item label={`Từ vựng ${index + 1} - Loại từ`} required>
                                <Input
                                    value={vocab.category}
                                    onChange={(e) => updateVocab(index, "category", e.target.value)}
                                    placeholder="Nhập loại từ..."
                                />
                            </Form.Item>

                            <Form.Item label="Tiếng Anh" required>
                                <Input
                                    value={vocab.english}
                                    onChange={(e) => updateVocab(index, "english", e.target.value)}
                                    placeholder="Nhập từ tiếng Anh..."
                                />
                            </Form.Item>

                            <Form.Item label="Tiếng Việt" required>
                                <Input
                                    value={vocab.vietnamese}
                                    onChange={(e) => updateVocab(index, "vietnamese", e.target.value)}
                                    placeholder="Nhập nghĩa tiếng Việt..."
                                />
                            </Form.Item>

                            <Form.Item label="Mô tả">
                                <Input.TextArea
                                    value={vocab.description}
                                    onChange={(e) => updateVocab(index, "description", e.target.value)}
                                    placeholder="Nhập mô tả..."
                                    autoSize={{ minRows: 2, maxRows: 4 }}
                                />
                            </Form.Item>

                            <Form.Item label="File MP3">
                                <Upload
                                    beforeUpload={(file) => {
                                        updateVocab(index, "mp3", file);
                                        return false;
                                    }}
                                    accept="audio/mp3"
                                    showUploadList={false}
                                >
                                    <Button icon={<UploadOutlined />}>Chọn file MP3</Button>
                                </Upload>
                                {vocab.mp3 && <p>{vocab.mp3.name}</p>}
                            </Form.Item>

                            <Button danger onClick={() => removeVocab(index)}>
                                Xóa từ vựng
                            </Button>
                        </div>
                    ))}

                    <Button type="dashed" onClick={addVocab} style={{ width: "100%" }}>
                        + Thêm từ vựng mới
                    </Button>
                </Form>
            </Modal>

        </MasterLayout>
    );
};

export default VocabManagement;
