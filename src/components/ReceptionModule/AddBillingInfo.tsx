import React, { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ValidationErrors } from "../../models/ValidationErrors";
import { Button, Container } from "react-bootstrap";
import { Form } from 'react-bootstrap';
import apiService from "../../api/apiService";

const AddBillingInfo: React.FC = () => {

    const userId = localStorage.getItem("userId")
    const {appointmentIdPassed} = useParams();

    const [billing, setBilling] = useState({
        consultationBilltId : 0,
        additionalCostAny : 0,
        totalAmount : 0,
        amountPaid : 0,
        outstandingAmt : 0,
        billingDate : "",
        paymentStatus : "",
        appointmentId: Number(appointmentIdPassed)
    })

    // State for general error messages
    const [error, setError] = useState<string | null>(null);

    // Hook for programmatic navigation
    const navigate = useNavigate();

    // State for form validation errors
    const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        // if (!validateForm()) return;

        try {
            const response = await apiService.addBillingInfo(Number(userId), billing)
            setBilling(response.data.data)
            setError(null)
        } catch (error) {
            setError("Error occured while creating an appointment.")
        }
    }

    const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target

        setBilling((prev) => ({
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
                <Container>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h1>Add Billing Info</h1>
                        <Link to={`/reception/appointments`} className="btn btn-secondary">
                            <i className="fas fa-arrow-right"></i> Back 
                        </Link>
                    </div>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="totalAmount">Amount</Form.Label>
                            <Form.Control
                                id="totalAmount"
                                type="number"
                                name="totalAmount"
                                value={billing.totalAmount}
                                onChange={handleInputChange}
                                isInvalid={!!validationErrors.totalAmount}
                                placeholder="Enter appointment date"
                            />
                            <Form.Control.Feedback type="invalid">
                                {validationErrors.totalAmount}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Additional cost if any</Form.Label>
                            <Form.Control
                                id="additionalCostAny"
                                type="number"
                                name="additionalCostAny"
                                value={billing.additionalCostAny}
                                onChange={handleInputChange}
                                placeholder="Enter additional cost"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Amount Paid</Form.Label>
                            <Form.Control
                                id="amountPaid"
                                type="number"
                                name="amountPaid"
                                value={billing.amountPaid}
                                onChange={handleInputChange}
                                isInvalid={!!validationErrors.amountPaid}
                                placeholder="Enter amount paid"
                            />
                            <Form.Control.Feedback type="invalid">
                                {validationErrors.amountPaid}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="outstandingAmt">Outstanding Amount</Form.Label>
                            <Form.Control
                                id="outstandingAmt"
                                type="number"
                                name="outstandingAmt"
                                value={billing.outstandingAmt}
                                onChange={handleInputChange}
                                isInvalid={!!validationErrors.outstandingAmt}
                            >
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                                {validationErrors.outstandingAmt}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="paymentStatus">Payment Status</Form.Label>
                            <Form.Control
                                id="paymentStatus"
                                type="text"
                                name="paymentStatus"
                                value={billing.paymentStatus}
                                onChange={handleInputChange}
                                isInvalid={!!validationErrors.paymentStatus}
                            >
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                                {validationErrors.paymentStatus}
                            </Form.Control.Feedback>
                        </Form.Group>
                        {/* Submit Button */}
                        <Button variant="primary" type="submit">Submit</Button>
                    </Form>
                </Container>
            </div>
        </div>
    )
}

export default AddBillingInfo;