import React, { useState } from "react";
import {
    Button,
    Col,
    Form,
    Input,
    notification,
    Row,
    Select,
    Typography
} from 'antd';
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import signup from "../api/signup.api";
import NAVEE_logo from "../../../assets/images/logo/NAVEE_logo.png"
import { useAuth } from "../../../utils/AuthContext";

const { Text } = Typography;
const { Option } = Select;

const Signup = () => {
    const [role, setRole] = useState("");
    const [api, contextHolder] = notification.useNotification();
    const [loading, setLoading] = useState(false);

    const handleSignup = (value) => {
        setLoading(true);
        console.log(value)
        signup({
            firstname: value.firstname,
            lastname: value.lastname,
            email: value.email,
            password: value.password,
            role: value.role
        }).then((data) => {

            api.info({
                message: "Đăng ký thành công",
                duration: 2,
            })
            localStorage.setItem('token', data.accessToken)
        })
            .catch(error => {
                if (error instanceof AxiosError) {
                    if (error.response?.status === 400) {
                        api.info({
                            message: 'Tạo tài khoản thất bại',
                            description: 'Hãy thử sử dụng một username khác',
                        })
                    }
                    else if (error.response?.status === 500) {
                        api.info({
                            message: 'Đăng nhập thất bại',
                            description: 'Lỗi máy chủ',
                        })
                    }

                    else {
                        api.info({
                            message: 'Đăng nhập thất bại',
                            description: 'Lỗi không xác định',
                        })
                    }
                    console.error(error)
                }
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <div className="row align-items-center min-vh-100 p-6">
            {/* Cột trái */}
            <div className="col-md-5 text-start mb-4 mb-md-0 px-4">
                <img
                    src={NAVEE_logo}
                    alt="NAVEE Logo"
                    className="img-fluid"
                    style={{ width: '12rem' }}
                />
                <h1 className="display-3 fw-bold text-primary px-4">Join us today</h1>
                <h3 className="px-4" style={{ color: '#093673' }}>Chúng tôi đồng hành cùng trải nghiệm học Tiếng Anh của người khiếm thị</h3>
            </div>

            {/* Cột phải */}
            <div className="col-md-7 px-5">
                {contextHolder}
                <div className="card p-4 shadow-sm">
                    <Form
                        initialValues={{ remember: true }}
                        onFinish={handleSignup}
                    >
                        <h1 className="pb-4">Đăng ký</h1>
                        <Row>
                            <Col>
                                <Form.Item
                                    label="Tên"
                                    name="firstname"
                                    rules={[
                                        { required: true, message: "Hãy điền tên của bạn!" },
                                    ]}
                                >
                                    <Input placeholder="Điền tên của bạn" />
                                </Form.Item>
                            </Col>
                            <Col className="px-4">
                                <Form.Item
                                    label="Họ"
                                    name="lastname"
                                >
                                    <Input placeholder="Điền họ của bạn" />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                { required: true, message: "Hãy điền email của bạn!" },
                                { type: "email", message: "Hãy điền đúng dạng email!" }
                            ]}
                        >
                            <Input placeholder="Điền email của bạn" />
                        </Form.Item>
                        <Form.Item
                            label="Mật khẩu"
                            name="password"
                            rules={[
                                { required: true, message: "Hãy điền mật khẩu của bạn!" }
                            ]}>
                            <Input placeholder="Điền mật khẩu" />
                        </Form.Item>
                        <Form.Item label="Vai trò" name="role">
                            <Select
                                placeholder="Chọn vai trò"
                                onChange={(value) => setRole(value)}
                                value={role}
                            >
                                <Option value="teacher">Giáo viên</Option>
                                <Option value="user">Học sinh</Option>
                            </Select>

                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={loading}
                                size="large"
                                className="btn btn-primary w-100">
                                Đăng ký
                            </Button>
                        </Form.Item>

                        <Form.Item>
                            <Text>
                                Đã có tài khoản? <a href="/login" className="text-primary fw-bold">Đăng nhập</a> tại đây
                            </Text>
                        </Form.Item>

                    </Form>
                </div>
            </div>
        </div >
    )
}

export default Signup;