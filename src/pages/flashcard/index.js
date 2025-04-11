import React, { useCallback, useEffect, useState } from 'react';
import MasterLayout from '../../layouts/MasterLayout/masterlayout';
import { Card, Divider, List, Button, Dropdown } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';
import { getMyFlashcard, getFlashcard } from './api/getFlashcard.api';
import { deleteFlashcard } from './api/deleteFlashcard.api';
import CreateMyFlashcardButton from './components/createMyFlashcard';
import NAVEE_logo from '../../assets/images/logo/NAVEE_logo.png';
import { useNavigate } from 'react-router-dom';
import EditMyFlashcardModal from './components/editMyFlashcard';
import { getFlashcardData } from './api/getFlashcard.api';

const Flashcard = () => {

    const [isLoading, setLoading] = useState(false);
    const [listMyFlashcard, setMyFlashcard] = useState([]);
    const [listRcmFlashcard, setRcmFlashcard] = useState([]);
    const [isShow, setShow] = useState(false);
    const navigate = useNavigate();
    const [flashcardData, setFlashcardData] = useState([]);
    const [selectedFlashcard, setSelectedFlashcard] = useState(null);


    const fetchFlashcardData = async (flashcard_id) => {
        setLoading(true);
        try {
            let data = await getFlashcardData(flashcard_id);
            //console.log(data.data[0])
            if (!data || data.length === 0) {
                setFlashcardData([]);
                return;
            }
            setFlashcardData(data.data)
        }
        catch (error) {
            console.error("Không tìm thấy dữ liệu flashcard", error);
        }
        finally {
            setLoading(false);
        }
    }


    const fetchFlashcard = useCallback(async () => {
        let myfc, fc;
        try {
            myfc = await getMyFlashcard();
            fc = await getFlashcard();

            if (myfc && myfc.data) {
                const sortedFcs = myfc.data.sort(
                    (a, b) => new Date(a.created_at) - new Date(b.created_at)
                );
                setMyFlashcard(sortedFcs);
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
    }, [])

    useEffect(() => {
        fetchFlashcard();
    }, [fetchFlashcard]);

    const handleMenuClick = async (key, item) => {
        switch (key) {
            case 'edit':
                setShow((prev) => !prev);
                await fetchFlashcardData(item.id);
                setSelectedFlashcard(item);
                fetchFlashcard();
                break;
            case 'delete':
                await deleteFlashcard(item.id);
                setMyFlashcard((prev) => prev.filter(fc => fc.id !== item.id));
                break;
            default:
                break;
        }
    };

    const getRandomPastelColor = () => {
        const hue = Math.floor(Math.random() * 360);
        return `hsl(${hue}, 70%, 85%)`;
    }


    const isMobile = useMediaQuery({ maxWidth: 767 });
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });

    return (
        <MasterLayout>
            <h1 className='mb-2'>
                Flashcard của tôi
            </h1>

            <div className="d-flex">
                <CreateMyFlashcardButton className='mt-2' />
                {/* <Button
                    type="primary"
                    danger
                    size="large"
                    style={{
                        color: "white",
                        border: "none",
                        fontSize: "24px",
                        padding: "16px 16px",
                    }}
                    className="rounded-3"
                >
                    Xóa
                </Button> */}
            </div>
            <Divider />
            <List
                grid={{ gutter: 16, column: isMobile ? 1 : isTablet ? 2 : 5 }}
                loading={isLoading}
                dataSource={listMyFlashcard}
                renderItem={(item) => (
                    <List.Item>
                        <Card
                            cover={
                                <div
                                    style={{
                                        height: '12rem',
                                        width: '100%',
                                        backgroundColor: getRandomPastelColor(),
                                    }}
                                />
                            }
                            onClick={() => navigate(`/flashcard/${item.id}`)}
                            style={{ cursor: 'pointer', border: '2px solid #e0e0e0' }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <h5 style={{ margin: 0 }}>{item.title}</h5>

                                <Dropdown
                                    menu={{
                                        items: [
                                            {
                                                key: 'edit',
                                                label: 'Chỉnh sửa',
                                                onClick: (e) => {
                                                    e.domEvent.stopPropagation();
                                                    handleMenuClick('edit', item);
                                                },
                                            },
                                            ...(item.title !== 'Flashcard của tôi'
                                                ? [
                                                    {
                                                        key: 'delete',
                                                        label: 'Xóa',
                                                        danger: true,
                                                        onClick: (e) => {
                                                            e.domEvent.stopPropagation();
                                                            handleMenuClick('delete', item);
                                                        },
                                                    },
                                                ]
                                                : []),
                                        ],
                                    }}
                                    trigger={['click']}
                                >
                                    <Button
                                        shape="circle"
                                        icon={<MoreOutlined />}
                                        style={{ border: 'none' }}
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                </Dropdown>
                            </div>
                        </Card>
                    </List.Item>

                )}
            />
            {isShow && selectedFlashcard && (
                <EditMyFlashcardModal
                    key={selectedFlashcard.id}
                    isShow={isShow}
                    flashcard_id={selectedFlashcard.id}
                    curTitle={selectedFlashcard.title}
                    curVocabs={flashcardData}
                    onClose={() => {
                        setShow(false);
                        setSelectedFlashcard(null);
                    }}
                />
            )}
            <Divider />
            <h2>Gợi ý cho bạn học</h2>
            <List
                grid={{ gutter: 16, column: isMobile ? 1 : isTablet ? 2 : 5 }}
                loading={isLoading}
                dataSource={listRcmFlashcard}
                renderItem={(item) => (
                    <List.Item>
                        <Card
                            cover={<img src={NAVEE_logo} alt="Logo NAVEE" style={{ height: '12rem', width: '100%' }} />}
                            onClick={() => navigate(`/flashcard/${item.id}`)}
                            style={{ cursor: 'pointer', border: '2px solid #e0e0e0' }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h5 style={{ margin: 0 }}>{item.title}</h5>
                            </div>
                        </Card>
                    </List.Item>
                )}
            />

        </MasterLayout>
    )
}

export default Flashcard