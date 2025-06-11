import React, { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ValidationErrors } from "../../models/ValidationErrors";
import apiService from "../../api/apiService";
import { Appointment } from "../../models/Appointment";
import { LabTest } from "../../models/LabTest";
import { Button, Container, Form } from "react-bootstrap";
import { LabTestPrescriptionDto } from "./LabTestPrescriptionDto ";

const AddTestsToDo: React.FC = () => {

    const userId = localStorage.getItem("userId")
    const { appointmentId } = useParams();
    const [appointment, setAppointment] = useState<Appointment>()
    const [labTests, setLabTests] = useState<LabTest[]>([])
    const [labTestIds, setLabTestIds] = useState<number[]>([])
    const today = new Date().toISOString().split('T')[0]; // "YYYY-MM-DD"
    const [labTestsPrescDto, setLabTestsPrescDto] = useState<LabTestPrescriptionDto>()

    const [testsToDo, setTestsToDo] = useState({
        labPrescId: 0,
        appointmentId: Number(appointmentId),
        labTests: [],
        testToBeDoneOnOrBefore: "",
        isActive: true,
        createdDate: today,
        labTestDetails: [],
    })

    // State for general error messages
    const [error, setError] = useState<string | null>(null);

    // Hook for programmatic navigation
    const navigate = useNavigate();

    // State for form validation errors
    const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

    const [isLoading, setIsLoading] = useState(false)

    const fetchAppointment = useCallback(async () => {
        if (appointmentId !== undefined) {
            try {
                setIsLoading(true);
                const response = await apiService.getAppointment(Number(appointmentId));
                setAppointment(response.data.data);
                setError(null);
            } catch {
                setError("Error occurred while fetching appointment");
            } finally {
                setIsLoading(false);
            }
        }
    }, [appointmentId]);

    const fetchLabTests = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await apiService.getLabTests();
            setLabTests(response.data.data);
            setError(null);
        } catch {
            setError("Error occurred while fetching Lab tests");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAppointment();
        fetchLabTests();
    }, [fetchAppointment, fetchLabTests]);


    const validateForm = (): boolean => {
        const errors: ValidationErrors = {};
        if (labTestIds.length === 0) errors.labTests = "Please select at least one test";
        if (!testsToDo.testToBeDoneOnOrBefore) errors.testToBeDoneOnOrBefore = "Please select a date";
        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        if (!validateForm()) return;

        try {
            //  LabTestPrescriptionDto - {labTestPrescription, labTestIds}
            const response = await apiService.addTestsToDo({
                labTestPrescription: testsToDo,
                labTestIds: labTestIds
            })
            setTestsToDo(response.data.data)
            setError(null)
        } catch (error) {
            setError("Error occured while adding tests to be done.")
        }
    }

    const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target

        setTestsToDo((prev) => ({
            ...prev,
            [name]: type === "number" ? Number(value) : value
        }))

        setValidationErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    }

    const handleCheckBoxSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedId = parseInt(e.target.value);
        if (e.target.checked) {
            setLabTestIds([...labTestIds, selectedId]);
        } else {
            setLabTestIds(labTestIds.filter(id => id !== selectedId));
        }
    }

    return (
        <div className="container-fluid mt-5">
            <div className="card shadow p-4">
                <Container>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h1>Add Tests to be done</h1>
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
                            <Form.Label>Test to be done on or Before</Form.Label>
                            <Form.Control
                                id="testToBeDoneOnOrBefore"
                                type="date"
                                name="testToBeDoneOnOrBefore"
                                value={testsToDo?.testToBeDoneOnOrBefore ?? ""}
                                onChange={handleInputChange}
                            />
                            {validationErrors.testToBeDoneOnOrBefore &&
                                <p className="text-danger">{validationErrors.testToBeDoneOnOrBefore}</p>
                            }
                        </Form.Group>
                        {/* List all tests as checkbox options, all checked tests to be 
                            added to a list and passed to backend (
                            LabTestPrescriptionDto - {labTestPrescription, labTestIds})*/}
                        {labTests?.length > 0 ? (
                            labTests.map((labTest) => (
                                <Form.Group key={labTest.labTestsId} controlId={`labTest-${labTest.labTestsId}`}>
                                    <Form.Check
                                        type="checkbox"
                                        label={labTest.testName}
                                        value={labTest?.labTestsId ?? ""}
                                        checked={labTestIds.includes(labTest.labTestsId)}
                                        onChange={handleCheckBoxSelection}
                                    />
                                    {validationErrors.labTests &&
                                        <p className="text-danger">{validationErrors.labTests}</p>
                                    }
                                </Form.Group>
                            ))
                        ) : (
                            <p>No lab tests available</p>
                        )}

                        {/* Submit Button */}
                        <Button variant="primary" type="submit">Submit</Button>
                    </Form>
                    {error && <p className="text-danger mt-3">{error}</p>}
                </Container>
            </div>
        </div>
    )

}

export default AddTestsToDo;