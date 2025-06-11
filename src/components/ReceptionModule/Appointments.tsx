import React, { useEffect, useState } from "react";
import { Appointment } from "../../models/Appointment";
import { Button } from "react-bootstrap";
import apiService from "../../api/apiService";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const Appointments: React.FC = () => {
    const userId = localStorage.getItem("userId");
    const [appointments, setAppointments] = useState<Appointment[]>([])
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const roleId = localStorage.getItem("roleId");
    const [showEditBtn, setShowEditBtn] = useState(false)
    const [showAddNewAppointmentBtn, setShowAddNewAppointmentBtn] = useState(false)



    useEffect(() => {
        if (roleId === '4' || roleId === '1') {
            setShowEditBtn(true);
            setShowAddNewAppointmentBtn(true);
        }
    }, []);

    const fetchAppointments = async () => {
        try {
            setIsLoading(true)
            const response = await apiService.appointments()
            console.log(response.data.data)
            setAppointments(response.data.data)
            setError(null)
        } catch (error) {
            setError("")
        }
    }

    useEffect(() => {
        fetchAppointments();
    }, [])

    const handleEdit = (appointment: Appointment) => {
        navigate(`/reception/updateAppointments/${userId}/${appointment.appointmentId}`)
    }

    const handleNewAppointment = () => {
        navigate(`/reception/addAppointments/${userId}`)
    }

    const location = useLocation();
  
    // To show the consultation details including prescription, consultation notes, billing details, pharmacy dispenses etc
    const handleDetailsBtn = (appointment: Appointment) => {
       const currentPath = location.pathname
       if (currentPath.includes('/doctorDash')) {
            navigate(`/doctorDash/appointmentdetails/${userId}/${appointment.appointmentId}`,
                { state: { from: `/doctorDash/appointments` } }
            )
        } else {
            navigate(`/reception/appointmentdetails/${userId}/${appointment.appointmentId}`,
                { state: { from: `/reception/appointments` } }
            )
        }

    }

    const backBtn = () => {
        if (roleId === '1') {
            navigate(`/admin`);
        } else if (roleId === '2') {
            navigate(`manager`);
        } else if (roleId === '3') {
            navigate(`/doctorDash`);
        } else if (roleId === '4') {
            navigate(`/reception`);
        } else {
            console.error("Unknown role ID:", roleId);
        }
    }

    return (
        <div className="container-fluid mt-5">
            <div className="card shadow p-4">
                <div className="card-header p-2 d-flex justify-content-between align-items-center">
                    <h2>Appointments</h2>
                    {showAddNewAppointmentBtn &&
                        <Button variant="secondary" type="button" onClick={() => handleNewAppointment()}>
                            Add New Appointment
                        </Button>
                    }
                    {/* <Button className="btn btn-secondary" type="button" onClick={() => backBtn()}>
                        Back
                    </Button> */}
                </div>
                <div className="table-responsive">
                    <table className="table table-striped table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th>Sl.No</th>
                                <th>Appointment Date</th>
                                <th>Reason for vist</th>
                                <th>scheduleStatus</th>
                                <th>Created Date</th>
                                <th>Appointment Time</th>
                                <th>Doctor</th>
                                <th>Patient</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map((appointment, index) => (
                                <tr key={appointment.appointmentId}>
                                    <td>{index + 1}</td>
                                    <td>{appointment.appointmentDate}</td>
                                    <td>{appointment.reasonForVisit}</td>
                                    <td>{appointment.scheduleStatus}</td>
                                    <td>{appointment.createdDate}</td>
                                    <td>{appointment.appointmentTime}</td>
                                    <td>{appointment?.doctor?.name}</td>
                                    <td>{appointment.patient?.firstName + "" + appointment.patient?.lastName}</td>
                                    <td>
                                        {showEditBtn &&
                                            <Button variant="secondary" type="button" onClick={() => handleEdit(appointment)}>
                                                Edit
                                            </Button>
                                        }
                                        <Button variant="secondary" type="button" onClick={() => handleDetailsBtn(appointment)}>
                                            Details
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

export default Appointments;