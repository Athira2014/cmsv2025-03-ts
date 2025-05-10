import React, { useCallback, useEffect, useState } from "react";
import { Permission } from "../../models/Permission";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import apiService from "../../api/apiService";
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
    const fetchPermissions = useCallback(async () => {
        setIsLoading(true);
        try {
            // const response = await axios.get<ApiResponse<Permission[]>>(Api.permissionList);
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
    
     // Effect hook to fetch employees when component mounts
    // useEffect is the first method executed when a componet is loaded
    useEffect(() => {
        fetchPermissions();
    }, [])

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
                                <td>{permission.active ? 'Active' : 'Inactive'}</td>
                                <td>
                                    {/* <Button variant ="secondary" type="submit" onClick={updateOrDisablePermission(permission)}>Edit</Button>
                                    <Button variant="secondary" type="submit" onClick={updateOrDisablePermission(permission)}>Disable</Button> */}
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