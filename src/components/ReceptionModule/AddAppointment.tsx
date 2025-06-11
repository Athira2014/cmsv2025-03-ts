import React, { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ValidationErrors } from "../../models/ValidationErrors";
import { Button, Container } from "react-bootstrap";
import { Form } from 'react-bootstrap';
import apiService from "../../api/apiService";
import { Doctor } from "../../models/Doctor";
import { Patient } from "../../models/Patient";

const AddAppointment: React.FC = () => {

    const userId = localStorage.getItem("userId")

    const [doctors, setDoctors] = useState<Doctor[]>([])

    const [patients, setPatients] = useState<Patient[]>([])

    const [appointment, setAppointment] = useState({
        appointmentDate: "",
        reasonForVisit: "",
        scheduleStatus: "Booked",
        appointmentTime: "",
        doctor: undefined,
        patient: undefined,
        docId: 0,
        patientId: 0
    })

    // const selectedDoctor: Doctor | undefined = doctors.find(doc => doc.docId === Number(appointment.docId));
    // const selectedPatient: Patient | undefined = patients.find(p => p.patientId === Number(appointment.patientId));

    // State for general error messages
    const [error, setError] = useState<string | null>(null);

    // Hook for programmatic navigation
    const navigate = useNavigate();

    // State for form validation errors
    const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

    const [isLoading, setIsLoading] = useState(false)

    const fetchDoctors = useCallback(async () => {
        try {
            setIsLoading(true);

            const response = await apiService.doctorsList(Number(userId));
            // console.log("doctors:", response.data);

            setDoctors(response.data);
            setError(null);
        } catch (error) {
            setError("An error occurred while fetching the doctors list.");
        } finally {
            setIsLoading(false);
        }
    }, [userId]); // added userId if it may change

    const fetchPatients = useCallback(async () => {

        try {
            setIsLoading(true);

            const response = await apiService.patients()
            //console.log("patients : " + response.data.data)
            setPatients(response.data.data)
            setError(null)

        } catch (error) {
            setError("Error occured while fetching patient")
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchDoctors();
        fetchPatients();
    }, [])

    const validateForm = (): boolean => {
        const errors: ValidationErrors = {}
        if (!appointment.appointmentDate) errors.appointmentDate = "Appointment date is required"
        if (!appointment.reasonForVisit) errors.reasonForVisit = "Reason for visit is required"
        if (!appointment.appointmentTime) errors.appointmentTime = "Appointment Time is required"
        if (appointment.docId === 0) errors.doctor = "Doctor is required"
        if (appointment.patientId === 0) errors.patient = "Patient is required"
        setValidationErrors(errors)
        return Object.keys(errors).length === 0
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        console.log(!validateForm())
        if (!validateForm()) return;

        try {
            console.log("appointment" + appointment)
            const response = await apiService.addAppointments(Number(userId), appointment)
            setAppointment(response.data.data)
            setError(null)
        } catch (error) {
            setError("Error occured while creating an appointment.")
        }
    }

    const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target

        setAppointment((prev) => ({
            ...prev,
            [name]: type === "number" ? Number(value) : value
        }))

        setValidationErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    }

    const handleSelectChange = async (e: ChangeEvent<HTMLSelectElement>) => {

        const { name, value, type } = e.target
        setAppointment((prev) => ({
            ...prev,
            [name]: name === "docId" || name === "patientId" ? Number(value) : value
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
                        <h1>Add Appointment</h1>
                        <Link to={`/reception/appointments`} className="btn btn-secondary">
                            <i className="fas fa-arrow-right"></i> Appointment List
                        </Link>
                    </div>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="appointmentDate">Appointment Date</Form.Label>
                            <Form.Control
                                id="appointmentDate"
                                type="date"
                                name="appointmentDate"
                                value={appointment.appointmentDate}
                                onChange={handleInputChange}
                                isInvalid={!!validationErrors.appointmentDate}
                                placeholder="Enter appointment date"
                            />
                            <Form.Control.Feedback type="invalid">
                                {validationErrors.appointmentDate}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Reason for visit</Form.Label>
                            <Form.Control
                                id="reasonForVisit"
                                type="text"
                                name="reasonForVisit"
                                value={appointment.reasonForVisit}
                                onChange={handleInputChange}
                                isInvalid={!!validationErrors.reasonForVisit}
                                placeholder="Enter reason for visit"
                            />
                            <Form.Control.Feedback type="invalid">
                                {validationErrors.reasonForVisit}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Appointment Time</Form.Label>
                            <Form.Control
                                id="appointmentTime"
                                type="time"
                                name="appointmentTime"
                                value={appointment.appointmentTime}
                                onChange={handleInputChange}
                                isInvalid={!!validationErrors.appointmentTime}
                                placeholder="Enter appointment time"
                            />
                            <Form.Control.Feedback type="invalid">
                                {validationErrors.appointmentTime}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="docId">Doctor</Form.Label>
                            <Form.Select
                                id="docId"
                                as="select"
                                name="docId"
                                value={appointment.docId}
                                onChange={handleSelectChange}
                                isInvalid={!!validationErrors.docId}
                            >
                                <option value="">Select Doctor</option>
                                {doctors?.map(doctor => (
                                    <option key={doctor.docId} value={doctor.docId}>
                                        {doctor?.staff?.firstName + " " + doctor?.staff?.lastName}
                                    </option>
                                ))}

                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                {validationErrors.doctor}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Patient</Form.Label>
                            <Form.Select
                                id="patientId"
                                as="select"
                                name="patientId"
                                value={appointment.patientId}
                                onChange={handleSelectChange}
                                isInvalid={!!validationErrors.patientId}
                            >
                                <option value="" >Select Patient</option>
                                {patients?.map(patient => (
                                    <option key={patient.patientId} value={patient.patientId}>
                                        {patient.firstName + " " + patient.lastName}
                                    </option>
                                ))}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                {validationErrors.patient}
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

export default AddAppointment;