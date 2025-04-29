import axios from "axios";
import React, { FormEvent, useState } from "react";
import { ChangeEvent } from "react";
import { Form } from 'react-bootstrap';
import Api from "../api/Api";
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { ValidationErrors } from "../model/ValidationErrors";

const AddSpecialization: React.FC = () => {

    //State Maintenance
    //State to hold Specializations
    const [specialization, setSpecialization] = useState({
        specializationId: 0,
        specializationName: "",
        createdDate: ""
    })

    // State for general error messages
    const [error, setError] = useState<string | null>(null);

    const [validationErrors, setValidationErrors] = useState<ValidationErrors>({})

    //Hook for programmatic navigation
    const navigate = useNavigate();

    const validateForm = (): boolean => {
        const errors: ValidationErrors = {};

        if (!specialization.specializationName.trim()) errors.specializationName = "Enter Specialization."

        setValidationErrors(errors);
        return Object.keys(errors).length === 0
    }

    const handleSubmit = (async (e: FormEvent) => {

        e.preventDefault();
        if (!validateForm) return;

        try {
            const response = await axios.post(Api.addSpecializations, specialization)
            if (response.status === 200 || response.status === 201) {
                navigate(Api.addSpecializations)
            }
            setError(null);
        } catch (error) {
            setError("Error occure while adding specialization.");
        }

    });

    const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {

        const { name, value, type } = e.target;

        setSpecialization((prev) => ({
            ...prev,
            [name]: type === "number" ? Number(value) : value.trim()
        }));

        setValidationErrors((prev) => ({
            ...prev,
            [name]: ""
        }));
    }

    return (
        <div className="container-fluid mt-4">
            <Form onSubmit={handleSubmit} className="form-floating">
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="specializationName">specialization</Form.Label>
                    <Form.Control
                        id="specializationName"
                        name="specializationName"
                        value={specialization.specializationName}
                        isInvalid={!!validationErrors.specializationName}
                        onChange={handleInputChange}
                    />
                    <Form.Control.Feedback type="invalid">
                        {validationErrors.specializationName}
                    </Form.Control.Feedback>
                </Form.Group>
                <Button variant="primary" type="submit">Add Specialization</Button>
            </Form>
        </div>
    )
}

export default AddSpecialization;