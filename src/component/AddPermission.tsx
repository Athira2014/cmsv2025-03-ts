import axios from "axios";
import React, { FormEvent, useState } from "react";
import Api from "../api/Api";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { ValidationErrors } from "../model/ValidationErrors";

const AddPermission: React.FC = () => {

    const [permissionObj, setPermissionObj] = useState({
        permissionId: 0,
        permission: ""
    })

    const [error, setError] = useState<string | null>(null)

    const [validationErrors, setValidationErrors] = useState<ValidationErrors>({})

    // Hook for programmatic navigation
    const navigate = useNavigate();

    const validateForm = (): boolean => {
        const errors: ValidationErrors = {}
        if (!permissionObj.permission.trim()) errors.permission = "Enter permission."
        setValidationErrors(errors);
        return Object.keys(errors).length === 0
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!validateForm) return;

        try {
            const response = await axios.post(Api.addPermission, permissionObj)
            if (response.status === 200 || response.status === 201) {
                navigate(`${Api.permissionList}`)
            }
            setError(null)
        } catch (error) {
            setError("Error occured when adding permission")
        }
    }
    //Input Change Handlers
    // Handles changes for input fields, converts to number if needed, clears validation errors
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const { name, type, value } = e.target;
        setPermissionObj((prev) => ({
            ...prev,
            [name]: type === "number" ? Number(value) : value.trim()
        }));

        setValidationErrors((prev) => ({
            ...prev,
            [name]: ""
        }))
    }

    return (
        <div className="container-fluid mt-4">
            <Form onSubmit={handleSubmit}>
                <div className="row g-3 align-items-center mb-4">
                    <div className="col g-3 align-items-center ms-3 mb-4">
                        <Form.Group>
                            <Form.Label htmlFor="permission">Permission</Form.Label>
                            <Form.Control
                                id="permission"
                                name="permission"
                                type="text"
                                value={permissionObj.permission}
                                onChange={handleInputChange}
                                isInvalid={!!validationErrors.permission}
                            />
                            <Form.Control.Feedback type="invalid">
                                {validationErrors.permission}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </div>
                    <div className="col">
                        <Button variant="primary" type="submit">Add Permission</Button>
                    </div>
                </div>
            </Form>
        </div>
    )
}

export default AddPermission;