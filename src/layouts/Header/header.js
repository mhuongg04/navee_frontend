//import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
//import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './header.css';
import NAVEE_logo from '../../assets/images/logo/NAVEE_logo.png';
import { FaUser, FaBell } from 'react-icons/fa';

const Header = () => {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container fluid>
                <Navbar.Brand href="/">
                    <img
                        src={NAVEE_logo}
                        alt="NAVEE Logo"
                        style={{ width: '70px', margin: '0px 5px' }} />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0 navbar-custom"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link href="/" className="fs-5">Home</Nav.Link>
                        <Nav.Link href="/learn" className="fs-5">Learn</Nav.Link>
                        <Nav.Link href="/assignment" className="fs-5">Assignment</Nav.Link>
                        <Nav.Link href="/test" className="fs-5">Test</Nav.Link>
                    </Nav>
                    {/* <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2 custom-search-input"
                            aria-label="Search"
                        />
                        <Button className="custom-search-btn" variant="outline-success">Search</Button>
                    </Form> */}
                </Navbar.Collapse>
                {/* <NavDropdown
                    title={<FaBell size={24} />}
                    id="navbarScrollingDropdown"
                    align="end"
                    className='mx-4'
                    style={{ color: '#093673' }}>
                    <NavDropdown.Item href="#action1">New comment on your post</NavDropdown.Item>
                    <NavDropdown.Item href="#action2">New like on your post</NavDropdown.Item>
                    <NavDropdown.Item href="#action3">New friend request</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action4">See all notifications</NavDropdown.Item>
                </NavDropdown>
                <a href="/profile" className='me-4'>
                    <FaUser size={25} style={{ color: '#093673' }} />
                </a> */}

            </Container>
        </Navbar >
    );
}

export default Header;