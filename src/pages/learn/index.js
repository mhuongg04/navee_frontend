import React, { useState, useEffect, useCallback } from 'react';
import { List, Card, Select, Input } from 'antd';
import { FaSearch, FaTimes } from 'react-icons/fa';
import MasterLayout from '../../layouts/MasterLayout/masterlayout';
import { getAllTopics } from './api/getAllTopics.api';
import logo from '../../assets/images/logo/NAVEE_logo.png';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import LazyLoad from 'react-lazyload';
const { Option } = Select;
import TestList from './components/TestList';
// const { Container } = require('react-bootstrap');
// const NavDropdown = require('react-bootstrap/NavDropdown');


const Learn = () => {
  const [listTopic, setListTopic] = useState([]);
  const [, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [levelForFetch, setLevel] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isImgLoad, setImgLoad] = useState(false);

  const handleImgLoad = () => {
    setImgLoad(true);
  }

  // Lọc theo tên hoặc cấp độ ngay trong dữ liệu
  const filterTopics = (data, levelForFetch, searchTerm) => {
    let filteredTopics = data;

    // Lọc theo cấp độ
    if (levelForFetch) {
      filteredTopics = filteredTopics.filter((topic) => topic.level === levelForFetch);
    }

    // Lọc theo tên
    if (searchTerm) {
      filteredTopics = filteredTopics.filter((topic) =>
        topic.topic_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filteredTopics;
  };

  // Lấy tất cả các chủ đề và lọc theo cấp độ và tên
  const fetchTopics = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getAllTopics();
      if (response && response.data) {
        // Lọc các chủ đề khi có dữ liệu
        const filteredTopics = filterTopics(response.data, levelForFetch, searchTerm);
        setListTopic(filteredTopics);
      } else {
        setListTopic([]);
      }
    } catch (error) {
      setError('Cannot load data', error);
    } finally {
      setLoading(false);
    }
  }, [levelForFetch, searchTerm]); // Phụ thuộc vào các giá trị state cần thiết


  useEffect(() => {
    fetchTopics();
  }, [fetchTopics]);

  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  }

  const handleCancelSearch = async () => {
    setSearchTerm('');
    fetchTopics();
  }

  return (
    <MasterLayout>
      <h1>CHỦ ĐỀ</h1>
      <div
        className="d-flex flex-row align-items-center justify-content-center gap-2 border rounded p-3"
        style={{ backgroundColor: '#e0f7fa' }}
      >
        <div style={{ width: '75%', maxWidth: '150px' }}>
          <label
            className="form-label fw-bold text-gray-700"
            style={{ fontSize: '1rem', marginBottom: '4px' }}
          >
            Cấp độ
          </label>
          <Select
            value={levelForFetch}
            onChange={(value) => setLevel(value)}
            style={{
              width: '100%',
              fontSize: '1rem',
              height: 38,
              borderRadius: '10px',
            }}
            placeholder="Chọn level"
          >
            <Option value="">Tất cả</Option>
            <Option value="beginner">Beginner</Option>
            <Option value="intermediate">Intermediate</Option>
            <Option value="advanced">Advanced</Option>
          </Select>
        </div>

        <div style={{ width: '100%', maxWidth: '30rem' }}>
          <label
            className="form-label fw-bold text-gray-700"
            style={{ fontSize: '1rem', marginBottom: '4px' }}
          >
            Tìm khóa học
          </label>
          <Input
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            onPressEnter={() => handleSearch(searchTerm)}
            onClear={handleCancelSearch}
            placeholder="Type to search"
            allowClear
            suffix={
              searchTerm ? (
                <FaTimes
                  style={{ cursor: 'pointer', color: '#555' }}
                  onClick={handleCancelSearch}
                />
              ) : (
                <FaSearch style={{ color: '#555' }} />
              )
            }
            style={{
              width: '100%',
              borderRadius: '10px',
              padding: '8px 12px',
            }}
          />
        </div>
      </div>

      <LazyLoad>
        <List
          className="custom-scrollbar mt-4 max-h-[450px] pb-4"
          grid={{ gutter: 16, column: isMobile ? 1 : isTablet ? 2 : 5 }}
          loading={isLoading}
          dataSource={listTopic}
          renderItem={(item) => (
            <List.Item>
              <Card
                cover={
                  <LazyLoad>
                    <img
                      alt={item.title}
                      src={isImgLoad ? item.image : logo}
                      onLoad={handleImgLoad}
                      style={{ width: '98%', height: '11rem', objectFit: 'cover' }}
                    />
                  </LazyLoad>
                }
                onClick={() => navigate(`/learn/${item.id}`)}
                style={{ cursor: 'pointer', border: '2px solid #e0e0e0' }}
                title={item.title}
              >
                <h5
                  style={{
                    fontWeight: 'bold',
                    fontSize: '1.3rem',
                    marginBottom: '4px',
                  }}
                >
                  {item.topic_name}
                </h5>
                <h5
                  style={{
                    fontWeight: 'normal',
                    fontSize: '1rem',
                    color: '#666',
                  }}
                >
                  Level: {item.level}
                </h5>
              </Card>
            </List.Item>
          )}
        />
      </LazyLoad>
    </MasterLayout>
  );
};

export default Learn;
