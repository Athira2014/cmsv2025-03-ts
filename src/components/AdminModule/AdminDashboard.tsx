import React from "react";
import '../../styles/DashboardUnits.css';
import { Link, Outlet } from "react-router-dom";

const AdminDashboard: React.FC = () => {
    const userId = localStorage.getItem("userId");

    return (
        <div className="container-dashboard-unit">
            <aside className="sidebar">
                <h2>Admin Panel</h2>
                <ul>
                    <li><Link to={`/admin/staffs/${userId}`}>Staffs</Link></li>
                    <li><Link to={`/admin/addStaffs/${userId}`}>Register Staff</Link></li>
                    <li><Link to={`/admin/roles`}>Roles</Link></li>
                    <li><Link to={`/admin/permissions`}>Permissions</Link></li>
                    <li><Link to="/admin/rolesAndPermissions" state={{shouldRefresh :true}}>Roles And Permissions</Link></li>
                    <li><Link to={`/admin/specializations`}>Specializations</Link></li>
                    <li><Link to="/admin/qualificationList" state={{ shouldRefresh: true }}>Qualifications</Link></li>
                </ul>
            </aside>

            <main className="dashboard-content">
                {/* <h1>Welcome, {localStorage.getItem('userName')}{localStorage.getItem('userId')}!</h1> */}
                <Outlet />
            </main>
        </div>
    );
};

export default AdminDashboard;