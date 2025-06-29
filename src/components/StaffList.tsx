import React, { useCallback, useEffect, useState } from "react";
import { Staff } from "../models/Staff";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router-dom";
import apiService from "../api/apiService";

const StaffList: React.FC = () => {

      const { userId } = useParams();

    const [staffs, setStaffs] = useState<Staff[]>([])

    const [error, setError] = useState<string | null>(null)

    const [isLoading, setIsLoading] = useState(true)

    const navigate = useNavigate()

    const fetchStaff = useCallback(async () => {
        try {
            setIsLoading(true)
            console.log("userId:" +Number(userId))
            // const response = await axios.get<ApiResponse<Staff[]>>(Api.staffs)
            const response = await apiService.staffs(Number(userId)) //userId
            console.log("response:" +response)

            setStaffs(response.data.data)
            setError(null)
        } catch (error) {
            setError("Error occured while fetching staffs.")
        } finally {
            setIsLoading(false)
        }

    }, [])

    useEffect(() => {
        fetchStaff();
    }, [])

    const handleEdit = (staff: Staff) =>{
        //    navigate(`${Api.getStaff}/${staff.staffId}`);
       // navigate(`/updateStaff/${userId}/`)
           navigate(`/admin/updateStaff/${userId}/${staff.staffId}`);
    }

    return (
        <div className="container-dashboard">
            <div className="card shadow p-4">
                <div className="card-header p-2">
                    <h2>Staff List</h2>
                </div>
                <div className="table-responsive">
                    <table className="table table-striped table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th>Sl.No</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Dob</th>
                                <th>Role</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th>Joining Date</th>
                                <th>Till</th>
                                <th>Salary</th>
                                <th>Status</th>
                                <th>Address</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {staffs.map((staff, index) =>(
                                <tr key={staff.staffId}>
                                    <td>{index+1}</td>
                                    <td>{staff.firstName}</td>
                                    <td>{staff.lastName}</td>
                                    <td>{staff.dob}</td>
                                    <td>{staff.role?.role}</td>
                                    <td>{staff.phone}</td>
                                    <td>{staff.email}</td>
                                    <td>{staff.joiningDate}</td>
                                    <td>{staff.tillDate ? staff.tillDate : " - " }</td>
                                    <td>{staff.salary}</td>
                                    <td>{staff.status}</td>
                                    <td>{staff.address}</td>
                                    <td>
                                        <Button variant = "secondary" type = "button" onClick={()=> handleEdit(staff)}>
                                            Edit
                                        </Button>
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

export default StaffList;