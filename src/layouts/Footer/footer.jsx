import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebookF, FaGoogle, FaGem, FaHome, FaEnvelope, FaPhone, FaPrint, FaTiktok } from 'react-icons/fa';
import NAVEE_logo from '../../assets/images/logo/NAVEE_logo.png';

const Footer = () => {
    return (
        <footer className="text-center text-lg-start bg-light text-muted">
            <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
                <div className="me-5 d-none d-lg-block">
                    <span>Get connected with us on social networks:</span>
                </div>
                <div>
                    <a href="https://www.facebook.com/NAVEEapp" className="me-4 text-reset">
                        <FaFacebookF />
                    </a>
                    <a href="#" className="me-4 text-reset">
                        <FaGoogle />
                    </a>
                    <a href="https://www.tiktok.com/@navee_hoctienganhcungban" className="me-4 text-reset">
                        <FaTiktok />
                    </a>

                </div>
            </section>

            <section className="">
                <Container className="text-center text-md-start mt-5">
                    <Row className="mt-3">
                        <Col md={3} lg={4} xl={3} className="mx-auto mb-4">
                            <h4 className="fw-bold mb-4">
                                <img
                                    src={NAVEE_logo}
                                    alt="NAVEE Logo"
                                    style={{ width: '100px', marginRight: '20px' }} />
                            </h4>
                            <h6 className="fw-bold">NAVEE - Navigate your English journey</h6>
                            <p>
                                Chúng tôi đồng hành cùng trải nghiệm học Tiếng Anh của người khiếm thị
                            </p>
                        </Col>

                        <Col md={2} lg={2} xl={2} className="mx-auto mb-4">
                            <h6 className="text-uppercase fw-bold mb-4">About us</h6>
                            <p><a href="/" className="text-reset">Who is NAVEE?</a></p>
                            <p><a href="/" className="text-reset">Our founders</a></p>
                            <p><a href="/" className="text-reset">Our journey</a></p>
                            <p><a href="/" className="text-reset">NAVEEClass+</a></p>
                        </Col>

                        <Col md={3} lg={2} xl={2} className="mx-auto mb-4">
                            <h6 className="text-uppercase fw-bold mb-4">Service</h6>
                            <p><a href="#!" className="text-reset">Pricing</a></p>
                            <p><a href="#!" className="text-reset">Settings</a></p>
                            <p><a href="#!" className="text-reset">Orders</a></p>
                            <p><a href="#!" className="text-reset">Help</a></p>
                        </Col>

                        <Col md={4} lg={3} xl={3} className="mx-auto mb-md-0 mb-4">
                            <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                            <p><FaHome className="me-3" /> Ha Noi, Viet Nam</p>
                            <p><FaEnvelope className="me-3" />naveegateyourjourney@gmail.com</p>
                            <p><FaPhone className="me-3" /> (+84) 96.844.64.17</p>
                        </Col>
                    </Row>
                </Container>
            </section>

            <div className="text-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
                © 2024 Developed by NAVEE. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
