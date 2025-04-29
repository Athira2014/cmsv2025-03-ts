import React, { FormEvent, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
// Correct import order:
// import "bootstrap/dist/css/bootstrap.min.css";
import { Form } from 'react-bootstrap';
import Api from "../api/Api";
import axios from "axios";
import Button from "react-bootstrap/Button";
// Custom header component
import Container from "react-bootstrap/Container";

interface ValidationErrors {
    [key: string]: string;
}

enum SexSelection {
    MALE = "M",
    FEMALE = "F"
}

enum MembershipStatusSelection {
    ACTIVE = "Active",
    INACTIVE = "Inactive",
    PENDING = "Pending",
    TERMINATED = "Terminated"
}

const AddPatient: React.FC = () => {

    //State management

    // State for patient form data, initialized with default values
    const [patient, setPatient] = useState({
        patientId: 0,
        firstName: "",
        lastName: "",
        dob: "",
        sex: SexSelection.FEMALE,
        phone: "",
        email: "",
        address: "",
        membershipStatus: MembershipStatusSelection.ACTIVE,
        alternatePhone: "",
        //membershipFromDate: ""
    });

    // //set sex options
    // const [sexOption, setSexOption] = useState<SexSelection[]>([]);

    // // set membership statuses
    // const [memberStatus, setMmemberStatus] = useState<MembershipStatusSelection[]>([]);

    // State for general error messages
    const [error, setError] = useState<string | null>(null);

    // Hook for programmatic navigation
    const navigate = useNavigate();

    // State for form validation errors
    const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

    // Validates form fields and returns true if all validations pass
    const validateForm = (): boolean => {
        console.log(patient)
        const errors: ValidationErrors = {};

        if (!patient.firstName.trim()) errors.firstName = "First Name is required."
        if (!patient.lastName.trim()) errors.lastNmae = "Last Name is required."
        if (!patient.dob.trim()) errors.dob = "Date of birth is required."
        if (!patient.sex.trim()) errors.sex = "choose an option for sex declaration."
        if (!patient.phone) {
            errors.phone = "Phone is required."
        } else if (!/^\d{3}-\d{3}-\d{4}$/.test(patient.phone)) {
            errors.phone = "Phone Number must be 10 digits.";
        }
        if (!patient.email) {
            errors.email = "Email is required."
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(patient.email)) {
            errors.email = "Enter a valid Email."
        }
        if (!patient.address) errors.address = "Address is required."
        if (!patient.alternatePhone) errors.alternatePhone = "Alternate phone is required."
        if (!patient.membershipStatus) errors.membershipStatus = "Membership Status is required."
        // if (!patient.membershipFromDate) errors.membershipFromDate = "Membership FromDate is required."

        setValidationErrors(errors);
        return Object.keys(errors).length === 0 // true when no error message.
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!validateForm) return;

        try {
            const response = await axios.post(Api.addPatient, patient);
            console.log(response);
            if (response.status === 200 || response.status === 201) {
                navigate("/");
            }
            setError(null);
        } catch (error) {
            setError("Error adding patient. Please try again.");
        }
    }

    const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;

        setPatient((prev) => ({
            ...prev,
            [name]: type === "number" ? Number(value) : value.trim(),
        }));

        setValidationErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    }


    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;

        setPatient((prev) => ({
            ...prev,
            [name]: Number(value),
        }));

        setValidationErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    return (
        <div className="container-fluid mt-5">
            <div className="card shadow p-4">
                <Container>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="firstName">First Name</Form.Label>
                            <Form.Control
                                id="firstName"
                                type="text"
                                name="firstName"
                                value={patient.firstName}
                                onChange={handleInputChange}
                                isInvalid={!!validationErrors.firstName}
                                placeholder="Enter first name"
                            />
                            <Form.Control.Feedback type="invalid">
                                {validationErrors.firstName}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                id="lastName"
                                type="text"
                                name="lastName"
                                value={patient.lastName}
                                onChange={handleInputChange}
                                isInvalid={!!validationErrors.lastName}
                                placeholder="Enter Last Name"
                            />
                            <Form.Control.Feedback>
                                {validationErrors.lastName}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Date Of Birth</Form.Label>
                            <Form.Control
                                id="dob"
                                type="date"
                                name="dob"
                                value={patient.dob}
                                onChange={handleInputChange}
                                isInvalid={!!validationErrors.dob}
                                placeholder="Enter D.O.B"
                            />
                            <Form.Control.Feedback>
                                {validationErrors.dob}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="sex">Gender</Form.Label>
                            <Form.Control
                                id="sex"
                                as="select"
                                name="sex"
                                value={patient.sex}
                                onChange={handleInputChange}
                                isInvalid={!!validationErrors.sex}
                            >
                                <option value="" disabled hidden> Select Gender</option>
                                <option value={SexSelection.FEMALE}>Female</option>
                                <option value={SexSelection.MALE}>Male</option>
                            </Form.Control>
                            <Form.Control.Feedback>
                                {validationErrors.sex}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                id="phone"
                                type="text"
                                name="phone"
                                value={patient.phone}
                                onChange={handleInputChange}
                                isInvalid={!!validationErrors.phone}
                                placeholder="Enter Phone Number"
                            />
                            <Form.Control.Feedback>
                                {validationErrors.phone}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                id="email"
                                type="text"
                                name="email"
                                value={patient.email}
                                onChange={handleInputChange}
                                isInvalid={!!validationErrors.email}
                                placeholder="Enter Email"
                            />
                            <Form.Control.Feedback>
                                {validationErrors.email}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                id="address"
                                type="text"
                                name="address"
                                value={patient.address}
                                onChange={handleInputChange}
                                isInvalid={!!validationErrors.address}
                                placeholder="Enter Address"
                            />
                            <Form.Control.Feedback>
                                {validationErrors.address}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="membershipStatus">Membership Status</Form.Label>
                            <Form.Control
                                id="membershipStatus"
                                as="select"
                                name="membershipStatus"
                                value={patient.membershipStatus}
                                onChange={handleInputChange}
                                isInvalid={!!validationErrors.membershipStatus}
                            >
                                <option value="" disabled hidden> Select Membership Status</option>
                                <option value={MembershipStatusSelection.ACTIVE}>Active</option>
                                <option value={MembershipStatusSelection.INACTIVE}>InActive</option>
                                <option value={MembershipStatusSelection.PENDING}>Pending</option>
                                <option value={MembershipStatusSelection.TERMINATED}>Terminated</option>
                            </Form.Control>
                            <Form.Control.Feedback>
                                {validationErrors.membershipStatus}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Alternate Phone</Form.Label>
                            <Form.Control
                                id="alternatePhone"
                                type="text"
                                name="alternatePhone"
                                value={patient.alternatePhone}
                                onChange={handleInputChange}
                                isInvalid={!!validationErrors.alternatePhone}
                                placeholder="Enter Alternate Phone"
                            />
                            <Form.Control.Feedback>
                                {validationErrors.alternatePhone}
                            </Form.Control.Feedback>
                        </Form.Group>
                        {/* <Form.Group>
                            <Form.Label>Member From</Form.Label>
                            <Form.Control
                                id="membershipFromDate"
                                type="text"
                                name="membershipFromDate"
                                value={patient.membershipFromDate}
                                onChange={handleInputChange}
                                isInvalid={!!validationErrors.membershipFromDate}
                                placeholder="Enter Member from Date"
                            />
                            <Form.Control.Feedback>
                                {validationErrors.membershipFromDate}
                            </Form.Control.Feedback>
                        </Form.Group> */}

                        {/* Submit Button */}
                        <Button variant="primary" type="submit">Submit</Button>
                    </Form>
                </Container>
            </div>
        </div>
    )
}

export default AddPatient;