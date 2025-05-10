import React from "react";
import './AdminDashboard.css';
import { Link } from "react-router-dom";

const AdminDashboard: React.FC = () => {
    const userId = localStorage.getItem("userId");

    return (
        <div className="admin-dashboard">
            <aside className="sidebar">
                <h2>Admin Panel</h2>
                <ul>
                    <li><Link to={`/staffs/${userId}`}>Staffs</Link></li>
                    <li><Link to={`/admin/roles`}>Roles</Link></li>
                    <li><Link to={`/admin/permissions`}>Permissions</Link></li>
                    <li><Link to={`/specializations`}>Specializations</Link></li>
                    <li><Link to="#">Settings</Link></li>
                </ul>
            </aside>

            <main className="dashboard-content">
                <h1>Welcome, {localStorage.getItem('userName')}!</h1>
            </main>
        </div>
    );
};

export default AdminDashboard;