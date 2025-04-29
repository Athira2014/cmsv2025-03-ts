import React, { useCallback, useEffect, useState } from "react";
import { Staff } from "../model/Staff";
import axios from "axios";
import Api from "../api/Api";
import Container from "react-bootstrap/Container";
import { ApiResponse } from "../api/ApiResponse";

const StaffList: React.FC = () => {

    const [staffs, setStaffs] = useState<Staff[]>([])

    const [error, setError] = useState<string | null>(null)

    const [isLoading, setIsLoading] = useState(true)

    const fetchStaff = useCallback(async () => {
        try {
            setIsLoading(true)
            const response = await axios.get<ApiResponse<Staff[]>>(Api.staffs)
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

    return (
        <div className="container-dashboard">
            <div className="card shadow p-4">
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
                                <th>address</th>
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
                                    <td>{staff.tillDate}</td>
                                    <td>{staff.salary}</td>
                                    <td>{staff.status}</td>
                                    <td>{staff.address}</td>
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