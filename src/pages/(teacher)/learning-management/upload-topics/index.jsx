import React, { useState, useEffect, useCallback } from 'react';
import { Button, Select } from 'antd';
import MasterLayout from '../../../../layouts/MasterLayout/masterlayout';
import { getAllTopics, getTopicByLevel } from '../../../learn/api/getAllTopics.api';
import UploadTopicButton from './uploadTopic';
import deleteTopic from './api/deleteTopic.api';
import EditTopicButton from './editTopic';

const { Option } = Select;


//Quản lý các khóa (lộ trình) học
const UploadLearningMaterial = () => {

    const [listTopic, setListTopic] = useState([]);
    const [, setError] = useState(null);
    const [, setLoading] = useState(true);
    const [levelForFetch, setLevelForFetch] = useState('');

    const fetchTopics = useCallback(async () => {
        try {
            let response;
            if (levelForFetch) {
                console.log(levelForFetch);
                response = await getTopicByLevel(levelForFetch);
            }
            else {
                response = await getAllTopics();
            }

            if (response && response.data) {
                const sortedTopics = response.data.sort(
                    (a, b) => new Date(a.created_at) - new Date(b.created_at)
                );
                setListTopic(sortedTopics);
            } else {
                setListTopic([]);
            }
        } catch (error) {
            setError('Cannot load data', error);
        } finally {
            setLoading(false);
        }
    }, [levelForFetch]);

    //Danh sách lộ trình học
    useEffect(() => {

        fetchTopics();

    }, [fetchTopics, listTopic]);

    const handleDeleteTopic = async (topic_id) => {
        try {
            //console.log(topic_id)
            await deleteTopic(topic_id);
            fetchTopics();
        }
        catch (error) {
            console.error("Không thể xóa khóa học", error)
        }
    }

    const handleAddTopic = () => {
        fetchTopics();
    }

    return (
        <MasterLayout>
            <h2 className='mb-2'>Đăng tải khóa học</h2>
            <UploadTopicButton onAddTopic={handleAddTopic} />
            <div className='mt-3 mb-2'>
                <label>Tìm theo Level</label>
                <Select
                    value={levelForFetch}
                    style={{ width: 200, marginLeft: "10px" }}
                    onChange={(value) => setLevelForFetch(value)}
                    placeholder="Chọn level"
                >
                    <Option value="">Tất cả</Option>
                    <Option value="beginner">Beginner</Option>
                    <Option value="intermediate">Intermediate</Option>
                    <Option value="advanced">Advanced</Option>
                </Select>
            </div>
            <div className="max-h-[800px] overflow-y-auto mt-4 border border-gray-300 rounded">
                <table className="mt-4 w-full border border-gray-300 text-left">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3 border">ID</th>
                            <th className="p-3 border">Tên khóa học</th>
                            <th className="p-3 border">Level</th>
                            <th className="p-3 border text-center">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listTopic.map((topic) => (
                            <tr key={topic.id} className="hover:bg-gray-50">
                                <td className="p-3 border">{topic.id}</td>
                                <td className="p-3 border">{topic.topic_name}</td>
                                <td className="p-3 border">{topic.level}</td>
                                <td className="p-3 border text-center">
                                    <Button className='me-2'>Xem</Button>
                                    <EditTopicButton topic_id={topic.id} topic_name={topic.topic_name} description={topic.description} image={topic.image} level={topic.level} />
                                    <Button onClick={() => handleDeleteTopic(topic.id)} type="primary" danger className='ms-2'>
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

export default UploadLearningMaterial;