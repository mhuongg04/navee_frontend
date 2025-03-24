import React, { useEffect, useState } from 'react';
import MasterLayout from '../../layouts/MasterLayout/masterlayout';
import { Card, Divider, List, Flex, Button, Dropdown, Menu } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';
import { getMyFlashcard, getFlashcard } from './api/getFlashcard.api';
import { deleteFlashcard } from './api/deleteFlashcard.api';
import CreateMyFlashcardButton from './components/createMyFlashcard';
import NAVEE_logo from '../../assets/images/logo/NAVEE_logo.png';
import { useNavigate } from 'react-router-dom';

const Flashcard = () => {

    const [isLoading, setLoading] = useState(false);
    const [listMyFlashcard, setMyFlashcard] = useState([]);
    const [listRcmFlashcard, setRcmFlashcard] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFlashcard = async () => {
            let myfc, fc;
            try {
                myfc = await getMyFlashcard();
                fc = await getFlashcard();

                if (myfc && myfc.data) {
                    setMyFlashcard(myfc.data);
                }

                if (fc && fc.data) {
                    setRcmFlashcard(fc.data);
                }
            }
            catch (error) {
                console.error("Cannot fetch data", error);
            }
            finally {
                setLoading(false);
            }
        }

        fetchFlashcard();
    }, [listMyFlashcard, listRcmFlashcard]);

    const handleMenuClick = async (key, item) => {
        switch (key) {
            case 'edit':
                navigate(`/flashcard/edit/${item.id}`);
                break;
            case 'add-vocab':
                navigate(`/flashcard/${item.id}/add-vocab`);
                break;
            case 'delete':
                await deleteFlashcard(item.id);
                setMyFlashcard((prev) => prev.filter(fc => fc.id !== item.id));
                break;
            default:
                break;
        }
    };

    const isMobile = useMediaQuery({ maxWidth: 767 });
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });

    return (
        <MasterLayout>
            <h1 className='py-3'>Flashcard của tôi</h1>
            <Flex style={{ width: "100%" }} justify="start" gap={8}>
                <CreateMyFlashcardButton />
                <Button type="primary" danger size="large"
                    style={{
                        color: "white",
                        border: "none",
                        fontSize: "24px",
                        padding: "16px 16px",
                    }}
                    className="rounded-3">Xóa</Button>
            </Flex>
            <Divider />
            <List
                grid={{ gutter: 16, column: isMobile ? 1 : isTablet ? 2 : 5 }}
                loading={isLoading}
                dataSource={listMyFlashcard}
                renderItem={(item) => (
                    <List.Item>
                        <Card
                            cover={
                                <img
                                    src={NAVEE_logo}
                                    style={{ height: '12rem' }}
                                />
                            }
                            onClick={() => navigate(`/flashcard/${item.id}`)}
                            style={{ cursor: 'pointer' }}
                        >
                            <Flex justify="space-between" align="center">
                                <h5 style={{ margin: 0 }}>{item.title}</h5>
                                <Dropdown
                                    overlay={(
                                        <Menu onClick={({ key }) => handleMenuClick(key, item)}>
                                            <Menu.Item key="edit" onClick={(e) => e.domEvent.stopPropagation()}>Chỉnh sửa</Menu.Item>
                                            <Menu.Item key="add-vocab" onClick={(e) => e.domEvent.stopPropagation()}>Thêm từ vựng</Menu.Item>
                                            {item.title !== "Flashcard của tôi" && <Menu.Item key="delete" danger onClick={(e) => e.domEvent.stopPropagation()}>Xóa</Menu.Item>}
                                        </Menu>
                                    )}
                                    trigger={['click']}
                                >
                                    <Button
                                        shape="circle"
                                        icon={<MoreOutlined />}
                                        style={{ border: 'none' }}
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                </Dropdown>
                            </Flex>
                        </Card>
                    </List.Item>
                )}
            />
            <Divider />
            <h2>Gợi ý cho bạn học</h2>
            <List
                grid={{ gutter: 16, column: isMobile ? 1 : isTablet ? 2 : 5 }}
                loading={isLoading}
                dataSource={listRcmFlashcard}
                renderItem={(item) => (
                    <List.Item>
                        <Card
                            cover={
                                <img
                                    src={NAVEE_logo}
                                    style={{ height: '12rem' }}
                                />
                            }
                            onClick={() => navigate(`/flashcard/${item.id}`)}
                            style={{ cursor: 'pointer' }}
                        >
                            <Flex justify="space-between" align="center">
                                <h5 style={{ margin: 0 }}>{item.title}</h5>
                            </Flex>
                        </Card>
                    </List.Item>
                )}
            />
        </MasterLayout>
    )
}

export default Flashcard