import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MedicinePrescription } from "../../models/MedicinePrescription";
import apiService from "../../api/apiService";
import { Button } from "react-bootstrap";

const Prescriptions: React.FC = () => {
    const { appointmentId } = useParams();
    const [prescriptions, setPrescriptions] = useState<MedicinePrescription[]>([])
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const fetchPrescription = useCallback(async () => {
        try {
            setIsLoading(true)
            const response = await apiService.getPrescriptionByAppointmentId(Number(appointmentId));
            setPrescriptions(response.data.data)
            setError(null)
        } catch (error) {
            setError("Error occured while fetching prescription")
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchPrescription();
    }, [])

    return (
        <div className="container-fluid mt-5">
            <div className="card shadow p-4">
                <div className="card-header p-2 d-flex justify-content-between align-items-center">
                    <h3>Medicines Prescription</h3>
                </div>
                <div className="table-responsive">
                    <table className="table table-striped table-hover">
                        <thead className="table-light">
                            <tr>
                                <th>Sl.No</th>
                                <th>Medicine</th>
                                <th>Dosage</th>
                                <th>Frequency</th>
                            </tr>
                        </thead>
                        <tbody>
                            {prescriptions.map((prescription, index) => (
                                <tr key={prescription.medicinePrescId}>
                                    <td>{index + 1}</td>
                                    <td>{prescription.medicines}</td>
                                    <td>{prescription.dosage}</td>
                                    <td>{prescription.frequency}</td>                                    
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Prescriptions;