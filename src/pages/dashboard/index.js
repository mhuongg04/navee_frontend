import React from 'react';
import { Container, Row, Col, Button, Navbar, Nav, NavDropdown, Image } from 'react-bootstrap';
import Footer from '../../layouts/Footer/footer';
import { FaShoppingCart, FaCheck } from 'react-icons/fa';
import NAVEE_logo from '../../assets/images/logo/NAVEE_logo.png';

const Dashboard = () => {
    return (
        <div>
            {/* Scroll Top */}
            <a href="#" className="scrolltop" id="scroll-top">
                <i className="bx bx-chevron-up scrolltop__icon"></i>
            </a>

            {/* Header */}
            <Navbar bg="light" expand="lg" className="l-header" style={{
                position: 'sticky',
                top: 0,
                zIndex: 1000,
                backgroundColor: '#fff',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
            }}>
                <Container>
                    <Navbar.Brand href="/">
                        <img
                            src={NAVEE_logo}
                            alt="NAVEE Logo"
                            style={{ width: '5rem' }} />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbar-nav" id="nav-toggle" />
                    <Navbar.Collapse id="navbar-nav">
                        <Nav className="ml-auto">
                            <Nav.Link href="#home" className="fs-5">Home</Nav.Link>
                            <Nav.Link href="#about" className="fs-5">About</Nav.Link>
                            <Nav.Link href="#services" className="fs-5">Advantage</Nav.Link>
                            <Nav.Link href="#menu" className="fs-5">Class</Nav.Link>
                            <Nav.Link href="#contact" className="fs-5">Contact us</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Main Section */}
            <main className="l-main">
                {/* Home Section */}
                <section
                    id="home"
                    className="d-flex align-items-center justify-content-center min-vh-100"
                >
                    <Container>
                        <Row className="align-items-center mt-5 mb-5">
                            <Col md={6} className='px-5'>
                                <h1 className="text-start mt-4 fw-bold" style={{ fontSize: '4rem', color: '#093673' }}>
                                    NAVEE
                                </h1>
                                <h2 className="text-start mt-2">Nền tảng học Tiếng Anh dành cho người khiếm thị</h2>
                                <div className='text-start'>
                                    <Button href="/learn" variant="primary" className="ml-0 px-3 py-2 fs-5 mt-4">
                                        Đi đến lớp học
                                    </Button>
                                </div>
                            </Col>
                            <Col md={6}>
                                <Image src="https://i.imgur.com/QkigPQm.png" alt="Home Image" className="mt-6" style={{ width: '50rem' }} fluid />
                            </Col>
                        </Row>
                    </Container>
                </section>

                {/* About Section */}
                <section
                    id="about"
                    className="d-flex align-items-center justify-content-center min-vh-100"
                >
                    <Container className="mt-5 mb-5">
                        <Row className="align-items-center mt-5 mb-5 py-3">
                            <Col md={6}>
                                <Image src="https://i.imgur.com/VmpVvz8.png" alt="About Image" style={{ width: '20rem' }} fluid />
                            </Col>
                            <Col md={6}>
                                <h2 className="text-start mt-4 fw-bold" style={{ fontSize: '3rem', color: '#093673' }}>NAVEE là ai?</h2>
                                <p className="text-start mt-3" style={{ fontSize: '1.2rem' }}>
                                    "Chào mừng bạn đến với NAVEE - nền tảng học tiếng Anh trực tuyến dành riêng cho người khiếm thị. Với công nghệ hỗ trợ hiện đại và phương pháp học tập dễ tiếp cận, chúng tôi giúp mọi người chinh phục tiếng Anh một cách hiệu quả và tự tin hơn."
                                </p>
                            </Col>
                        </Row>
                    </Container>
                </section>

                {/* Advantage Section */}
                <section
                    id="services"
                    className="d-flex align-items-center justify-content-center min-vh-100"
                >
                    <Container>
                        <h2 className="mb-5">Chúng tôi mang trong mình nhiều ưu điểm</h2>
                        <Row>
                            <Col md={4}>
                                <FaCheck className="ms-2 mb-3" style={{ color: '#093673', fontSize: '3rem' }} />
                                <h3 className="mb-3">Khả năng tiếp cận</h3>
                                <p className="services__description">Naveeclass+ được thiết kế để có thể tiếp cận với người khiếm thị.</p>
                            </Col>
                            <Col md={4}>
                                <FaCheck className="ms-2 mb-3" style={{ color: '#093673', fontSize: '3rem' }} />
                                <h3 className="mb-3">Phương pháp học</h3>
                                <p className="services__description">Luôn có những phương pháp học đặc biệt và hiệu quả cao.</p>
                            </Col>
                            <Col md={4}>
                                <FaCheck className="ms-2 mb-3" style={{ color: '#093673', fontSize: '3rem' }} />
                                <h3 className="mb-3">Cộng đồng thân thiện</h3>
                                <p className="services__description">Naveeclass+ luôn có một cộng đồng có thể hỗ trợ lẫn nhau.</p>
                            </Col>
                        </Row>
                    </Container>
                </section>

                {/* Menu Section */}
                <section
                    id="menu"
                    className="d-flex align-items-center justify-content-center min-vh-100"
                >
                    <Container>
                        <h2 className="mb-5">Tham khảo các lớp học của chúng tôi</h2>
                        <Row>
                            <Col md={4}>
                                <Image src="https://i.imgur.com/hDggv01.png" alt="Menu Image" className="menu__img" style={{ width: '12rem' }} fluid />
                                <h3 className="mt-2">Listening Lab</h3>
                                <p className="menu__detail">Lớp học kĩ năng nghe</p>
                                <span className="menu__preci">$22.00</span>
                                <span className='p-2'></span>
                                <Button variant="outline-primary" className="menu__button">
                                    <i className="bx bx-cart-alt"><FaShoppingCart /></i>
                                </Button>
                            </Col>
                            <Col md={4}>
                                <Image src="https://i.imgur.com/hDggv01.png" alt="Menu Image" className="menu__img" style={{ width: '12rem' }} fluid />
                                <h3 className="mt-2">Speaking Space</h3>
                                <p className="menu__detail">Lớp học phát âm</p>
                                <span className="menu__preci">$12.00</span>
                                <span className='p-2'></span>
                                <Button variant="outline-primary" className="menu__button">
                                    <i className="bx bx-cart-alt"><FaShoppingCart /></i>
                                </Button>
                            </Col>
                            <Col md={4}>
                                <Image src="https://i.imgur.com/hDggv01.png" alt="Menu Image" className="menu__img" style={{ width: '12rem' }} fluid />
                                <h3 className="mt-2">Vocabulary Vault</h3>
                                <p className="menu__detail">Lớp luyện từ vựng</p>
                                <span className="menu__preci">$9.50</span>
                                <span className='p-2'></span>
                                <Button variant="outline-primary" className="menu__button">
                                    <i className="bx bx-cart-alt"><FaShoppingCart /></i>
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                </section>

                {/* Contact Section */}
                <section
                    id="contact"
                    className="d-flex align-items-center justify-content-center min-vh-100"
                >
                    <Container>
                        <h2 className="fs-1">Trò chuyện với chúng tôi</h2>
                        <p className="fs-4 mb-4 mt-4" >Hãy chia sẻ cho chúng tôi những điều mà bạn còn thắc mắc về chúng tôi. Nó sẽ giúp chúng ta hiểu nhau hơn.</p>
                        <Button variant="primary" className='px-4 py-2 fs-5'>Liên hệ ngay</Button>
                    </Container>
                </section>
            </main>

            <Footer />
        </div>
    );
}

export default Dashboard;
