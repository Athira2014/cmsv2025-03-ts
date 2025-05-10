// Import necessary React hooks and libraries
import React, { useEffect, useState, useCallback } from 'react';  
// Core React functionality
import axios from 'axios';  // For making HTTP requests
import { Link } from 'react-router-dom';  // For client-side navigation
//import { debounce } from 'lodash';  // Utility for debouncing search input
import ReactPaginate from 'react-paginate';  // Pagination component
import { Patient } from '../../models/Patient';
import apiService from '../../api/apiService';

const PatientList: React.FC = () => {
    //State Maintenance
    // State to hold patient
    const [patients, setPatients] = useState<Patient[]>([]);

    // error state
    const [error, setError] = useState<string | null>(null);

    //isLoading state
    const [isLoading, setIsLoading] = useState(true);

    //fetching data using api
    const fetchPatients = (async () => {
        try {
            setIsLoading(true);
            // const response = await axios.get<ApiResponse<Patient[]>>(Api.patientList);
            const response = await apiService.patients();

            setPatients(response.data.data)
            setError(null);
        } catch (error) {
            setError("Error occured while fetching patients list.")
        } finally {
            setIsLoading(false);
        }
    })

    //useEffect - only re-run if patients changes
    useEffect(() => {
        fetchPatients();
    }, [])

    return (

        <div className="container-fluid mt-5">
            <div className="table table-responsive">
                <div className="card shadow p-4">
                    <div className="card-header">
                        Patients List
                    </div>
                    <div className="cardbody">
                        <table className="table table-striped table-hover">
                            <thead className="table-dark">
                                <tr>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>DOB</th>
                                    <th>Sex</th>
                                    <th>Phone</th>
                                    <th>Email</th>
                                    <th>Address</th>
                                    <th>Status</th>
                                    <th>Alternate Phone</th>
                                </tr>
                            </thead>
                            <tbody>
                                {patients.map((patient) =>
                                    <tr key={patient.patientId}>
                                        <td>{patient.firstName}</td>
                                        <td>{patient.lastName}</td>
                                        <td>{patient.dob}</td>
                                        <td>{patient.sex}</td>
                                        <td>{patient.phone}</td>
                                        <td>{patient.email}</td>
                                        <td>{patient.address}</td>
                                        <td>{patient.membershipStatus}</td>
                                        <td>{patient.alternatePhone}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PatientList;