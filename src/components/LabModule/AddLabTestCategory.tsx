import React, { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ValidationErrors } from "../../models/ValidationErrors";
import apiService from "../../api/apiService";
import { Button, Container, Form } from "react-bootstrap";

const AddLabTestCategory: React.FC = () => {
    const today = new Date().toISOString().split('T')[0]; // "YYYY-MM-DD"

    const [category, setCategory] = useState({
        labTestCatId: 0,
        category: "",
        isActive: true,
        createdDate: today,
    })

    // State for general error messages
    const [error, setError] = useState<string | null>(null);
    // set success message
    const [succesMessage, setSuccesMessage] = useState<string | null>(null)
    // Hook for programmatic navigation
    const navigate = useNavigate();

    // State for form validation errors
    const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

    const [isLoading, setIsLoading] = useState(false)

    const validateForm = (): boolean => {
        const errors: ValidationErrors = {};
        if (!category?.category) errors.category = "Category name is required.";
        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        if (!validateForm()) return;

        try {
            const response = await apiService.addLabTestCategories(category)
            setCategory(response.data.data)
            if (response.status === 200 || response.status === 201) {
                setSuccesMessage("Category added succesfully!")
                navigate(`/admin/roles`)
            
            }
            setError(null)
        } catch (error) {
            setError("Error occured while creating new lab test.")
        }
    }

    const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target

        setCategory((prev) => ({
            ...prev,
            [name]: type === "number" ? Number(value) : value
        }))

        setValidationErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    }

    return (
        <div className="container-fluid mt-5">
            <div className="card shadow p-4">
                 {succesMessage && <div className="alert alert-success" role="alert">
                    {succesMessage}
                </div>}
                <Container>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h1>Add New Laboratory Test</h1>
                        <Link to={`/laboratory`} className="btn btn-secondary">
                            <i className="fas fa-arrow-right"></i> Back
                        </Link>
                    </div>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="category">Test Category Name</Form.Label>
                            <Form.Control
                                id="category"
                                type="text"
                                name="category"
                                value={category?.category ?? ""}
                                onChange={handleInputChange}
                                isInvalid={!!validationErrors.testName}
                            />
                            <Form.Control.Feedback type="invalid">
                                {validationErrors.testName}
                            </Form.Control.Feedback>
                        </Form.Group>
                        {/* Submit Button */}
                        <Button variant="primary" type="submit">Submit</Button>
                    </Form>
                    {error && <p className="text-danger mt-3">{error}</p>}
                </Container>
            </div>
        </div>
    )


}

export default AddLabTestCategory;