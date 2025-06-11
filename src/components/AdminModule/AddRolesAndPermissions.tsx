import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { Form } from "react-bootstrap";
import { ValidationErrors } from "../../models/ValidationErrors";
import Button from "react-bootstrap/Button";
import apiService from "../../api/apiService";
import { Role } from "../../models/Role";
import { Permission } from "../../models/Permission";

const AddRolesAndPermissions: React.FC = () => {

    const today = new Date().toISOString().split('T')[0];

    //state to hold rolesAndPermissions
    const [rolesAndPermission, setRolesAndPermission] = useState({
        roleId: 0,
        permissionId: 0,
        createdDate: today,
        isActive: true
    });

    // State for general error messages
    const [error, setError] = useState<string | null>(null)

    // set success message
    const [succesMessage, setSuccesMessage] = useState<string | null>(null)

    // State for form validation errors
    const [validationErrors, setValidationErrors] = useState<ValidationErrors>({})

    // Hook for programmatic navigation
    const navigate = useNavigate()

    // State for storing roles
    const [roles, setRoles] = useState<Role[]>([])

    // state to store all permissions from api
    const [permissions, setPermissions] = useState<Permission[]>([])

    //isLoading flag
    const [isLoading, setIsLoading] = useState(true)

    //fetch roles for the ddl
    const fetchRole = (async () => {
        try {
            const response = await apiService.roles()
            setRoles(response.data.data)
            setError(null)
        } catch (error) {
            setError("Error occure while fetching roles")
        }
    });

    // Memorized function to fetch permissions from API
    const fetchPermissions = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await apiService.permissionList()
            setPermissions(response.data.data);
            console.log(response.data.data)
            setError(null); // Clear any previous error
        } catch (error) {
            setError("Error occurred while fetching permissions.");
        } finally {
            setIsLoading(false);
        }
    }, []);


    useEffect(() => {
        fetchRole();
        fetchPermissions();
    }, [])


    const validateForm = (): boolean => {

        const errors: ValidationErrors = {}

        if (rolesAndPermission.roleId === 0) errors.roleId = "Role is required."
        if (rolesAndPermission.permissionId === 0) errors.permissionId = "Permission is required."

        setValidationErrors(errors)
        return Object.keys(errors).length === 0
    }


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!validateForm()) return;

        try {
            const response = await apiService.addRolesAndPermission(rolesAndPermission)

            if (response.status === 200 || response.status === 201) {
                // Clear the input field after success:
                setRolesAndPermission({
                    roleId: 0,
                    permissionId: 0,
                    createdDate: today,
                    isActive: true
                });
                setSuccesMessage("Roles And Permissions added succesfully!")
                navigate(`/admin/rolesAndPermissions`, { state: { shouldRefresh: true } })

            }
        } catch (error) {
            setError("Error adding roles and permissions");
        }
    }

    const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {

        const { name, value, type } = e.target;

        setRolesAndPermission((prev) => ({
            ...prev,
            [name]: Number(value)
        }));
        setValidationErrors((prev) => ({
            ...prev,
            [name]: ""
        }));
    }
    return (
        <div className="container-fluid mt-5">
            <Container>
                {succesMessage && <div className="alert alert-success" role="alert">
                    {succesMessage}
                </div>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <div className="row g-2 align-items-center">
                            <div className="col-2">
                                <Form.Label htmlFor="roleId">Role</Form.Label>
                            </div>
                            <div className="col-8 mt-4">
                                <Form.Select
                                    id="roleId"
                                    name="roleId"
                                    as="select"
                                    value={rolesAndPermission.roleId}
                                    onChange={handleSelectChange}
                                    isInvalid={!!validationErrors.roleId}
                                >
                                    <option value="">Select Role</option>
                                    {roles?.map(role => (
                                        <option key={role.roleId} value={role.roleId}>
                                            {role.role}
                                        </option>
                                    ))}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    {validationErrors.roleId}
                                </Form.Control.Feedback>
                            </div>
                        </div>
                    </Form.Group>
                     <Form.Group>
                        <div className="row g-2 align-items-center">
                            <div className="col-2">
                                <Form.Label htmlFor="permissionId">Permission</Form.Label>
                            </div>
                            <div className="col-8 mt-4">
                                <Form.Select
                                    id="permissionId"
                                    name="permissionId"
                                    as="select"
                                    value={rolesAndPermission.permissionId}
                                    onChange={handleSelectChange}
                                    isInvalid={!!validationErrors.permissionId}
                                >
                                    <option value="">Select permission</option>
                                    {permissions?.map(permission => (
                                        <option key={permission.permissionId} value={permission.permissionId}>
                                            {permission.permission}
                                        </option>
                                    ))}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    {validationErrors.permissionId}
                                </Form.Control.Feedback>
                            </div>
                            <div className="col-2 align-item-bottom">
                                <Button variant="primary" type="submit">
                                    Add
                                </Button>
                            </div>
                        </div>
                    </Form.Group>
                </Form>
            </Container>
        </div>
    )
}

export default AddRolesAndPermissions;