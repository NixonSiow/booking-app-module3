import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";
import { Navbar, Nav, Container, Button } from "react-bootstrap";

const NavigationBar = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            await dispatch(logout());
            localStorage.removeItem("token"); // Remove token from localStorage
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">✂️ Beauty Booking</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {isAuthenticated ? (
                            <Button variant="danger" onClick={handleLogout}>
                                Logout
                            </Button>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                                <Nav.Link as={Link} to="/register">Register</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavigationBar;
