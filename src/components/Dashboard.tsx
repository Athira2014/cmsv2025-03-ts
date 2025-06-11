import AdminDashboard from "./AdminModule/AdminDashboard";
import ReceptionDashBoard from "./ReceptionModule/ReceptionDashBoard";
import '../styles/Dashboard.module.css'
import DoctorsDashBoard from "./DoctorsModule/DoctorsDashBoard";
import LabDashBoard from "./LabModule/LabDashBoard";

export default function Dashboard() {

    return (
        <div className="container">
            <div className="header">
                <h1 className="title">Dashboard</h1>
            </div>
            <div className="grid">
                <div className="card"><AdminDashboard /></div>
                <div className="card"><ReceptionDashBoard /></div>
                <div className="card"><DoctorsDashBoard /></div>
                <div className="card"><LabDashBoard /></div>
            </div>
        </div>
    )
}