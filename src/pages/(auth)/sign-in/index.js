import React, { useState } from "react";
import {
    Button,
    Form,
    Input,
    notification,
    Typography
} from 'antd';
import { useNavigate } from "react-router-dom";
import login from "../api/login.api";
import { AxiosError } from "axios";
import { useAuth } from "../../../utils/AuthContext";
import NAVEE_logo from "../../../assets/images/logo/NAVEE_logo.png"

const { Text } = Typography;

const Login = () => {
    const [api, contextHolder] = notification.useNotification();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { loginAuth } = useAuth();

    const handleLogin = (value) => {
        setLoading(true);
        login({ email: value.email, password: value.password })
            .then((data) => {
                const token = data.accessToken;
                const role = data.role;
                //console.log("role: ", role);
                loginAuth(token, role);
                api.info({
                    message: "Đăng nhập thành công",
                    duration: 2,
                    onClose: () => {
                        navigate("/learn");
                    }
                })
            })
            .catch((error) => {
                if (error instanceof AxiosError) {
                    if (error.response?.status === 401) {
                        api.info({
                            message: "Đăng nhập thất bại",
                            description: "Thông tin đăng nhập không chính xác",
                        })
                    }
                    else if (error.response?.status === 500) {
                        api.info({
                            message: "Đăng nhập thất bại",
                            description: "Lỗi máy chủ",
                        })
                    }
                } else {
                    api.info({
                        message: "Đăng nhập thất bại",
                        description: "Lỗi không xác định"
                    })
                }
            })
            .finally(() => {
                setLoading(false);
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
                        onFinish={handleLogin}
                    >
                        <h1 className="pb-4">Đăng nhập</h1>
                        {/* Email */}
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

                        {/* Mật khẩu */}
                        <Form.Item
                            label="Mật khẩu"
                            name="password"
                            rules={[{ required: true, message: "Hãy điền mật khẩu của bạn!" }]}
                        >
                            <Input.Password placeholder="Điền mật khẩu" />
                        </Form.Item>

                        {/* Nút Đăng nhập */}
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={loading}
                                size="large"
                                className="btn btn-primary w-100"
                            >
                                Đăng nhập
                            </Button>
                        </Form.Item>

                        {/* Đăng ký */}
                        <Text>
                            Chưa có tài khoản?{" "}
                            <a href="/signup" className="text-primary fw-bold">
                                Đăng ký
                            </a>{" "}
                            tại đây
                        </Text>
                    </Form>
                </div>
            </div>
        </div>

    )
}

export default Login;