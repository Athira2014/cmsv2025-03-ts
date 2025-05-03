import React, { useCallback, useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Staff } from "../model/Staff";
import { Role } from "../model/Role";
import { useNavigate, useParams } from "react-router-dom";
import { ValidationErrors } from "../model/ValidationErrors";
import axios from "axios";
import Api from "../api/Api";
import { ApiResponse } from "../api/ApiResponse";
import { Specialization } from "../model/Specialization";
import { useEffect } from "react";
import { ChangeEvent } from "react";
import { toUpper } from "lodash";
import { Doctor } from "../model/Doctor";

const EditStaff: React.FC = () => {

    const { staffId } = useParams();

    const [staff, setStaff] = useState<Staff>()

    const [doctor, setDoctor] = useState<Doctor>()

    // State for storing roles
    const [roles, setRoles] = useState<Role[]>([])

    const [specializations, setSpecializations] = useState<Specialization[]>([])

    // const [selectedRoleId, setSelectedRoleId] = useState<number | undefined>(undefined);

    const navigate = useNavigate();

    const [error, setError] = useState<string | null>(null)

    const [validationErrors, setValidationErrors] = useState<ValidationErrors>({})

    const [isLoading, setIsLoading] = useState(false)
    //state to show doctor creation window
    const [showDoctorForm, setShowDoctorForm] = useState(false)

    const [docRole, setDocRole] = useState<number | null>(null);

    //fetch roles for the ddl
    const fetchRoles = useCallback(async () => {
        try {
            const response = await axios.get<ApiResponse<Role[]>>(Api.roles)
            setRoles(response.data.data)
            setError(null)
        } catch (error) {
            setError("Error occure while fetching roles")
        }
    }, [])

    useEffect(() => {
        fetchRoles();
    }, [])


    const fetchSpecializations = useCallback(async () => {

        try {
            setIsLoading(true)
            const response = await axios.get<ApiResponse<Specialization[]>>(Api.specializations)
            setSpecializations(response.data.data)
            console.log("specializations :" + specializations)
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


    //fetch Staff
    const fetchStaff = async () => {
        try {
            setIsLoading(true)
            //const response = await axios.get<ApiResponse<Staff>>(Api.getStaff(staffId, clinicId));
            const response = await axios.get<ApiResponse<Staff>>(Api.getStaff + `/${staffId}`)
            const staffData = response.data.data
            setStaff(staffData)
            setError(null)
        } catch (error) {
            setError("Error occured while fetching staffs.")
        } finally {
            setIsLoading(false)
        }

    }
    useEffect(() => {
        fetchStaff();
    }, [])


    useEffect(() => {
        if (roles.length > 0 && staff?.role?.roleId) {
            const doctorRoleId = roles.find(role => toUpper(role.role.trim()) === "DOCTOR")?.roleId;
            if (doctorRoleId) {
                if (staff.role.roleId === doctorRoleId) {
                    setShowDoctorForm(true);
                    setDocRole(doctorRoleId)
                    if (staff.doctor) {
                        setDoctor(staff.doctor);
                    }
                } else {
                    setShowDoctorForm(false);
                }
            }
        }
    }, [roles, staff]);


    if (!staff) {
        return <div>Loading staff...</div>;
    }

    const validateForm = (): boolean => {
        const errors: ValidationErrors = {}

        if (!staff.firstName.trim()) errors.firstName = "First name is required."
        if (!staff.lastName.trim()) errors.lastName = "Last name is required."
        if (!staff.dob.trim()) errors.lastName = "Dob is required."
        if (!staff.phone.trim()) {
            errors.phone = "Phone is required."
        } else if (!/^\d{3}-\d{3}-\d{4}$/.test(staff.phone)) {
            errors.phone = "Phone Number must be 10 digits."
        }
        if (!staff.email) {
            errors.email = "Email is required."
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(staff.email)) {
            errors.email = "Enter a valid Email."
        } if (!staff.joiningDate.trim()) errors.joiningDate = "Joining Date is required."
        if (!staff.tillDate.trim()) errors.tillDate = "Till Date is required."
        if (staff.salary <= 0) errors.salary = "Salary should not be zero."
        if (!staff.status.trim()) errors.status = "status is required."
        if (!staff.address.trim()) errors.address = "Address is required."
        if (!staff.role?.roleId) errors.roleId = "Role is required.";

        setValidationErrors(errors)
        return Object.keys(errors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm) return;

        try {
            console.log("Payload being sent:", staff);

            const response = await axios.put(Api.editStaff, staff)
            if (response.status === 200 || response.status === 201) {
                setStaff(response.data.data)
                setError(null)
                const updatedStaff = response.data.data
                console.log(updatedStaff)
                //const staffCreated = response.data
                //Update setShowDoctorForm(true) to get the  staff ID:
                if (staff.roleId && staff.roleId === docRole) {
                    try {
                        doctor!.staffId = updatedStaff.staffId
                        const response = await axios.put(Api.upadteDoctor, doctor);
                        if (response.status === 200 || response.status === 201) {
                            navigate(`/${Api.staffs}`)
                        }
                    } catch (error) {
                        setError("Error occurred while adding doctor.");
                    }
                } else {
                    navigate(`/${Api.staffs}`)
                }
            }
        } catch (error) {
            setError("Error occured while updating staff.")
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        const val = type === "checkbox" ? (checked ? "TRUE" : "FALSE") : value;

        setStaff((prev: any) => ({
            ...prev,
            [name]: type === "number" ? Number(value) : value
        }));

        setDoctor((prev: any) => ({
            ...prev,
            [name]: type === "number" ? Number(value) : value
        }));

        setValidationErrors((prev) => ({
            ...prev,
            [name]: ""
        }));
    }

    const handleRoleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {

        const { name, value, type } = e.target;
        const selectedRoleId = Number(e.target.value);
        const selectedRole = roles.find(role => role.roleId === selectedRoleId);

        setStaff((prev: any) => ({
            ...prev,
            [name]: selectedRole
        }));
        setValidationErrors((prev) => ({
            ...prev,
            [name]: ""
        }));
        // Toggle doctor form visibility
        if (selectedRole && toUpper(selectedRole.role) === "DOCTOR") {
            setShowDoctorForm(true);
        } else {
            setShowDoctorForm(false);
        }
    }

    const handleSpecilalizationSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {

        const { name, value, type } = e.target;

        setDoctor((prev: any) => ({
            ...prev,
            [name]: Number(value)
        }));
        setValidationErrors((prev) => ({
            ...prev,
            [name]: ""
        }));
    }

    return (

        <div className="container-fluid mt-4">
            <div className="card shadow p-4">
                <Container>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label htmlFor="firstName">First Name</Form.Label>
                            <Form.Control
                                id="firstName"
                                name="firstName"
                                type="text"
                                value={staff.firstName || ""}
                                onChange={handleInputChange}
                                isInvalid={!!validationErrors.firstName}
                            />
                            <Form.Control.Feedback type="invalid">
                                {validationErrors.firstName}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="lastName">Last Name</Form.Label>
                            <Form.Control
                                id="lastName"
                                name="lastName"
                                type="text"
                                value={staff.lastName || ""}
                                onChange={handleInputChange}
                                isInvalid={!!validationErrors.lastName}
                            />
                            <Form.Control.Feedback type="invalid">
                                {validationErrors.lastName}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="dob">D.O.B</Form.Label>
                            <Form.Control
                                id="dob"
                                name="dob"
                                type="date"
                                value={staff!.dob || ""}
                                onChange={handleInputChange}
                                isInvalid={!!validationErrors.dob}
                            />
                            <Form.Control.Feedback type="invalid">
                                {validationErrors.dob}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="phone">Phone</Form.Label>
                            <Form.Control
                                id="phone"
                                name="phone"
                                type="text"
                                value={staff!.phone || ""}
                                onChange={handleInputChange}
                                isInvalid={!!validationErrors.phone}
                            />
                            <Form.Control.Feedback type="invalid">
                                {validationErrors.phone}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="email">email</Form.Label>
                            <Form.Control
                                id="email"
                                name="email"
                                type="text"
                                value={staff!.email || ""}
                                onChange={handleInputChange}
                                isInvalid={!!validationErrors.email}
                            />
                            <Form.Control.Feedback type="invalid">
                                {validationErrors.email}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="roleId">Role</Form.Label>
                            <Form.Select
                                id="roleId"
                                name="roleId"
                                as="select"
                                value={staff.roleId}
                                onChange={handleRoleSelectChange}
                                isInvalid={!!validationErrors.roleId}
                            >
                                <option value="">Select a role</option>
                                {roles.map(role => (
                                    <option key={role.roleId} value={role.roleId}>
                                        {role.role}
                                    </option>
                                ))}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                {validationErrors.roleId}
                            </Form.Control.Feedback>
                        </Form.Group>
                        {showDoctorForm && (
                            <>
                                < Form.Group >
                                    <Form.Label htmlFor="licenceNo">Licence No.</Form.Label>
                                    <Form.Control
                                        id="licenceNo"
                                        name="licenceNo"
                                        type="text"
                                        value={doctor!.licenceNo || ""}
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
                                        value={doctor!.specializationId || ""}
                                        onChange={handleSpecilalizationSelect}
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
                                        value={doctor!.fee || ""}
                                        onChange={handleInputChange}
                                        isInvalid={!!validationErrors.fee}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {validationErrors.fee}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </>
                        )

                        }
                        <Form.Group>
                            <Form.Label htmlFor="joiningDate">Joining Date</Form.Label>
                            <Form.Control
                                id="joiningDate"
                                name="joiningDate"
                                type="date"
                                value={staff!.joiningDate || ""}
                                onChange={handleInputChange}
                                isInvalid={!!validationErrors.joiningDate}
                            />
                            <Form.Control.Feedback type="invalid">
                                {validationErrors.joiningDate}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="joiningDate">Till Date</Form.Label>
                            <Form.Control
                                id="tillDate"
                                name="tillDate"
                                type="date"
                                value={staff!.tillDate || ""}
                                onChange={handleInputChange}
                                isInvalid={!!validationErrors.tillDate}
                            />
                            <Form.Control.Feedback type="invalid">
                                {validationErrors.tillDate}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="status">Status</Form.Label>
                            <Form.Check.Input
                                id="status"
                                name="status"
                                type="checkbox"
                                value={staff!.status || ""}
                                checked={toUpper(staff.status) === "ACTIVE" ? true : false}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="salary">Salary</Form.Label>
                            <Form.Control
                                id="salary"
                                name="salary"
                                type="number"
                                value={staff!.salary || 0}
                                onChange={handleInputChange}
                                isInvalid={!!validationErrors.salary}
                            />
                            <Form.Control.Feedback type="invalid">
                                {validationErrors.salary}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="address">Address</Form.Label>
                            <Form.Control
                                id="address"
                                name="address"
                                type="text"
                                value={staff!.address || ""}
                                onChange={handleInputChange}
                                isInvalid={!!validationErrors.address}
                            />
                            <Form.Control.Feedback type="invalid">
                                {validationErrors.address}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-4">
                            Update
                        </Button>
                    </Form>
                </Container>
            </div>

        </div >
    )
}

export default EditStaff;
