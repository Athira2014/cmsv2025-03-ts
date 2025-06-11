import React, { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ValidationErrors } from "../../models/ValidationErrors";
import apiService from "../../api/apiService";
import { Button, Container, Form } from "react-bootstrap";
import { LabTestCategory } from "../../models/LabTestCategory";

const AddLabTest: React.FC = () => {

    const userId = localStorage.getItem("userId")
    const [Categories, setCategories] = useState<LabTestCategory[]>([])
    const today = new Date().toISOString().split('T')[0]; // "YYYY-MM-DD"

    const [test, setTest] = useState({
        labTestsId: 0,
        testName: "",
        description: "",
        parameters: "",
        createdDate: today,
        isActive: true,
        labTestCatId: 0
    })

    // State for general error messages
    const [error, setError] = useState<string | null>(null);

    // Hook for programmatic navigation
    const navigate = useNavigate();

    // State for form validation errors
    const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

    const [isLoading, setIsLoading] = useState(false)

    const fetchLabTestCategories = useCallback(async () => {

        try {
            setIsLoading(true);
            const response = await apiService.getLabTestCategories();
            setCategories(response.data.data);
            setError(null);
        } catch {
            setError("Error occurred while fetching Lab Test Categories.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchLabTestCategories();
    }, []);


    const validateForm = (): boolean => {
        const errors: ValidationErrors = {};
        if (!test?.testName) errors.testName = "Test name is required.";
        if (!test?.labTestCatId) errors.labTestCatId = "Test category is required.";
        if (!test?.description) errors.description = "Test description is required.";
        if (!test?.parameters) errors.parameters = "Test parameter is required.";
        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        if (!validateForm()) return;

        try {
            const response = await apiService.addLabTest(test)
            setTest(response.data.data)
            setError(null)
        } catch (error) {
            setError("Error occured while creating new lab test.")
        }
    }

    const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target

        setTest((prev) => ({
            ...prev,
            [name]: type === "number" ? Number(value) : value
        }))

        setValidationErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    }

    const handleSelectChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value, type } = e.target

        setTest((prev) => ({
            ...prev,
            [name]: Number(value)
        }))

        setValidationErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    }

    return (
        <div className="container-fluid mt-5">
            <div className="card shadow p-4">
                <Container>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h1>Add New Laboratory Test</h1>
                        <Link to={`/laboratory`} className="btn btn-secondary">
                            <i className="fas fa-arrow-right"></i> Back
                        </Link>
                    </div>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Test Category</Form.Label>
                            <Form.Select
                                id="labTestCatId"
                                as="select"
                                name="labTestCatId"
                                value={test?.labTestCatId ?? ""}
                                onSelect={handleSelectChange}
                                isInvalid={!!validationErrors.labTestCatId}
                            >
                                <option value="">Select Category</option>
                                {Categories?.map(category => (
                                    <option key={category.labTestCatId} value={category.labTestCatId}>
                                        {category.category}
                                    </option>

                                ))
                                }
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                {validationErrors.labTestCatId}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="testName">Test Name</Form.Label>
                            <Form.Control
                                id="testName"
                                type="text"
                                name="testName"
                                value={test?.testName ?? ""}
                                onSelect={handleInputChange}
                                isInvalid={!!validationErrors.testName}
                            />
                            <Form.Control.Feedback type="invalid">
                                {validationErrors.testName}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="description">Description</Form.Label>
                            <Form.Control
                                id="description"
                                type="text"
                                name="description"
                                value={test?.description ?? ""}
                                onSelect={handleInputChange}
                                isInvalid={!!validationErrors.description}
                            />
                            <Form.Control.Feedback type="invalid">
                                {validationErrors.description}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="parameters">Parameters</Form.Label>
                            <Form.Control
                                id="parameters"
                                type="text"
                                name="parameters"
                                value={test?.parameters ?? ""}
                                onSelect={handleInputChange}
                                isInvalid={!!validationErrors.description}
                            />
                            <Form.Control.Feedback type="invalid">
                                {validationErrors.parameters}
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

export default AddLabTest;