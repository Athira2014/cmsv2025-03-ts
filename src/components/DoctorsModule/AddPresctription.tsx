import React, { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import { Form } from 'react-bootstrap';
import { ValidationErrors } from "../../models/ValidationErrors";
import apiService from "../../api/apiService";
import { Appointment } from "../../models/Appointment";

const AddPrescription: React.FC = () => {

    const { userId, appointmentId } = useParams();

    //const userId = localStorage.getItem("userId")
    const [appointment, setAppointment] = useState<Appointment>()

    const [prescription, setPrescription] = useState({
        medicinePrescId: 0,
        appointmentId: Number(appointmentId) ? Number(appointmentId) : 0,
        medicines: "",
        dosage: "",
        frequency: "",
        createdDate: ""
    })

    // State for general error messages
    const [error, setError] = useState<string | null>(null);

    // Hook for programmatic navigation
    const navigate = useNavigate();

    // State for form validation errors
    const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

    const [isLoading, setIsLoading] = useState(false)

    const fetchAppointment = useCallback(async () => {
        try {

            if (appointmentId !== undefined) {
                setIsLoading(true)
                const response = await apiService.getAppointment(Number(appointmentId))
                setAppointment(response.data.data)
                setError(null)
            }
        } catch (error) {
            setError("Error occured while fetching appointment")
        }
    }, [])

    useEffect(() => {
        fetchAppointment();
    }, [])

    const validateForm = (): boolean => {
        const errors: ValidationErrors = {}
        if (!prescription.medicines) errors.medicines = "Medicine is required"
        if (!prescription.dosage) errors.dosage = "Dosage is required"
        if (!prescription.frequency) errors.frequency = "Frequency is required"

        setValidationErrors(errors)
        return Object.keys(errors).length === 0
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        if (!validateForm()) return;

        try {
            const response = await apiService.addPrescription(Number(userId), prescription)
            // console.log(response.data.data)
            setPrescription(response.data.data)
            setError(null)
        } catch (error) {
            setError("Error occured while creating prescription.")
        }
    }

    const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target

        setPrescription((prev) => ({
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
                        <h1>Add Prescription</h1>
                        <Link to={`/doctorDash/appointmentdetails/${userId}/${appointmentId}`} className="btn btn-secondary">
                            <i className="fas fa-arrow-right"></i> Back
                        </Link>
                    </div>
                    <Form onSubmit={handleSubmit}>
                        <div className="row d-flex">
                            <div className="col-6">
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="appointmentId">Appointment Id</Form.Label>
                                    <Form.Control
                                        id="appointmentId"
                                        type="text"
                                        name="appointmentId"
                                        value={appointment?.appointmentId ?? ""}
                                        readOnly
                                    />
                                </Form.Group>
                            </div>
                            <div className="col-6">
                                <Form.Group>
                                    <Form.Label>Patient Id</Form.Label>
                                    <Form.Control
                                        id="patientId"
                                        type="text"
                                        name="patientId"
                                        value={appointment?.patientId ?? ""}
                                        readOnly
                                    />
                                </Form.Group>
                            </div>
                            <div className="col-6">
                                <Form.Group>
                                    <Form.Label>Patient Name:</Form.Label>
                                    <Form.Control
                                        id="patientId"
                                        type="text"
                                        name="patientId"
                                        value={appointment?.patient?.firstName + " " + appointment?.patient?.lastName}
                                        readOnly
                                    />
                                </Form.Group>
                            </div>
                        </div>
                        <Form.Group>
                            <Form.Label>Medicine</Form.Label>
                            <Form.Control
                                id="medicines"
                                type="textarea"
                                name="medicines"
                                value={prescription.medicines}
                                onChange={handleInputChange}
                                isInvalid={!!validationErrors.medicines}
                                placeholder="Enter Medicine"

                            />
                            <Form.Control.Feedback type="invalid">
                                {validationErrors.medicines}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Dosage</Form.Label>
                            <Form.Control
                                id="dosage"
                                type="text"
                                name="dosage"
                                value={prescription.dosage}
                                onChange={handleInputChange}
                                isInvalid={!!validationErrors.dosage}
                                placeholder="Enter dosage"
                            />
                            <Form.Control.Feedback type="invalid">
                                {validationErrors.dosage}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="frequency">Frequency</Form.Label>
                            <Form.Control
                                id="frequency"
                                as="textarea"
                                name="frequency"
                                value={prescription.frequency}
                                onChange={handleInputChange}
                                isInvalid={!!validationErrors.frequency}
                                placeholder="Enter Frequency"

                            >
                                <Form.Control.Feedback type="invalid">
                                    {validationErrors.frequency}
                                </Form.Control.Feedback>
                            </Form.Control>
                        </Form.Group>
                        {/* Submit Button */}
                        <Button variant="primary" type="submit">Submit</Button>
                    </Form>
                </Container>
            </div>
        </div>
    )
}

export default AddPrescription;