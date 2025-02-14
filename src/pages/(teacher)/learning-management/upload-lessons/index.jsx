import React, { useEffect, useState } from "react";
import MasterLayout from "../../../../layouts/MasterLayout/masterlayout";
import UploadLessonButton from "./uploadLessons";
import { getAllLesson } from "../../../learn/api/getAllLesson.api";

const UploadLessons = () => {

    const [listLesson, setListLesson] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
    }, listLesson)

    return (
        <MasterLayout>
            <h2>Đăng tải các bài học</h2>
            <UploadLessonButton />
            <table border="1" cellPadding="10">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên bài học</th>
                        <th>Phần</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {listLesson.map((lesson) => (
                        <tr key={lesson.id}>
                            <td>{lesson.id}</td>
                            <td>{lesson.title}</td>
                            <td>{lesson.part}</td>
                            <td>
                                <button>Edit</button>
                                <button style={{ marginLeft: "10px", color: "red" }}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </MasterLayout>
    )
}

export default UploadLessons;