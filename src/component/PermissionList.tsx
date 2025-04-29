import React, { useCallback, useEffect, useState } from "react";
import { Permission } from "../model/Permission";
import Api from "../api/Api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import AddPermission from "./AddPermission";

const PermissionList: React.FC = () => {

    // state to store all permissions from api
    const [permissions, setPermissions] = useState<Permission[]>([])

    // state to hold error
    const [error, setError] = useState<string | null>(null)

    //isLoading flag
    const [isLoading, setIsLoading] = useState(true)

    const navivagate = useNavigate();

    // Memorized function to fetch permissions from API
    const fetchPermissions = useCallback(async() => {

        try {
            setIsLoading(true);
            const response = await axios.get<Permission[]>(Api.permissionList)
            if(response.status === 200 || response.status === 201){
                navivagate(Api.patientList)
            }
            setError(null)
        } catch (error) {
            setError("Error occure while fetching permissions.")
        } finally{
            setIsLoading(false)
        }

    }, [])

     // Effect hook to fetch employees when component mounts
    // useEffect is the first method executed when a componet is loaded
    useEffect(() => {
        fetchPermissions();
    }, [])

    // implement function later
    function updateOrDisablePermission(permission: Permission): React.FormEventHandler<HTMLButtonElement> | undefined {
        throw new Error("Function not implemented.");
    }

    //Component rendering
    return (
        <div className="container-fluid mt-5">
            <div className="card shadow p-4">
                <div className="card header p-3">
                    <AddPermission/>
                </div>
                <div className="table-responsive">
                <table className="table table-striped table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th>Sl.No</th>
                            <th>Permission</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {permissions.map((permission, index) => (
                            <tr key={permission.permissionId}>
                                {/* serial number starts from 1 */}
                                <td>{index+1}</td> 
                                <td>{permission.permission}</td>
                                <td>{permission.isActive ? 'Active' : 'Inactive'}</td>
                                <td>
                                    <Button variant ="secondary" type="submit" onClick={updateOrDisablePermission(permission)}>Edit</Button>
                                    <Button variant="secondary" type="submit" onClick={updateOrDisablePermission(permission)}>Disable</Button>
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

export default PermissionList;