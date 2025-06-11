// Import necessary React hooks and libraries
import React, { useEffect, useState, useCallback } from 'react';
// Core React functionality
import axios from 'axios';  // For making HTTP requests
import { useLocation, useNavigate } from 'react-router-dom';  // For client-side navigation
//import { debounce } from 'lodash';  // Utility for debouncing search input
import { Patient } from '../../models/Patient';
import apiService from '../../api/apiService';
import { Button } from 'react-bootstrap';

const PatientList: React.FC = () => {
    //State Maintenance
    // State to hold patient
    const [patients, setPatients] = useState<Patient[]>([]);

    // error state
    const [error, setError] = useState<string | null>(null);

    //isLoading state
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate()
    const location = useLocation();

    const userId = localStorage.getItem("userId")
    const roleId = localStorage.getItem("roleId");
    const [showEditBtn, setShowEditBtn] = useState(false)
    const [showAddNewAppointmentBtn, setShowAddNewAppointmentBtn] = useState(false)

    useEffect(() => {
        if (roleId === '4' || roleId === '1') {
            setShowEditBtn(true);
            setShowAddNewAppointmentBtn(true);
        }
    }, []);

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

    const handleNewPatient = () => {
        navigate(`/reception/addPatients/${userId}`)
    }

    const handleEdit = (patient: Patient) => {
        navigate(`/reception/updatePatient/${userId}/${patient?.patientId}`)
    }

    // To display consultation history (list appointments by patientId, show consultation notes, 
    // prescriptions, pharmacy dispenses and billings)
    const handleHistory = (patient: Patient) => {
        const currentPath = location.pathname
        if (currentPath.includes('/doctorDash')) {
            navigate(`/doctorDash/patientHistory/${userId}/${patient?.patientId}`)
        } else {
            navigate(`/reception/patientHistory/${userId}/${patient?.patientId}`)
        }
    }

    return (

        <div className="container-fluid mt-5">
            <div className="card shadow p-4">
                <div className="card-header p-2 d-flex justify-content-between align-items-center">
                    <h2>Patients List</h2>
                    {showAddNewAppointmentBtn &&
                        <Button variant="secondary" type="button" onClick={() => handleNewPatient()}>
                            Add New Patient
                        </Button>
                    }

                </div>
                <div className="table table-responsive">
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
                                <th>Action</th>
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
                                    <td>
                                        {showEditBtn &&
                                            <Button variant="secondary" type="button" onClick={() => handleEdit(patient)}>
                                                Edit
                                            </Button>
                                        }
                                        <Button variant="secondary" type="button" onClick={() => handleHistory(patient)}>
                                            History
                                        </Button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default PatientList;