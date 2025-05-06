import React, { useState, useEffect } from 'react';
import { List, Skeleton, Avatar, Card, Search } from 'antd';
import MasterLayout from '../../layouts/MasterLayout/masterlayout';
import { getAllTopics, getTopicByLevel } from './api/getAllTopics.api';
import traffic1 from '../../assets/images/traffic1.png';
import logo from '../../assets/images/logo/NAVEE_logo.png';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import TestList from './components/TestList';
// const { Container } = require('react-bootstrap');
// const NavDropdown = require('react-bootstrap/NavDropdown');


const Learn = () => {
  //const [filteredTopic, setFilteredTopic] = useState([]);
  const [listTopic, setListTopic] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [level, setLevel] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = (level, searchTerm) => {
    if (level) {

    }
  }



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

  }, []);

  // const handleFilteredTopic = (event) => {
  //   setFilteredTopic(event.target.value)
  // }

  const navigate = useNavigate();

  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });

  return (
    <MasterLayout>
      <h1>CHỦ ĐỀ</h1>
      <div className="d-flex flex-column align-items-center gap-2 border rounded p-3" style={{ backgroundColor: '#e0f7fa' }}>
        <div style={{ width: '150px' }}>
          <label htmlFor="level" className="form-label fw-bold text-gray-700">Level</label>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="form-select border-secondary shadow-sm p-2"
          >
            <option value="">All</option>
            <option value="starter">Starter</option>
            <option value="mover">Mover</option>
            <option value="flyer">Flyer</option>
            <option value="pre-ielts">Pre-IELTS</option>

          </select>
        </div>
        {/* <Search
                        placeholder="Nhập từ cần tra cứu"
                        style={{
                            width: "30rem"
                        }}
                        enterButton="Tìm"
                        size="large"
                        onChange={(e) => setSearchTerm(e.target.value)}
                        suffix={

                            searchTerm ? (
                                <CloseOutlined onClick={cancelSearch} style={{ cursor: 'pointer' }} />  // Hiển thị dấu "x" khi có từ tìm kiếm
                            ) : (
                                <SearchOutlined />  // Hiển thị biểu tượng tìm kiếm khi không có từ tìm kiếm
                            )
                        }

                        onSearch={onSearch}
                    /> */}
      </div>
      <List
        className="custom-scrollbar mt-4 max-h-[450px] pb-4"
        grid={{ gutter: 16, column: isMobile ? 1 : isTablet ? 2 : 5 }}
        loading={isLoading}
        dataSource={listTopic}
        bordered
        renderItem={(item) => (
          <List.Item>
            <Card
              cover={
                <img
                  alt={item.title}
                  src={item.image}
                  style={{ height: '13rem' }}
                />
              }
              onClick={() => navigate(`/learn/${item.id}`)}
              style={{ cursor: 'pointer' }}
              title={item.title}
            >
              <h5>{item.topic_name}</h5>
            </Card>
          </List.Item>)}
      />
      {/* <List
        className="custom-scrollbar mt-4 max-h-[450px] overflow-y-auto pb-4"
        grid={{ gutter: 16, column: isMobile ? 1 : isTablet ? 2 : 5 }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Card
              cover={
                <img
                  alt={item.title}
                  src={item.image}
                  style={{ height: '13rem' }}
                />
              }
              onClick={() => navigate(`/learn/${item.id}`)}
              style={{ cursor: 'pointer' }}
              title={item.title}
            >
              <h5>{item.topicName}</h5>
            </Card>
          </List.Item>
        )}
      /> */}

      {/* Hiển thị danh sách bài kiểm tra nếu đã đăng ký khóa học */}
      {/* {isEnrolled && (
        <div className="test-section mt-5">
          <TestList topicId={topicId} />
        </div>
      )} */}

    </MasterLayout >
  )
}

export default Learn