import { useCallback, useEffect, useState } from "react";
import { Appointment } from "../../models/Appointment";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import apiService from "../../api/apiService";
import ConsultationNotes from "./ConsultationNotes";
import Prescriptions from "./Prescriptions";
import LabTestsPrescribed from "../DoctorsModule/LabTestsPrescribed";
import BillingInfo from "./BillingInfo";

const AppointmentDetails: React.FC = () => {

    const { appointmentId } = useParams();
    const [appointment, setAppointment] = useState<Appointment>()
    const userId = localStorage.getItem("userId");
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const [showBillingInfo, setShowBillingInfo] = useState(false)
    const [showAddTestsToDoBtn, setShowAddTestsToDoBtn] = useState(false)
    const [showAddConsultationNoteBtn, setShowAddConsultationNoteBtn] = useState(false)
    const [showAddPrescriptionBtn, setShowAddPrescriptionBtn] = useState(false)
    const roleId = localStorage.getItem("roleId");
    const location = useLocation();
    const isAdminOrReceptionist = roleId === '4' || roleId === '1';
    const isDoctor = roleId === '3';
    const from = location.state?.from || ""; // e.g., "/reception/appointments" or "/patient/history"
    const isNotInPatientHistory = from !== undefined && !from?.includes('/doctorDash/patientHistory');



    useEffect(() => {
        console.log(roleId)
        console.log(from)
        if (isAdminOrReceptionist) {
            setShowBillingInfo(true);
        } else if (isDoctor && isNotInPatientHistory) {
            setShowAddConsultationNoteBtn(true);
            setShowAddTestsToDoBtn(true);
            setShowAddPrescriptionBtn(true);
        }
    }, []);

    const fetchAppointment = async () => {
        try {
            if (appointmentId !== undefined) {
                setIsLoading(true)
                const response = await apiService.getAppointment(Number(appointmentId))
                setAppointment(response.data.data)
                setError(null)
            }
        } catch (error) {
            setError("Error occured while fetching appointment")
        }
    }

    useEffect(() => {
        fetchAppointment();
    }, [appointmentId])

    const consultationNoteBtn = () => {
        navigate(`/doctorDash/addConsultationNotes/${userId}/${appointmentId}`)
    }

    const prescriptionBtn = () => {
        navigate(`/doctorDash/addPerscription/${userId}/${appointmentId}`)
    }

    const testsBtn = () => {
        navigate(`/doctorDash/addTestsToDo/${appointmentId}`)
    }

    const billingBtn = () => {
        navigate(`/reception/addBillingInfo`)
    }



    const backBtn = () => {
        if (from) {
            navigate(from)
        } else {
            switch (roleId) {
                case '1':
                    navigate(`/admin`);
                    break;
                case '2':
                    navigate(`manager`);
                    break;
                case '3':
                    navigate(`/doctorDash`);
                    break;
                case '4':
                    navigate(`/reception/appointments`);
                    break;
                default:
                    console.error("Unknown role ID:", roleId);

            }
        }
    }

    return (
        <div className="container-fluid mt-5">
            <div className="card shadow p-4">
                <div className="card-header p-2 d-flex justify-content-between align-items-center">
                    <h1>Appointment Details</h1>
                    {showAddConsultationNoteBtn &&
                        <Button className="btn btn-secondary" type="button" onClick={() => consultationNoteBtn()}>
                            Add Consultation Note
                        </Button>
                    }
                    {showAddTestsToDoBtn &&
                        <Button className="btn btn-secondary" type="button" onClick={() => testsBtn()}>
                            Tests To Do
                        </Button>
                    }
                    {showAddPrescriptionBtn &&
                        <Button className="btn btn-secondary" type="button" onClick={() => prescriptionBtn()}>
                            Add Presctription
                        </Button>
                    }
                    {showBillingInfo &&
                        <Button className="btn btn-secondary" type="button" onClick={() => billingBtn()}>
                            Add Billing Info
                        </Button>
                    }
                    <Button className="btn btn-secondary" type="button" onClick={() => backBtn()}>
                        Back
                    </Button>

                </div>
                <div className="card-body">
                    <div className="row d-flex ">
                        <div className="col-sm-3">
                            <p><strong>Patient:</strong> {appointment?.patient?.firstName + " " + appointment?.patient?.lastName}</p>
                        </div>
                        <div className="col-sm-3">
                            <p><strong>Phone No:</strong> {appointment?.patient?.phone}</p>
                        </div>
                        <div className="col-sm-3">
                            <p><strong>Email:</strong> {appointment?.patient?.email}</p>
                        </div>
                    </div>
                    <div>
                        <p><strong>Doctor:</strong> {appointment?.doctor?.name}</p>
                    </div>
                    <div className="row">
                        <div className="col-sm-3">
                            <p><strong>Date:</strong> {appointment?.appointmentDate}</p>
                        </div>
                        <div className="col-sm-3">
                            <p><strong>Time:</strong> {appointment?.appointmentTime}</p>
                        </div>
                        <div className="col-sm-3">
                            <p><strong>Status:</strong> {appointment?.scheduleStatus}</p>
                        </div>
                    </div>
                    <div>
                        <p><strong>Reason for visit:</strong> {appointment?.reasonForVisit}</p>
                    </div>
                </div>
                <div className="card-body">
                    {appointment?.consultationNotes && <ConsultationNotes />}
                    {/* <ConsultationNotes /> */}
                </div>
                <div className="card-body">
                    {appointment?.medicinePrescriptions && <Prescriptions />}
                    {/* <Prescriptions /> */}
                </div>
                <div className="card-body">
                    {appointment?.labTestPrescriptions && <LabTestsPrescribed />}
                    {/* <LabTestsPrescribed /> */}
                </div>
                <div className="card-body">
                    {showBillingInfo && appointment?.consultationBillingList && <BillingInfo />}
                    {/* <BillingInfo /> */}
                </div>
            </div>
        </div>
    )
}

export default AppointmentDetails;