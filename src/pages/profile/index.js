import React, { useEffect, useState } from "react";
import { Spin, Typography, Avatar } from "antd";
import { Container, Row, Col } from "react-bootstrap";
import MasterLayout from "../../layouts/MasterLayout/masterlayout";
import getUserInfo from "./api/getInfo.api";
import logo from '../../assets/images/logo/NAVEE_logo.png'

const { Title, Text } = Typography;

const Profile = () => {
    const [info, setInfo] = useState(null);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const fetchInfo = async () => {
            try {
                const response = await getUserInfo();
                setInfo(response.user);
            } catch (error) {
                console.error("Cannot fetch user info", error);
            } finally {
                setLoading(false);
            }
        };

        fetchInfo();
    }, []);

    return (
        <MasterLayout>
            <Container className="mt-4">
                <Row className="justify-content-center align-items-center">
                    {/* Avatar */}
                    <Col md={4} className="text-center">
                        <Avatar
                            src={logo}
                            size={150}
                            className="shadow-lg"
                        />
                    </Col>

                    {/* Thông tin người dùng */}
                    <Col md={8} className="text-left">
                        <Title level={1} className="text-primary">
                            👤 Thông tin người dùng
                        </Title>
                        {isLoading ? (
                            <Spin size="large" className="mt-3" />
                        ) : info ? (
                            <div className="mt-4">
                                <div className="d-flex align-items-center mb-2">
                                    <Text strong style={{ fontSize: "20px", minWidth: "100px" }}>ID:</Text>
                                    <Text style={{ fontSize: "18px" }}>{info.id}</Text>
                                </div>

                                <div className="d-flex align-items-center mb-2">
                                    <Text strong style={{ fontSize: "20px", minWidth: "100px" }}>Email:</Text>
                                    <Text style={{ fontSize: "18px" }}>{info.email}</Text>
                                </div>

                                <div className="d-flex align-items-center mb-2">
                                    <Text strong style={{ fontSize: "20px", minWidth: "100px" }}>Họ:</Text>
                                    <Text style={{ fontSize: "18px" }}>{info.firstname}</Text>
                                </div>

                                <div className="d-flex align-items-center mb-2">
                                    <Text strong style={{ fontSize: "20px", minWidth: "100px" }}>Tên:</Text>
                                    <Text style={{ fontSize: "18px" }}>{info.lastname}</Text>
                                </div>

                                <div className="d-flex align-items-center mb-2">
                                    <Text strong style={{ fontSize: "20px", minWidth: "100px" }}>Vai trò:</Text>
                                    <Text style={{ fontSize: "18px" }}>{info.role}</Text>
                                </div>
                            </div>
                        ) : (
                            <Text type="danger">Không thể tải thông tin người dùng</Text>
                        )}
                    </Col>
                </Row>
            </Container>
        </MasterLayout>

    );
};

export default Profile;
