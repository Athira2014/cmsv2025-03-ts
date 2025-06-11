import { Link, Outlet, useParams } from 'react-router-dom';
import '../../styles/DashboardUnits.css';

const DoctorsDashBoard: React.FC = () => {

    const userId = localStorage.getItem("userId");

    return (
        <div className='container-dashboard-unit'>
            <aside className='sidebar'>
                <h2>Doctors Panel</h2>
                <ul>
                    <li><Link to='/doctorDash/appointments'>Appointments</Link></li>
                    <li><Link to='/doctorDash/patients'>Patients List</Link></li>
                </ul>
            </aside>

            <main className="dashboard-content">
                <Outlet />
            </main>
        </div>
    )
}

export default DoctorsDashBoard; 