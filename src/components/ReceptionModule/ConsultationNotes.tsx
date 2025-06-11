import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ConsultationNote } from "../../models/ConsultationNote";
import apiService from "../../api/apiService";
import { Button } from "react-bootstrap";

const ConsultationNotes: React.FC = () => {

    const userId = localStorage.getItem("userId");
    const { appointmentId } = useParams();
    const [consultationNote, setConsultationNote] = useState<ConsultationNote>()
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()

    const fetchConsultationNote = useCallback(async () => {
        try {
            const response = await apiService.getConsultationNoteByAppointmentId(Number(appointmentId))
            setConsultationNote(response.data.data)
            setError(null)
        } catch (error) {
            setError("Error occured while fetching ConsultationNote by appointment id.")
        }
    }, [])

    useEffect(() => {
        fetchConsultationNote();
    }, [])

    const handleBackBtn = () => {
        navigate(`/appointmentdetails/${userId}/${appointmentId}`)
    }

    return (
        <div className="container-fluid mt-5">
            <div className="card shadow p-4">
                <div className="card-header p-2 d-flex justify-content-between align-items-center">
                    <h3>Consultation Notes</h3>
                </div>
                <div className="card-body">
                    <div className="row d-flex ">
                        <div className="col-sm-6">
                            <p><strong>Appointment Id:</strong> {consultationNote?.appointmentId}</p>
                        </div>
                        <div className="col-sm-6">
                            <p><strong>Symptoms:</strong> {consultationNote?.symptoms}</p>
                        </div>
                    </div>
                    <div className="row d-flex">
                         <div className="col-sm-6">
                            <p><strong>Observation:</strong> {consultationNote?.diagnosis}</p>
                        </div>
                        <div className="col-sm-6">
                            <p><strong>Follow up details:</strong> {consultationNote?.followUp}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConsultationNotes;