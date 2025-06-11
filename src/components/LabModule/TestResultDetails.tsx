import { useCallback, useEffect, useState } from "react";
import { Appointment } from "../../models/Appointment";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import apiService from "../../api/apiService";
import { LabResultDTO } from "../../models/LabResultDTO";

const TestResultDetails: React.FC = () => {

    const { appointmentId } = useParams();
    const [details, setDetails] = useState<LabResultDTO[]>()
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    // holding patient and appointment data
    const [appointmentDetails, setAppointmentDetails] = useState<LabResultDTO>()


    const location = useLocation();

    const from = location.state?.from || ""; // e.g., "/reception/appointments" or "/patient/history"

    const fetchTestResultByAppointmentId = async () => {
        try {
            if (appointmentId !== undefined) {
                setIsLoading(true)
                const response = await apiService.getTestResultsByAppointmentId(Number(appointmentId))
                setDetails(response.data)

                // get only the first item for populating details section
                const firstRow = response.data?.[0];

                if (firstRow) {
                    setAppointmentDetails(firstRow);
                }
                setError(null)
            }
        } catch (error) {
            setError("Error occured while fetching lab report by appointment id.")
        }
    }

    useEffect(() => {
        fetchTestResultByAppointmentId();
    }, [appointmentId])


    const handleBackBtn = () => {
        navigate(`/laboratory/testResults`)
    }

    return (
        <div className="container-fluid mt-5">
            <div className="card shadow p-4">
                <div className="card-header p-2 d-flex justify-content-between align-items-center">
                    <h1>Lab Report</h1>
                    <Button className="btn btn-secondary" type="button" onClick={() => handleBackBtn()}>
                        Back
                    </Button>
                </div>
                <div className="card-body">
                    <div className="row d-flex ">
                        <div className="col-sm-3">
                            <p><strong>Appointment Id:</strong> {appointmentDetails?.appointmentId}</p>
                        </div>
                        <div className="col-sm-3">
                            <p><strong>Prescription Id:</strong> {appointmentDetails?.labPrescriptionId}</p>
                        </div>
                        <div className="col-sm-3">
                            <p><strong>Test Detail Id:</strong> {appointmentDetails?.labTestDetailId}</p>
                        </div>
                    </div>
                    <div>
                        <p><strong>Patient Id:</strong> {appointmentDetails?.patientId}</p>
                    </div>
                    <div className="row">
                        <div className="col-sm-3">
                            <p><strong>Patient:</strong> {appointmentDetails?.patientFirstName + " " + appointmentDetails?.patientLastName}</p>
                        </div>
                        <div className="col-sm-3">
                            <p><strong>Phone No:</strong> {appointmentDetails?.phone}</p>
                        </div>
                        <div className="col-sm-3">
                            <p><strong>Email:</strong> {appointmentDetails?.email}</p>
                        </div>
                        <div className="col-sm-3">
                            <p><strong>Gender:</strong> {appointmentDetails?.gender}</p>
                        </div>
                    </div>
                    <div>
                            <p><strong>Dob:</strong> {appointmentDetails?.dateOfBirth}</p>
                    </div>
                </div>
                <div className="table table-responsive">
                    <table className="table table-striped table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th>Sl No</th>
                                <th>Test Result Id</th>
                                <th>Result</th>
                                <th>Description</th>
                                <th>Flag</th>
                            </tr>
                        </thead>
                        <tbody>
                            {details?.map((detailedTestResult, index) =>
                                <tr key={detailedTestResult.labTestResultId}>
                                    <td>{index + 1}</td>
                                    <td>{detailedTestResult.labTestResultId}</td>
                                    <td>{detailedTestResult.resultValue}</td>
                                    <td>{detailedTestResult.resultDescription}</td>
                                    <td>{detailedTestResult.resultFlag}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default TestResultDetails;

