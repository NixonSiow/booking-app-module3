import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(""); // Reset error state

        try {
            const response = await dispatch(login({ email, password })).unwrap();
            localStorage.setItem("token", response.token); // Store token
            navigate("/"); // Redirect to home after login
        } catch (err) {
            setError(err.message || "Login failed. Please try again.");
        }
    };

    return (
        <div className="container mt-5">
            <h2>Login</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleLogin}>
                <Form.Group controlId="email">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Form.Group>
                <Button type="submit" className="mt-3" disabled={isAuthenticated}>
                    {isAuthenticated ? "Logged In" : "Login"}
                </Button>
            </Form>
        </div>
    );
};

export default Login;
