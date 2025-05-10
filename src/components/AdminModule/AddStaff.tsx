import React, { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react";
import { ValidationErrors } from "../../models/ValidationErrors";
import { Role } from "../../models/Role";
import { Link, useNavigate } from "react-router-dom";
import { toUpper } from "lodash";
import Container from "react-bootstrap/Container";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Specialization } from "../../models/Specialization";
import apiService from "../../api/apiService";


const AddStaff: React.FC = () => {

    const [staff, setStaff] = useState({
        staffId: 0,
        firstName: "",
        lastName: "",
        roleId: 0,
        dob: "",
        phone: "",
        email: "",
        joiningDate: "",
        tillDate: "",
        salary: 0,
        status: "",
        address: ""
    })

    const [doctor, setdoctor] = useState({
        staffId: 0,
        specializationId: 0,
        fee: 0,
        licenceNo: ""
    })

    // state for storing error
    const [error, setError] = useState<string | null>(null)

    //state for validationErrors
    const [validationErrors, setValidationErrors] = useState<ValidationErrors>({})

    // State for storing roles
    const [roles, setRoles] = useState<Role[]>([])

    // get Doctor's role id
    const Doctor_Role_Id = roles.find(role => toUpper(role.role) === "DOCTOR")?.roleId

    // Hook for programmatic navigation
    const navigate = useNavigate()

    //state to show doctor creation window
    const [showDoctorForm, setShowDoctorForm] = useState(false)

    const [specializations, setSpecializations] = useState<Specialization[]>([])

    const [isLoading, setIsLoading] = useState(false)

    const [date, setDate] = useState<string>("");

    const today = new Date().toISOString().split("T")[0];

    //fetch roles for the ddl
    const fetchRole = (async () => {
        try {
            //const response = await axios.get<ApiResponse<Role[]>>(Api.roles)
            //const response = await api.get<apiResponse<Role[]>>(endpoints.roles)
            const response = await apiService.roles()
            setRoles(response.data.data)
            setError(null)
        } catch (error) {
            setError("Error occure while fetching roles")
        }
    })

    useEffect(() => {
        fetchRole();
    }, [])


    const fetchSpecializations = useCallback(async () => {

        try {
            setIsLoading(true)
            //const response = await axios.get<ApiResponse<Specialization[]>>(Api.specializations)
            const response = await apiService.specializations()

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
        if (!staff.roleId) errors.roleId = "Role is required.";

        setValidationErrors(errors)
        return Object.keys(errors).length === 0
    }
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            console.log("staff :" + staff)
           // const response = await axios.post(Api.addStaff, staff)
           //const response = await api.post(endpoints.addStaff(3), staff)
           const response = await apiService.addStaff(3, staff)

            if (response.status === 200 || response.status === 201) {
                setStaff(response.data.data)
                setError(null)
                const newStaffCreated = response.data.data
                console.log(newStaffCreated)
                //const staffCreated = response.data
                //Update setShowDoctorForm(true) to get the  staff ID:
                if (staff.roleId === Doctor_Role_Id) {
                    try {
                        doctor.staffId = newStaffCreated.staffId
                       // const response = await axios.post(Api.addDoctor, doctor);
                       const response = await apiService.addDoctor(doctor);

                        if (response.status === 200 || response.status === 201) {
                            navigate('/staffs')
                        }
                    } catch (error) {
                        setError("Error occurred while adding doctor.");
                    }
                } else {
                    navigate('/staffs')
                }
            }
        } catch (error) {
            setError("Error occured while adding staff.")
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;

        setStaff((prev) => ({
            ...prev,
            [name]: type === "number" ? Number(value) : value
        }));

        setdoctor((prev) => ({
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
        const roleIdSelected = Number(value)

        setStaff((prev) => ({
            ...prev,
            [name]: Number(value)
        }));
        setValidationErrors((prev) => ({
            ...prev,
            [name]: ""
        }));

        if (roleIdSelected !== 0 && roleIdSelected === Doctor_Role_Id) {
            setShowDoctorForm(true);
        } else {
            setShowDoctorForm(false)
        }
    }

    const handleSpecilalizationSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {

        const { name, value, type } = e.target;

        setdoctor((prev) => ({
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
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2>Add Staff</h2>
                        <Link to="/${Api.staffs}" className="btn btn-secondary">
                            <i className="fas fa-arrow-right"></i> Staff List
                        </Link>
                    </div>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label htmlFor="firstName">First Name</Form.Label>
                            <Form.Control
                                id="firstName"
                                name="firstName"
                                type="text"
                                value={staff.firstName}
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
                                value={staff.lastName}
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
                                value={staff.dob}
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
                                value={staff.phone}
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
                                value={staff.email}
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
                                        value={doctor.fee}
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
                                min={today}
                                value={staff.joiningDate}
                                onChange={handleInputChange}
                                isInvalid={!!validationErrors.joiningDate}
                            />
                            <Form.Control.Feedback type="invalid">
                                {validationErrors.joiningDate}
                            </Form.Control.Feedback>
                        </Form.Group>
                        {/* <Form.Group>
                            <Form.Label htmlFor="joiningDate">Till Date</Form.Label>
                            <Form.Control
                                id="tillDate"
                                name="tillDate"
                                type="date"
                                value={staff.tillDate}
                                onChange={handleInputChange}
                                isInvalid={!!validationErrors.tillDate}
                            />
                            <Form.Control.Feedback type="invalid">
                                {validationErrors.tillDate}
                            </Form.Control.Feedback>
                        </Form.Group> */}
                        {/* <Form.Group> set active = true while adding a staff
                            <Form.Label htmlFor="status">Status</Form.Label>
                            <Form.Control
                                id="status"
                                name="status"
                                type="checkbox"
                                value={staff.status}
                                onChange={handleInputChange}
                                isInvalid={!!validationErrors.status}
                            />
                            <Form.Control.Feedback type="invalid">
                                {validationErrors.status}
                            </Form.Control.Feedback>
                        </Form.Group> */}
                        <Form.Group>
                            <Form.Label htmlFor="salary">Salary</Form.Label>
                            <Form.Control
                                id="salary"
                                name="salary"
                                type="number"
                                value={staff.salary}
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
                                value={staff.address}
                                onChange={handleInputChange}
                                isInvalid={!!validationErrors.address}
                            />
                            <Form.Control.Feedback type="invalid">
                                {validationErrors.address}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-4">
                            Add Staff
                        </Button>
                    </Form>
                </Container>
            </div>

        </div >
    )
}

export default AddStaff;