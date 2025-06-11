import { FormEvent, useEffect, useState } from "react";
import { Staff } from "../models/Staff";
import apiService from "../api/apiService";
import axios from "axios";
import { ValidationErrors } from "../models/ValidationErrors";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";

const SignUp: React.FC = () => {

    const [signUpObj, setSignUpObj] = useState({
        staffId: 0,
        userName: "",
        roleId: 0,
        email: "",
        password: ""
    })
    const [error, setError] = useState<string | null>(null);
    const [staffEmail, setStaffEmail] = useState('');
    const [staff, setStaff] = useState<Staff>();
    const [loading, setLoading] = useState(false);
    const [validationErrors, setValidationErrors] = useState<ValidationErrors>({})
    const navigate = useNavigate();


    const fetchStaff = (async () => {
        try {
            setLoading(true);
            const response = await apiService.getStaffByEmailId(staffEmail);
            setStaff(response.data.data)
        } catch (error: any) {
            if (axios.isAxiosError(error) && error.response?.data) {
                setError(error.response.data);
            } else {
                setError('Invalid email or no staff found with the email id provided.');
            }
        } finally {
            setLoading(false);
        }
    })

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (staffEmail.includes('@')) {
                fetchStaff();
            }
        }, 600); // 600ms debounce

        return () => clearTimeout(timeout); // Clear if user types again
    }, [staffEmail]);

    useEffect(() => {
        if (staff) {
            setSignUpObj((prev) => ({
                ...prev,
                staffId: staff.staffId ?? "",
                roleId: staff.roleId ?? "",
                email: staff.email ?? ""
            }));
        }
    }, [staff])


    const validateForm = (): boolean => {
        const errors: ValidationErrors = {};
        if (!signUpObj.email) errors.email = "Email is required.";
        if (!signUpObj.staffId) errors.staffId = "StaffId is required."
        if (!signUpObj.roleId) errors.roleId = "RoleId is required."
        if (!signUpObj.password.trim()) errors.password = "Password is required."
        if (!signUpObj.userName.trim()) errors.userName = "User name is required."

        setValidationErrors(errors)
        return Object.keys(errors).length === 0
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            const response = await apiService.createUserRegistration(signUpObj)
            if (response.status === 200) {
                navigate('/login');
            }
        } catch (error: any) {
            if (axios.isAxiosError(error) && error.response?.data) {
                setError(error.response.data);
            } else {
                setError('Invalid email or no staff found with the email id provided.');
            }
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;

        setSignUpObj((prev) => ({
            ...prev,
            [name]: type === "number" ? Number(value) : value.trim()
        }))
        setValidationErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    }

    const handleEmailChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setStaffEmail(e.target.value.trim());
        setValidationErrors((prev) => ({
            ...prev,
            email: "",
        }));
    };


    return (
        <div className="container mt-5">
            {loading && <p>Loading staff info...</p>}
            {error && (
                <div className="alert alert-danger mt-2">
                    {typeof error === "string" ? error : JSON.stringify(error)}
                </div>
            )}
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <div className="card p-4">
                        <h2 className="text-center mb-4">Sign Up</h2>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    name="email"
                                    type="text"
                                    value={signUpObj.email}
                                    onChange={(e) => handleEmailChange(e)}
                                    onBlur={fetchStaff} // Fetches staff when user leaves the input
                                    isInvalid={!!validationErrors.email}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {validationErrors.email}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>staff Id</Form.Label>
                                <Form.Control
                                    name="staffId"
                                    type="text"
                                    value={signUpObj.staffId}
                                    readOnly
                                    isInvalid={!!validationErrors.staffId}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {validationErrors.staffId}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Role Id</Form.Label>
                                <Form.Control
                                    name="roleId"
                                    type="text"
                                    value={signUpObj.roleId}
                                    readOnly
                                    isInvalid={!!validationErrors.roleId}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {validationErrors.roleId}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Username</Form.Label>
                                <Form.Control

                                    name="userName"
                                    type="text"
                                    value={signUpObj.userName}
                                    onChange={handleInputChange}
                                    isInvalid={!!validationErrors.userName} />
                                <Form.Control.Feedback type="invalid">
                                    {validationErrors.userName}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    name="password"
                                    type="password"
                                    value={signUpObj.password}
                                    onChange={handleInputChange}
                                    isInvalid={!!validationErrors.password} />
                                <Form.Control.Feedback type="invalid">
                                    {validationErrors.password}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <button className="btn btn-primary w-100" type="submit">
                                Register
                            </button>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp;