import React, { useState } from "react";
import { Role } from "../model/Role";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Api from "../api/Api";
import Container from "react-bootstrap/Container";
import { Form } from "react-bootstrap";
import { ValidationErrors } from "../model/ValidationErrors";
import Button from "react-bootstrap/Button";

const AddRole: React.FC = () => {


    //state to hold Role
    const [role, setRole] = useState({
        roleId: 0,
        role: "",
        responsibility: ""
    });

    // State for general error messages
    const [error, setError] = useState<string | null>(null)

    // State for form validation errors
    const [validationErrors, setValidationErrors] = useState<ValidationErrors>({})

    // Hook for programmatic navigation
    const navigate = useNavigate()

    const validateForm = (): boolean => {

        const errors: ValidationErrors = {}

        if (!role.role.trim()) errors.role = "Role field is required."
        if (!role.responsibility.trim()) errors.responsibility = "Enter Responsibility for the role."

        setValidationErrors(errors)
        return Object.keys(errors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!validateForm) return;

        try {
            const response = await axios.post(Api.addRole, role)
            if (response.status === 200 || response.status === 201) {
                navigate(Api.addRole)
            }
        } catch (error) {

        }
    }

    const handleInputChange = (async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;

        setRole((prev) => ({
            ...prev,
            [name]: type === "number" ? Number(value) : value.trim()
        }));

        setValidationErrors((prev) => ({
            ...prev,
            [name]: ""
        }));
    })
    return (
        <div className="container-fluid mt-5">
            <Container>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <div className="row g-2 align-items-center">
                            <div className="col-2">
                                <Form.Label htmlFor="role">Role</Form.Label>
                            </div>
                            <div className="col-8 mt-4">
                                <Form.Control
                                    id="role"
                                    name="role"
                                    type="text"
                                    value={role.role}
                                    isInvalid={!!validationErrors.role}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {validationErrors.role}
                                </Form.Control.Feedback>
                            </div>
                        </div>
                    </Form.Group>
                    <Form.Group>
                        <div className="row g-2 align-items-center">
                            <div className="col-2">
                                <Form.Label htmlFor="responsibility">Responsibilities</Form.Label>
                            </div>
                            <div className="col-8 mt-4">
                                <Form.Control
                                    id="responsibility"
                                    as="textarea"
                                    rows={3}
                                    name="responsibility"
                                    value={role.responsibility}
                                    isInvalid={!!validationErrors.responsibility}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {validationErrors.responsibility}
                                </Form.Control.Feedback>
                            </div>
                            <div className="col-2 align-item-bottom">
                                <Button variant="primary" type="submit">
                                    Add Role
                                </Button>
                            </div>
                        </div>
                    </Form.Group>

                </Form>
            </Container>
        </div>
    )
}

export default AddRole;