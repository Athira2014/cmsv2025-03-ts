import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Role } from "../../models/Role";
import { Button } from "react-bootstrap";
import AddRole from "./AddRole";
import apiService from "../../api/apiService";

const RolesList = () => {

    // Stores all roles from API
    const [roles, setRoles] = useState<Role[]>([])

    //Storing error messages
    const [error, setError] = useState<string | null>(null)

    // Loading state flag
    const [isLoading, setIsLoading] = useState(true)

    // Memorized function to fetch roles from API
    const fetchRoles = async () => {
        try {
            setIsLoading(true)
            const response = await apiService.roles()
            setRoles(response.data.data)
            setError(null)
        } catch (error) {
            setError("Error occured while fetching roles.")
        } finally {
            setIsLoading(false)
        }
    }

    // Effect hook to fetch employees when component mounts
    useEffect(() => {
        fetchRoles();
    }, [])

    // implement edit and disable logic
    function updateOrDisableRole(role: Role): React.MouseEventHandler<HTMLButtonElement> | undefined {
        throw new Error("Function not implemented.");
    }

    return (
        <div className="container-fluid mt-4">
            <div className="card shadow p-4">
            <div className="card header p-3">
                    <AddRole/>
                </div>
                <div className="table-responsive">
                    <table className="table table-striped table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th>Sl.No</th>
                                <th>Role</th>
                                <th>Responsibility</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {roles.map((role, index) => (
                                <tr key={role.roleId}>
                                    <td>{index + 1}</td>
                                    <td>{role.role}</td>
                                    <td>{role.responsibility}</td>
                                    <td>
                                        {/* <Button variant="secondary" type="submit" onClick={updateOrDisableRole(role)}>Edit</Button>
                                        <Button variant="secondary" type="submit" onClick={updateOrDisableRole(role)}>Disable</Button> */}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default RolesList;