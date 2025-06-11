import React, { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ValidationErrors } from "../../models/ValidationErrors";
import apiService from "../../api/apiService";
import { Button, Container, Form } from "react-bootstrap";
import { LabTestCategory } from "../../models/LabTestCategory";
import { LabTestDetails } from "../../models/LabTestDetails";

const AddTestResult: React.FC = () => {

    const userId = localStorage.getItem("userId")
    const today = new Date().toISOString().split('T')[0]; // "YYYY-MM-DD"
    const [testDetail, setTestDetail] = useState({
        labTestDetId: 0,
        dateAndTime: today,
        remarks: "",
        isActive: true,
        labPrescId: 0
    })

    const [testResult, setTestResult] = useState({
        labTestResId: 0,
        labTestDetId: 0,
        description: "",
        result: 0,
        flag: "",
        createdDate: today,
        isActive: true
    })

    // State for general error messages
    const [error, setError] = useState<string | null>(null);

    // Hook for programmatic navigation
    const navigate = useNavigate();

    // State for form validation errors
    const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

    const [isLoading, setIsLoading] = useState(false)

    const validateForm = (): boolean => {
        const errors: ValidationErrors = {};
        if (!testDetail?.labPrescId || testDetail?.labPrescId === 0)
            errors.description = "Prescription Id is required.";
        if (!testResult?.description) errors.description = "description is required.";
        if (!testResult?.result) errors.result = "Test result is required.";
        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        if (!validateForm()) return;

        try {
            const response = await apiService.addLabTestResult({
                result: testResult,
                details: testDetail
            });
            setTestResult(response.data.data)
            setError(null)
        } catch (error) {
            setError("Error occured while creating new lab test.")
        }
    }

    const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target

        setTestResult((prev) => ({
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

        setTestResult((prev) => ({
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
                        <h1>Add Test Result</h1>
                        {/* <Link to={`/laboratory`} className="btn btn-secondary">
                            <i className="fas fa-arrow-right"></i> Back
                        </Link> */}
                    </div>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Test prescription Id:</Form.Label>
                            <Form.Control
                                id="labPrescId"
                                type="text"
                                name="labPrescId"
                                value={testDetail?.labPrescId ?? ""}
                                onChange={handleInputChange}
                                isInvalid={!!validationErrors.labPrescId}
                            />
                            <Form.Control.Feedback type="invalid">
                                {validationErrors.labPrescId}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="remarks">Test Detail Remarks</Form.Label>
                            <Form.Control
                                id="remarks"
                                as="textarea"
                                name="remarks"
                                value={testDetail?.remarks ?? ""}
                                onSelect={handleInputChange}
                                isInvalid={!!validationErrors.remarks}
                            />
                            <Form.Control.Feedback type="invalid">
                                {validationErrors.remarks}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="description">Description</Form.Label>
                            <Form.Control
                                id="description"
                                type="text"
                                name="description"
                                value={testResult?.description ?? ""}
                                onSelect={handleInputChange}
                                isInvalid={!!validationErrors.description}
                            />
                            <Form.Control.Feedback type="invalid">
                                {validationErrors.description}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="result">Parameters</Form.Label>
                            <Form.Control
                                id="result"
                                type="text"
                                name="result"
                                value={testResult?.result ?? ""}
                                onSelect={handleInputChange}
                                isInvalid={!!validationErrors.result}
                            />
                            <Form.Control.Feedback type="invalid">
                                {validationErrors.result}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="flag">Flag</Form.Label>
                            <Form.Control
                                id="flag"
                                type="text"
                                name="flag"
                                value={testResult?.flag ?? ""}
                                onSelect={handleInputChange}
                                isInvalid={!!validationErrors.flag}
                            />
                            <Form.Control.Feedback type="invalid">
                                {validationErrors.flag}
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

export default AddTestResult;