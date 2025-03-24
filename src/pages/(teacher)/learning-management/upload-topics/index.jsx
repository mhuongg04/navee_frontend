import React, { useState, useEffect } from 'react';
import MasterLayout from '../../../../layouts/MasterLayout/masterlayout';
import { getAllTopics, getTopicByLevel } from '../../../learn/api/getAllTopics.api';
import UploadTopicButton from './uploadTopic';

//Quản lý các khóa (lộ trình) học
const UploadLearningMaterial = () => {

    const [listTopic, setListTopic] = useState([]);
    const [, setError] = useState(null);
    const [, setLoading] = useState(true);
    const [level,] = useState('');

    //Danh sách lộ trình học
    useEffect(() => {
        const fetchTopics = async () => {
            try {
                let response;
                if (level) {
                    response = await getTopicByLevel(level);
                }
                else if (!level) {
                    response = await getAllTopics();
                }

                if (response && response.data) {
                    setListTopic(response.data);
                } else {
                    setListTopic([]);
                }
                console.log(response.data)
            }
            catch (error) {
                setError('Cannot load data', error);
            }
            finally {
                setLoading(false);
            }

        }

        fetchTopics();

    }, listTopic);



    return (
        <MasterLayout>
            <h2>Đăng tải khóa học</h2>
            <UploadTopicButton />
            <table border="1" cellPadding="10">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên khóa học</th>
                        <th>Level</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {listTopic.map((topic) => (
                        <tr key={topic.id}>
                            <td>{topic.id}</td>
                            <td>{topic.topic_name}</td>
                            <td>{topic.level}</td>
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

export default UploadLearningMaterial;