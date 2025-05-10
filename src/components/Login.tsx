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
    const [user, setUser] = useState<User>()
    const navigate = useNavigate();


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!email.trim() || !password.trim()) {
            setError("Email and password is required!")
        }

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
                    navigate('/doctor');
                } else if (roleIdStr === '4') {
                    navigate('/receptionist');
                } else {
                    navigate('/unauthorized');
                }
            } else {
                setError('Invalid Credentials.')
            }

        } catch (error) {
            setError('Invalid Credentials.')
        }

    }

    return (
        <div className="container mt-5">
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
                                    type="text"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Form.Group>
                            <button className="btn btn-primary w-100" type="submit">
                                Login
                            </button>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;