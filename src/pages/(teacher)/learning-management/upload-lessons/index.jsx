import React, { useEffect, useState } from "react";
import MasterLayout from "../../../../layouts/MasterLayout/masterlayout";
import UploadLessonButton from "./uploadLessons";
import { getAllLesson } from "../../../learn/api/getAllLesson.api";
import deleteLesson from "./api/deleteLesson.api";
import EditLessonButton from "./editLesson";
import { Button } from "antd";

const UploadLessons = () => {

    const [listLesson, setListLesson] = useState([]);
    const [, setLoading] = useState(true);
    const [, setError] = useState(null);

    useEffect(() => {
        const fetchLesson = async () => {
            try {
                let response = await getAllLesson();
                setListLesson(response.data);
            }
            catch (error) {
                setError('Cannot load data', error);
            }
            finally {
                setLoading(false)
            }
        }

        fetchLesson();
    }, [listLesson]);

    const handleDeleteLesson = async (lesson_id) => {
        try {
            console.log(lesson_id)
            await deleteLesson(lesson_id);
        }
        catch (error) {
            console.error("Không thể xóa bài học", error);
        }
    }

    return (
        <MasterLayout>
            <h2>Đăng tải các bài học</h2>
            <UploadLessonButton />
            <div className="max-h-[800px] overflow-y-auto mt-4 border border-gray-300 rounded">
                <table className="w-full text-left mt-3">
                    <thead className="bg-gray-100 sticky top-0 z-10">
                        <tr>
                            <th className="p-3 border">ID</th>
                            <th className="p-3 border">Tên bài học</th>
                            <th className="p-3 border">Phần</th>
                            <th className="p-3 border text-center">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listLesson.map((lesson) => (
                            <tr key={lesson.id} className="hover:bg-gray-50">
                                <td className="p-3 border">{lesson.id}</td>
                                <td className="p-3 border">{lesson.title}</td>
                                <td className="p-3 border">{lesson.part}</td>
                                <td className="p-3 border text-center">
                                    <EditLessonButton
                                        lesson_id={lesson.id}
                                        title={lesson.title}
                                        description={lesson.description}
                                        part={lesson.part}
                                        des_prac={lesson.des_prac}
                                    />
                                    <Button
                                        type="primary"
                                        danger
                                        onClick={() => handleDeleteLesson(lesson.id)}
                                        className="ms-2"
                                    >
                                        Xóa
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </MasterLayout>
    )
}

export default UploadLessons;