import axios from "axios";
import React, { FormEvent, useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import apiService from "../api/apiService";
import { User } from "../models/User";

interface LoginProps {
    onLoginSuccess: (userName: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    //const [user, setUser] = useState<User>()
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!email.trim() || !password.trim()) {
            setError("Email and password are required!");
            return;
        }

        setLoading(true);
        try {
            const response = await apiService.login({ email, password });
            const user = response.data.data;
            const roleId = user.role;
            const userName = user.userName;
            const token = user.accessToken;
            const userId = user.userId;
            onLoginSuccess(userName);


            if (token) {
                localStorage.setItem('authToken', token)
                localStorage.setItem('userName', userName)
                localStorage.setItem('roleId', roleId)
                localStorage.setItem('userId', userId)
                const roleIdStr = String(roleId); // force to string


                // Navigate based on roleId
                if (roleIdStr === '1') {
                    navigate('/admin');
                } else if (roleIdStr === '2') {
                    navigate('/manager');
                } else if (roleIdStr === '3') {
                    navigate('/doctorDash');
                } else if (roleIdStr === '4') {
                    navigate('/reception');
                } else {
                    navigate('/unauthorized');
                }
            } else {
                setError('Invalid Credentials.')
            }

        } catch (error: any) {
            if (axios.isAxiosError(error) && error.response?.data) {
                setError(error.response.data);
            } else {
                setError('Invalid Credentials.');
            }
        }
        finally {
            setLoading(false);
        }

    }

    return (
        <div className="container mt-5">
            {error && <div className="alert alert-danger mt-2">{error}</div>}
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <div className="card p-4">
                        <h2 className="text-center mb-4">Login</h2>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    name="email"
                                    type="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>password</Form.Label>
                                <Form.Control

                                    name="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Form.Group>
                            <button className="btn btn-primary w-100" type="submit">
                                Login
                            </button>
                            <div className="text-center my-3"><strong>OR</strong></div>
                            <button className="btn btn-secondary w-100" type="button" onClick={() => navigate('/signup')}>
                                SignUp
                            </button>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;