// Import necessary React hooks and libraries
import React, { useEffect, useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';  // For client-side navigation
//import { debounce } from 'lodash';  // Utility for debouncing search input
import { Patient } from '../../models/Patient';
import apiService from '../../api/apiService';
import { Button } from 'react-bootstrap';
import { LabTestResult } from '../../models/LabTestResult';

const LabTestResults: React.FC = () => {
    //State Maintenance
    // State to hold patient
    const [testResults, setTestResults] = useState<LabTestResult[]>([]);

    // error state
    const [error, setError] = useState<string | null>(null);

    //isLoading state
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate()
    const location = useLocation();

    const userId = localStorage.getItem("userId")

    //fetching data using api
    const fetchTestResults = (async () => {
        try {
            setIsLoading(true);
            const response = await apiService.getLabTestResults();
            setTestResults(response.data.data)
            setError(null);
        } catch (error) {
            setError("Error occured while fetching Test results.")
        } finally {
            setIsLoading(false);
        }
    })

    //useEffect - only re-run if data changes
    useEffect(() => {
        fetchTestResults();
    }, [])

    const handleDetailsBtn = (testResult: LabTestResult) => {
        const appointmentId = testResult.labTestDetails?.labTestPrescription?.appointment?.appointmentId;
        navigate(`/laboratory/testResultDetails/${appointmentId}`)
    }

    return (

        <div className="container-fluid mt-5">
            <div className="card shadow p-4">
                <div className="card-header p-2 d-flex justify-content-between align-items-center">
                    <h2>Test Results</h2>
                </div>
                <div className="table table-responsive">
                    <table className="table table-striped table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th>Sl No</th>
                                <th>Prescription Id</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                {/* <th>DOB</th>
                                <th>Sex</th>
                                <th>Phone</th>
                                <th>Email</th> */}
                                <th>Description</th>
                                <th>Result</th>
                                <th>Flag</th>
                            </tr>
                        </thead>
                        <tbody>
                            {testResults?.map((testResult, index) =>
                                <tr key={testResult.labTestResId}>
                                    <td>{index + 1}</td>
                                    <td>{testResult.labTestDetails?.labPrescId}</td>
                                    <td>{testResult.labTestDetails?.labTestPrescription?.appointment?.appointmentId}</td>
                                    <td>{testResult.labTestDetails?.labTestPrescription?.appointment?.patient?.firstName}</td>
                                    <td>{testResult.labTestDetails?.labTestPrescription?.appointment?.patient?.lastName}</td>
                                    {/* <td>{testResult.labTestDetails?.labTestPrescription?.appointment?.patient?.dob}</td>
                                    <td>{testResult.labTestDetails?.labTestPrescription?.appointment?.patient?.sex}</td>
                                    <td>{testResult.labTestDetails?.labTestPrescription?.appointment?.patient?.phone}</td>
                                    <td>{testResult.labTestDetails?.labTestPrescription?.appointment?.patient?.email}</td> */}
                                    <td>{testResult.description}</td>
                                    <td>{testResult.result}</td>
                                    <td>{testResult.flag}</td>
                                    <td>
                                        <Button variant="secondary" type="button" onClick={() => handleDetailsBtn(testResult)}>
                                            Details
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

export default LabTestResults;