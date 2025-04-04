import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';


const Register = () => {
    const [userData, setUserData] = useState({ name: '', email: '', password: '' });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(register(userData)).then(({ payload }) => {
            if (payload) navigate('/login');
        });
    };



    return (
        <div className="container mt-5">
            <h2>Register</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" onChange={e => setUserData({ ...userData, name: e.target.value })} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" onChange={e => setUserData({ ...userData, email: e.target.value })} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" onChange={e => setUserData({ ...userData, password: e.target.value })} />
                </Form.Group>
                <Button type="submit" className="mt-3">Register</Button>
            </Form>
        </div>
    );
};

export default Register;
