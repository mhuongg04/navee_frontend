import React, { useState, useEffect } from 'react';
import MasterLayout from '../../../../layouts/MasterLayout/masterlayout';
import { getAllExercise } from '../../../learn/api/getExercise.api';
import UploadExerciseButton from './uploadExButton';

const UploadExercises = () => {

    const [listExercise, setListExercise] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEx = async () => {
            try {
                let response = await getAllExercise();
                setListExercise(response.data);
            }
            catch (error) {
                setError('Cannot load data', error);
            }
            finally {
                setLoading(false)
            }
        }

        fetchEx();
    }, listExercise)

    return (
        <MasterLayout>
            <h2>Đăng tải bài tập</h2>
            <UploadExerciseButton />
            <table border="1" cellPadding="10">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Bài học</th>
                        <th>Câu hỏi</th>
                        <th>Đáp án</th>
                        <th>Điểm</th>
                    </tr>
                </thead>
                <tbody>
                    {listExercise.map((ex) => (
                        <tr key={ex.id}>
                            <td>{ex.id}</td>
                            <td>{ex.lesson_id}</td>
                            <td>{ex.question}</td>
                            <td>{ex.answer}</td>
                            <td>{ex.point}</td>
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

export default UploadExercises