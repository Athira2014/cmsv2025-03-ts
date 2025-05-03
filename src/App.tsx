import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Router, Routes, useLocation } from 'react-router-dom';
import AddPatient from './component/AddPatient';
import PatientList from './component/PatientList';
import RolesList from './component/RolesList';
import PermissionList from './component/PermissionList';
import StaffList from './component/StaffList';
import AddStaff from './component/AddStaff';
import AddSpecialization from './component/AddSpecialization';
import EditStaff from './component/EditStaff';

const AppContent: React.FC = () => {
  const location = useLocation();
  return (
    <>
      <div className='container mt-4'>
        <Routes>
          <Route path="/" element={<PatientList />} />
          <Route path="/patients" element={<PatientList />} />
          <Route path="/addPatients" element={<AddPatient />} />
          <Route path="/admin/roles" element={<RolesList />} />
          <Route path="/admin/permissions" element={<PermissionList />} />
          <Route path="/staffs/3" element={<StaffList />} />
          <Route path="addStaffs/3" element={<AddStaff />} />
          <Route path="addSpecializations" element={<AddSpecialization />} />
          <Route path="/staff/:userId/:staffId" element={<EditStaff />} />
          <Route path="/editStaff/:staffId" element={<EditStaff />} />
        </Routes>
      </div>
    </>
  );
}
const App: React.FC = () => (
  <BrowserRouter>
    <AppContent />
  </BrowserRouter>
);
export default App;
