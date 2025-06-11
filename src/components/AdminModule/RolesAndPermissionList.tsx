import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import apiService from "../../api/apiService";
import { RolesAndPermissions } from "../../models/RolesAndPermissions";
import AddRolesAndPermissions from "./AddRolesAndPermissions";

const RolesAndPermissionList: React.FC = () => {

    // state to store all permissions from api
    const [rolesAndpermissions, setRolesAndpermissions] = useState<RolesAndPermissions[]>([])

    // state to hold error
    const [error, setError] = useState<string | null>(null)

    //isLoading flag
    const [isLoading, setIsLoading] = useState(true)

    const navivagate = useNavigate();

    const location = useLocation();

    // Memorized function to fetch permissions from API
    const fetchRolesAndPermissions = useCallback(async () => {
        setIsLoading(true);
        try {
            // const response = await axios.get<ApiResponse<Permission[]>>(Api.permissionList);
            const response = await apiService.rolesAndPermissions()

            setRolesAndpermissions(response.data.data);
            console.log(response.data.data)
            setError(null); // Clear any previous error
        } catch (error) {
            setError("Error occurred while fetching roles and permissions.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Effect hook to fetch employees when component mounts
    // useEffect is the first method executed when a componet is loaded
    useEffect(() => {
        if (location.state?.shouldRefresh) {
            fetchRolesAndPermissions();
        }
    }, [location.state])


    //Component rendering
    return (
        <div className="container-fluid mt-5">
            <div className="card shadow p-4">
                <div className="card header p-3">
                    <h3>Roles And Permissions</h3>
                    <AddRolesAndPermissions />
                </div>
                <div className="table-responsive">
                    <table className="table table-striped table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th>Sl.No</th>
                                <th>Role</th>
                                <th>Permissions</th>
                                <th>Status</th>
                                {/* <th>Action</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {rolesAndpermissions.map((rolesAndPermission, index) => (
                                <tr key={rolesAndPermission.roleAndPermId}>
                                    {/* serial number starts from 1 */}
                                    <td>{index + 1}</td>
                                    <td>{rolesAndPermission.role?.role}</td>
                                    <td>{rolesAndPermission.permission?.permission}</td>
                                    <td>{rolesAndPermission.isActive}</td>
                                    {/* <td>
                                    <Button variant ="secondary" type="submit" onClick={() => update(rolesAndPermission)}>Update</Button>
                                </td> */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default RolesAndPermissionList;