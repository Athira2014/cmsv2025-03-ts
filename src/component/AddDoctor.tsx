import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { ValidationErrors } from "../model/ValidationErrors";
import { Specialization } from "../model/Specialization";
import { useCallback } from "react";
import axios from "axios";
import { ApiResponse } from "../api/ApiResponse";
import Api from "../api/Api";
import Container from "react-bootstrap/esm/Container";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

const AddDoctor: React.FC<{staffId : number}> = ({staffId}) => {

    const [doctor, setDoctor] = useState({
        docId: 0,
        staffId: staffId,
        specializationId: 0,
        fee: 0,
        licenceNo: ""
    })

    const [error, setError] = useState<string | null>(null)

    const [validationErrors, setValidationErrors] = useState<ValidationErrors>({})

    const [specializations, setSpecializations] = useState<Specialization[]>([])

    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    const fetchSpecializations = useCallback(async () => {

        try {
            setIsLoading(true)
            const response = await axios.get<ApiResponse<Specialization[]>>(Api.specializations)
            setSpecializations(response.data.data)
            setError(null)
        } catch (error) {
            setError("Error occure while fetching Specializations.")
        } finally {
            setIsLoading(false)
        }
    }, [])


    useEffect(() => {
        fetchSpecializations();
    }, [])

    const validateForm = (e: FormEvent): boolean => {
        const errors: ValidationErrors = {};
        if (!doctor.specializationId) errors.specializationId = "Specialization is required.";
        if (doctor.fee <= 0) errors.fee = "Fee should be higher than 0."
        if (!doctor.licenceNo.trim()) errors.licenceNo = "Licence number is required."

        setValidationErrors(errors)
        return Object.keys(errors).length === 0
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
    
        if (!validateForm(e)) return;
    
        try {
            const response = await axios.post(Api.addDoctor, doctor);
            if (response.status === 200 || response.status === 201) {
                navigate(Api.addStaff)
            }
        } catch (error) {
            setError("Error occurred while adding doctor.");
        }
    };
    

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;

        setDoctor((prev) => ({
            ...prev,
            [name]: type === "number" ? Number(value) : value.trim(),
        }));

        setValidationErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };


    const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {

        const { name, value, type } = e.target;

        setDoctor((prev) => ({
            ...prev,
            [name]: Number(value)
        }));
        setValidationErrors((prev) => ({
            ...prev,
            [name]: ""
        }));
    }


    return (
        <div className="contianer-fluid mt-4">
            <Container>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label htmlFor="licenceNo">Licence No.</Form.Label>
                        <Form.Control
                            id="licenceNo"
                            name="licenceNo"
                            type="text"
                            value={doctor.licenceNo}
                            onChange={handleInputChange}
                            isInvalid={!!validationErrors.licenceNo}
                        />
                        <Form.Control.Feedback type="invalid">
                            {validationErrors.licenceNo}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="specializationId">Specialization</Form.Label>
                        <Form.Select
                            id="specializationId"
                            name="specializationId"
                            as="select"
                            value={doctor.specializationId}
                            onChange ={handleSelectChange}
                            isInvalid={!!validationErrors.specializationId}
                        >
                            <option value="">Select Specialization</option>
                            {specializations.map(specialization => (
                                <option key={specialization.specializationId} value={specialization.specializationId}>
                                    {specialization.specializationName}
                                </option>
                            ))}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            {validationErrors.specializationId}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="fee">Fee</Form.Label>
                        <Form.Control
                            id="fee"
                            name="fee"
                            type="number"
                            value={doctor.fee}
                            onChange={handleInputChange}
                            isInvalid={!!validationErrors.fee}
                        />
                        <Form.Control.Feedback type="invalid">
                            {validationErrors.fee}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Container>
        </div>
    )
}

export default AddDoctor;
