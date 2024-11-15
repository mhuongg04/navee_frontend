import React, { useState, useEffect } from 'react';
import { List, Skeleton, Avatar, Card } from 'antd';
import MasterLayout from '../../layouts/MasterLayout/masterlayout';
import { getAllTopics, getTopicByLevel } from './api/getAllTopics.api';
import traffic1 from '../../assets/images/traffic1.png';
import weather from '../../assets/images/weather.png';
import hobby from '../../assets/images/hobby.png';
import gmorning from '../../assets/images/gmorning.png';
import logo from '../../assets/images/logo/NAVEE_logo.png';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
// const { Container } = require('react-bootstrap');
// const NavDropdown = require('react-bootstrap/NavDropdown');

const Learn = () => {
  //const [filteredTopic, setFilteredTopic] = useState([]);
  const [listTopic, setListTopic] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [level, setLevel] = useState('');
  const [searchTerm, setSearch] = useState('');

  // useEffect(() => {
  //   const fetchTopics = async () => {
  //     try {
  //       let response;
  //       if (level) {
  //         response = await getTopicByLevel(level);
  //       }
  //       else if (level) {
  //         response = await getAllTopics();
  //       }

  //       setListTopic(response.data);
  //     }
  //     catch (error) {
  //       setError('Cannot load data', error);
  //     }
  //     finally {
  //       setLoading(false);
  //     }

  //   }

  //   fetchTopics();

  // }, [])

  // const handleFilteredTopic = (event) => {
  //   setFilteredTopic(event.target.value)
  // }


  const navigate = useNavigate();

  const data = [
    {
      id: 1,
      tittle: 'topic-1-demo',
      topicName: 'Traffic Jam',
      image: traffic1
    },
    {
      id: 2,
      tittle: 'topic-2-demo',
      topicName: 'Weather',
      image: weather
    },
    {
      id: 3,
      tittle: 'topic-3-demo',
      topicName: 'Hobby',
      image: hobby
    },
    {
      id: 4,
      tittle: 'topic-4-demo',
      topicName: 'Greetings',
      image: gmorning
    },
    {
      id: 5,
      tittle: 'topic-5-demo',
      topicName: 'Jobs',
      image: logo
    },
    {
      id: 6,
      tittle: 'topic-6-demo',
      topicName: 'Culture',
      image: logo
    },
    {
      id: 7,
      tittle: 'topic-7-demo',
      topicName: 'Animal',
      image: logo
    },
    {
      id: 8,
      tittle: 'topic-8-demo',
      topicName: 'Numbers',
      image: logo
    },
    {
      id: 9,
      tittle: 'topic-9-demo',
      topicName: 'Country',
      image: logo
    },
  ]

  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });

  return (
    <MasterLayout>
      <h1>TOPICS</h1>
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
        {/* <Input
          size="large"
          placeholder="Nhập chủ đề muốn tìm kiếm"
          className="w-2/3"
          value={searchTerm}
          onChange={(e) => setSearch(e.target.value)}
        /> */}
      </div>
      {/* <List
        className="custom-scrollbar mt-4 max-h-[450px] overflow-y-auto pb-4"
        loading={isLoading}
        itemLayout="horizontal"
        dataSource={listTopic}
        bordered
        renderItem={(topic) => (
          <List.Item>
            <Skeleton avatar title={false} loading={isLoading} active>
              <List.Item.Meta
                avatar={
                  <Avatar
                    className="mt-1"
                    size={50}
                    src={topic?.image}
                  />
                }
                title={
                  <div className="mt-3 text-base font-semibold">
                    {topic?.topicName}
                  </div>
                }
              />
            </Skeleton>
          </List.Item>)}
      /> */}
      <List
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
              {item.topicName}
            </Card>
          </List.Item>
        )}
      />

    </MasterLayout >
  )
}

export default Learn