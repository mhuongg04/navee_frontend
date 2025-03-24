import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { FaUser, FaClone } from 'react-icons/fa';
import { useAuth } from '../../utils/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import NAVEE_logo from '../../assets/images/logo/NAVEE_logo.png';

const Header = () => {
    const navigate = useNavigate();
    const { logoutAuth, role } = useAuth();

    //Xử lý đăng xuất
    const handleLogout = () => {
        logoutAuth();
        navigate('/');
    };

    return (
        <Navbar bg="light" expand="lg" className="shadow-sm">
            <Container fluid>
                {/* Logo */}
                <Navbar.Brand as={Link} to="/">
                    <img
                        src={NAVEE_logo}
                        alt="NAVEE Logo"
                        className="img-fluid"
                        style={{ width: '70px', margin: '0 5px' }}
                    />
                </Navbar.Brand>

                {/* Toggle Button for Responsive */}
                <Navbar.Toggle aria-controls="navbar-nav" />

                {/* Menu Items */}
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/" className="fs-5 text-dark">
                            Trang chủ
                        </Nav.Link>
                        <Nav.Link as={Link} to="/dashboard" className="fs-5 text-dark">
                            Bảng tin
                        </Nav.Link>
                        <Nav.Link as={Link} to="/learn" className="fs-5 text-dark">
                            Học tập
                        </Nav.Link>
                        <Nav.Link as={Link} to="/dictionary" className="fs-5 text-dark">
                            Từ điển
                        </Nav.Link>
                        {/* <Nav.Link as={Link} to="/test" className="fs-5 text-dark">
                            Kiểm tra
                        </Nav.Link> */}
                        {role === "teacher" && <Nav.Link as={Link} to="/management" className="fs-5 text-dark">
                            Quản lý
                        </Nav.Link>}
                    </Nav>

                    {/* Dropdown for User */}
                    <Nav>
                        <Nav.Link description="Flashcard" as={Link} to="/flashcard" className="fs-5 text-dark">
                            <FaClone size={25} style={{ color: '#093673' }} />
                        </Nav.Link>
                        <NavDropdown
                            title={<FaUser size={25} style={{ color: '#093673' }} />}
                            id="user-dropdown"
                            align="end"
                        >
                            <NavDropdown.Item as={Link} to="/profile">
                                Tài khoản
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={handleLogout}>
                                Đăng xuất
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
