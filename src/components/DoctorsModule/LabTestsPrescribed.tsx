import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LabTestPrescription } from "../../models/LabTestPrescription";
import apiService from "../../api/apiService";

const LabTestsPrescribed: React.FC = () => {

    const { appointmentId } = useParams();
    const [prescribedTest, setPrescribedTest] = useState<LabTestPrescription>()
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const fetchTestsPrescribed = useCallback(async () => {
        try {
            setIsLoading(true)
            const response = await apiService.getTestsPrescribedByAppointmentId(Number(appointmentId))
            setPrescribedTest(response.data.data)
            setError(null)
        } catch (error) {
            setError("Error occured while fetching tests prescribed by appointment id.")
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchTestsPrescribed();
    }, [])
    return (
        <div className="container-fluid mt-5">
            <div className="card shadow p-4">
                <div className="card-header p-2 d-flex justify-content-between align-items-center">
                    <h3>Tests Prescribed</h3>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-sm-3">
                            <p><strong>Prescription ID:</strong> {prescribedTest?.labPrescId}</p>
                        </div>
                        <div className="col-sm-3">
                            <p><strong>Test to be done on Before:</strong> {prescribedTest?.testToBeDoneOnOrBefore}</p>
                        </div>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-striped table-hover">
                            <thead className="table-light">
                                <tr>
                                    <th>Sl. No</th>
                                    <th>Test</th>
                                    <th>Parameters</th>
                                    <th>Description</th>
                                    <th>Remarks</th>
                                </tr>
                            </thead>
                            <tbody>
                                {prescribedTest?.labTests.map((test, index) => (
                                    <tr key={test.labTestsId}>
                                        <td>{index + 1}</td>
                                        <td>{test.testName}</td>
                                        <td>{test.parameters}</td>
                                        <td>{test.description}</td>
                                        {prescribedTest?.labTestDetails.map((details) => (
                                        <td>{details?.remarks}</td>
                                ))}
                                    </tr>
                                ))}
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LabTestsPrescribed;