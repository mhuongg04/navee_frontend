import React from 'react';
import { Container, Row, Col, Button, Navbar, Nav, NavDropdown, Image, Card } from 'react-bootstrap';
import Footer from '../../layouts/Footer/footer';
import { FaShoppingCart, FaCheck } from 'react-icons/fa';
import NAVEE_logo from '../../assets/images/logo/NAVEE_logo.png';
import team1 from '../../assets/images/team1.png'
import team3 from '../../assets/images/team3.png'
import team5 from '../../assets/images/team5.jpg'
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
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
                        <Nav className="me-auto">
                            <Nav.Link href="#home" className="fs-5">Trang chủ</Nav.Link>
                            <Nav.Link href="#about" className="fs-5">Về chúng tôi</Nav.Link>
                            <Nav.Link href="#services" className="fs-5">Ưu thế</Nav.Link>
                            <Nav.Link href="#menu" className="fs-5">Khóa học</Nav.Link>
                            <Nav.Link href="#founders" className="fs-5">Đội ngũ NAVEE </Nav.Link>
                            <Nav.Link href="#contact" className="fs-5">Liên hệ</Nav.Link>
                        </Nav>

                        <Nav className='ms-auto'>
                            <Button onClick={() => navigate('/learn')} className="ms-auto" style={{ width: '12rem', fontSize: '18px' }}>
                                Đi đến Lớp học
                            </Button>
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
                                <p className="menu__detail">Khóa học nâng cao</p>
                                <span className="menu__preci">500.000</span>
                                <span className='p-2'></span>
                                <Button variant="outline-primary" className="menu__button">
                                    <i className="bx bx-cart-alt"><FaShoppingCart /></i>
                                </Button>
                            </Col>
                            <Col md={4}>
                                <Image src="https://i.imgur.com/hDggv01.png" alt="Menu Image" className="menu__img" style={{ width: '12rem' }} fluid />
                                <h3 className="mt-2">Gói Premium 3 tháng</h3>
                                <p className="menu__detail">Trải nghiệm phiên bản đầy đủ của NAVEE</p>
                                <span className="menu__preci">80.000VND</span>
                                <span className='p-2'></span>
                                <Button variant="outline-primary" className="menu__button">
                                    <i className="bx bx-cart-alt"><FaShoppingCart /></i>
                                </Button>
                            </Col>
                            <Col md={4}>
                                <Image src="https://i.imgur.com/hDggv01.png" alt="Menu Image" className="menu__img" style={{ width: '12rem' }} fluid />
                                <h3 className="mt-2">Gói Premium 6 tháng</h3>
                                <p className="menu__detail">Trài nghiệm phiên bản nâng cấp của NAVEE</p>
                                <span className="menu__preci">150.000đ</span>
                                <span className='p-2'></span>
                                <Button variant="outline-primary" className="menu__button">
                                    <i className="bx bx-cart-alt"><FaShoppingCart /></i>
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                </section>

                {/*Founders section*/}
                <section
                    id="founders"
                    className="d-flex align-items-center justify-content-center min-vh-100 bg-light"
                    style={{ backgroundColor: '#f8f9fa' }} // Optional background color
                >
                    <Container className="py-5">
                        <Row className="text-center mb-5 pt-5">
                            <Col md={12}>
                                <h3 className="display-4 font-weight-bold">Gặp gỡ đội ngũ NAVEE</h3>
                                <p className="lead">Dự án NAVEE bao gồm nhiều thành viên tới từ nhiều lĩnh vực khác nhau, nhưng tất cả đều cùng hướng tới mục tiêu giúp người khiếm thị vượt qua được rào cản và mở ra những cơ hội mới trong tương lai</p>
                            </Col>
                        </Row>
                        <Row className="d-flex justify-content-center">
                            <Col md={4} className="mb-4">
                                <Card className="border-0 shadow-sm" style={{ height: "27rem" }}>
                                    <Image src={team5} fluid style={{ height: '20rem', width: '100%', objectFit: 'cover' }} />
                                    <Card.Body>
                                        <Card.Text>
                                            Team NAVEE giành chức Á quân Toàn quốc cuộc thi VSIC 2023 - Thử thách sáng tạo khởi nghiệp quốc gia 2023
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={4} className="mb-4">
                                <Card className="border-0 shadow-sm" style={{ height: "27rem" }}>
                                    <Image src={team1} fluid style={{ height: '20rem', width: '100%', objectFit: 'cover' }} />
                                    <Card.Body>
                                        <Card.Text>
                                            NAVEE tại Tòa nhà Xanh Liên Hợp Quốc tham dự hội thảo của UNDP năm 2024
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={4} className="mb-4">
                                <Card className="border-0 shadow-sm" style={{ height: "27rem" }}>
                                    <Image src={team3} fluid style={{ height: '20rem', width: '100%', objectFit: 'cover' }} />
                                    <Card.Body>
                                        <Card.Text>
                                            Team NAVEE tại cuộc thi BASIC 2024 được tổ chức bởi UNDP
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
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
