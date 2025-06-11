import React, { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import { Form } from 'react-bootstrap';
import { ValidationErrors } from "../../models/ValidationErrors";
import apiService from "../../api/apiService";
import { Appointment } from "../../models/Appointment";

const AddConsultationNotes: React.FC = () => {

    const { userId, appointmentId } = useParams();

    //const userId = localStorage.getItem("userId")
    const [appointment, setAppointment] = useState<Appointment>()

    const [consultationNote, setConsultationNote] = useState({

        consNoteId: 0,
        symptoms: "",
        diagnosis: "",
        followUp: "",
        appointmentId: Number(appointmentId),
        patientId: 0
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

        if (!consultationNote.symptoms) errors.symptoms = "Symptoms is required"
        if (!consultationNote.diagnosis) errors.diagnosis = "Diagnosis is required"

        setValidationErrors(errors)
        return Object.keys(errors).length === 0
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        if (!validateForm()) return;

        try {
            const response = await apiService.addConsultationNotes(Number(userId), consultationNote)
            // console.log(response.data.data)
            setConsultationNote(response.data.data)
            setError(null)
        } catch (error) {
            setError("Error occured while creating an appointment.")
        }
    }

    const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target

        setConsultationNote((prev) => ({
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
                        <h1>Add Consultation Note</h1>
                        <Link to={`/doctorDash/appointmentdetails/${userId}/${appointmentId}`} className="btn btn-secondary">
                            <i className="fas fa-arrow-right"></i> Back
                        </Link>
                    </div>
                    <Form onSubmit={handleSubmit}>
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
                        <Form.Group>
                            <Form.Label>Symptoms</Form.Label>
                            <Form.Control
                                id="symptoms"
                                as="textarea"
                                name="symptoms"
                                value={consultationNote.symptoms}
                                onChange={handleInputChange}
                                isInvalid={!!validationErrors.symptoms}
                                placeholder="Enter symptoms"
                            />
                            <Form.Control.Feedback type="invalid">
                                {validationErrors.symptoms}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Diagnosis</Form.Label>
                            <Form.Control
                                id="diagnosis"
                                as="textarea"
                                name="diagnosis"
                                value={consultationNote.diagnosis}
                                onChange={handleInputChange}
                                isInvalid={!!validationErrors.diagnosis}
                                placeholder="Enter diagnosis"
                            />
                            <Form.Control.Feedback type="invalid">
                                {validationErrors.diagnosis}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="followUp">Follow Up</Form.Label>
                            <Form.Control
                                id="followUp"
                                as="textarea"
                                name="followUp"
                                value={consultationNote.followUp}
                                onChange={handleInputChange}
                            >
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

export default AddConsultationNotes;