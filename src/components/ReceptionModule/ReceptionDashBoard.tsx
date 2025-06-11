import { Link, Outlet, useParams } from 'react-router-dom';
import '../../styles/DashboardUnits.css';

const ReceptionDashBoard: React.FC = () => {

    const userId = localStorage.getItem("userId");

    return (
        <div className='container-dashboard-unit'>
            <aside className='sidebar'>
                <h2>Reception Panel</h2>
                <ul>
                    <li><Link to={`/reception/appointments`}>Appointments</Link></li>
                    <li><Link to={`/reception/addAppointments/${userId}`} >Add new appointment</Link></li>
                    <li><Link to='/reception/patients' >Patients List</Link></li>
                    <li><Link to={`/reception/addPatients/${userId}`}>Add new Patient</Link></li>
                </ul>
            </aside>

            <main className="dashboard-content">
                {/* <h1>Welcome, {localStorage.getItem('userName')}!</h1> */}
                <Outlet/>
            </main>
        </div>
    )
}

export default ReceptionDashBoard; 