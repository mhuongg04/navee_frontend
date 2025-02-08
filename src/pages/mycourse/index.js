import React, { useState } from 'react';
import MasterLayout from '../../layouts/MasterLayout/masterlayout';
import getEnrolledTopics from './api/fetchEnrolledTopics.api';
import { List, Card } from 'antd';
import { useMediaQuery } from 'react-responsive';

const MyCourse = () => {

    // const [topics, setTopics] = useState('');
    const [isLoading, setLoading] = useState(false);
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });
    const [topics, setEnrolledTopics] = useState('');
    const setError = useState(null)

    const fetchEnrolledTopics = async () => {
        setLoading(true);
        let data;
        try {
            data = await getEnrolledTopics();
            setEnrolledTopics(data.topics)
        }
        catch (error) {
            setError('Cannot load data', error);
        }
        finally {
            setLoading(false);
        }
        fetchEnrolledTopics();
    }

    return (
        <MasterLayout>
            <h1>BẢNG TIN</h1>
            <List
                className="custom-scrollbar mt-4 max-h-[450px] overflow-y-auto pb-4"
                grid={{ gutter: 16, column: isMobile ? 1 : isTablet ? 2 : 5 }}
                loading={isLoading}
                dataSource={topics}
                renderItem={(item) => (
                    <List.Item>
                        <Card>
                            {item.topic_name}
                        </Card>
                    </List.Item>
                )}
            />
        </MasterLayout>
    )
}

export default MyCourse