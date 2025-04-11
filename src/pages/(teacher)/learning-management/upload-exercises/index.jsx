import React, { useState, useEffect } from 'react';
import MasterLayout from '../../../../layouts/MasterLayout/masterlayout';
import { getAllExercise } from '../../../learn/api/getExercise.api';
import { getLessonById } from '../../../../utils/api/findNameById.api';
import UploadExerciseButton from './uploadExButton';
import EditExerciseButton from './editExButton';
import { Button, notification } from 'antd';
import deleteExercise from './api/deleteEx.api';

const UploadExercises = () => {

    const [listExercise, setListExercise] = useState([]);
    const [, setLoading] = useState(true);
    const [, setError] = useState(null);
    const [lessonTitles, setLessonTitles] = useState([]);

    useEffect(() => {
        const fetchEx = async () => {
            try {
                let response = await getAllExercise();
                const exercises = response.data;
                setListExercise(exercises);
                const lessonIds = [...new Set(exercises.map(ex => ex.lesson_id))];

                const lessons = await Promise.all(
                    lessonIds.map(async id => {
                        const res = await getLessonById(id);
                        //console.log(res.data)
                        return { id, title: res.data };
                    })
                );

                const titleMap = {};
                lessons.forEach(lesson => {
                    titleMap[lesson.id] = lesson.title;
                });

                setLessonTitles(titleMap);


            }
            catch (error) {
                setError('Cannot load data', error);
            }
            finally {
                setLoading(false)
            }
        }

        fetchEx();
    }, [listExercise]);

    const handleDeleteEx = async (ex_id) => {
        try {
            await deleteExercise(ex_id);
            notification.success({
                message: "Xóa bài tập thành công",
                duration: 2
            })
        }
        catch (e) {
            notification.error({
                message: "Không thể xóa bài tập. Hãy thử lại",
                duration: 2
            })
        }
    }

    return (
        <MasterLayout>
            <h2>Đăng tải bài tập</h2>
            <UploadExerciseButton />
            <table border="1" cellPadding="10" className='mt-3'>
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
                            <td>{lessonTitles[ex.lesson_id] || ex.lesson_id}</td>
                            <td>{ex.question}</td>
                            <td>{ex.answer}</td>
                            <td>{ex.point}</td>
                            <td>
                                <EditExerciseButton ex_id={ex.id} question={ex.question} answer={ex.answer} point={ex.point} />
                                <Button type='primary' danger className='ms-2' onClick={() => handleDeleteEx(ex.id)}>
                                    Xóa
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </MasterLayout>
    )
}

export default UploadExercises