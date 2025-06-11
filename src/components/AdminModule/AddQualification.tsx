import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { Form } from "react-bootstrap";
import { ValidationErrors } from "../../models/ValidationErrors";
import Button from "react-bootstrap/Button";
import apiService from "../../api/apiService";

const AddQualification: React.FC = () => {

    const today = new Date().toISOString().split('T')[0];

    //state to hold qualification
    const [qualification, setQualification] = useState({
        qualification: "",
        // qualifiedOn: "",
        createdDate: today,
        active: true
    });

    // State for general error messages
    const [error, setError] = useState<string | null>(null)

    // set success message
    const [succesMessage, setSuccesMessage] = useState<string | null>(null)

    // State for form validation errors
    const [validationErrors, setValidationErrors] = useState<ValidationErrors>({})

    // Hook for programmatic navigation
    const navigate = useNavigate()

    const validateForm = (): boolean => {

        const errors: ValidationErrors = {}

        if (!qualification.qualification.trim()) errors.qualification = "Qualification field is required."
        // if (!qualification.qualifiedOn.trim()) errors.qualifiedOn = "Enter qualified On date for the role."

        setValidationErrors(errors)
        return Object.keys(errors).length === 0
    }


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!validateForm()) return;

        try {
            const response = await apiService.addQualification(qualification)

            if (response.status === 200 || response.status === 201) {
                // Clear the input field after success:
                setQualification({
                    qualification: "",
                    // qualifiedOn: "",
                    createdDate: today,
                    active: true
                });
                setSuccesMessage("Qualification added succesfully!")
                navigate(`/admin/qualificationList`, { state: { shouldRefresh: true } })

            }
        } catch (error) {
            setError("Error adding role:");
        }
    }

    const handleInputChange = (async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;

        setQualification((prev) => ({
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
                {succesMessage && <div className="alert alert-success" role="alert">
                    {succesMessage}
                </div>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <div className="row g-2 align-items-center">
                            <div className="col-2">
                                <Form.Label htmlFor="qualification">Qualification</Form.Label>
                            </div>
                            <div className="col-8 mt-4">
                                <Form.Control
                                    id="qualification"
                                    name="qualification"
                                    type="text"
                                    value={qualification.qualification}
                                    onChange={handleInputChange}
                                    isInvalid={!!validationErrors.qualification}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {validationErrors.qualification}
                                </Form.Control.Feedback>
                            </div>
                            <div className="col-2 align-item-bottom">
                                <Button variant="primary" type="submit">
                                    Add
                                </Button>
                            </div>
                        </div>
                    </Form.Group>
                </Form>
            </Container>
        </div>
    )
}

export default AddQualification;