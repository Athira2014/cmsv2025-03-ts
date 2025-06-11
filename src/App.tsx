import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import AddPatient from './components/ReceptionModule/AddPatient';
import PatientList from './components/ReceptionModule/PatientList';
import PermissionList from './components/AdminModule/PermissionList';
import StaffList from './components/StaffList';
import EditStaff from './components/AdminModule/EditStaff';
import Login from './components/Login';
import NavBar from './components/NavBar';
import AdminDashboard from './components/AdminModule/AdminDashboard';
import Unauthorized from './components/Unauthorized';
import LandingPage from './components/LandingPage/LandingPage';
import PrivateRoute from './components/PrivateRoute';
import RolesList from './components/AdminModule/RolesList';
import SpecializationsList from './components/AdminModule/SpecializationsList';
import apiService from './api/apiService';
import AddAppointment from './components/ReceptionModule/AddAppointment';
import EditAppointment from './components/ReceptionModule/EditAppointment';
import Appointments from './components/ReceptionModule/Appointments';
import ReceptionDashBoard from './components/ReceptionModule/ReceptionDashBoard';
import EditPatient from './components/ReceptionModule/EditPatient';
import AppointmentDetails from './components/ReceptionModule/AppointmentDetails';
import PatientHistory from './components/ReceptionModule/PatientHistory';
import ConsultationNotes from './components/ReceptionModule/ConsultationNotes';
import AddBillingInfo from './components/ReceptionModule/AddBillingInfo';
import DoctorsDashBoard from './components/DoctorsModule/DoctorsDashBoard';
import AddStaff from './components/AdminModule/AddStaff';
import AddTestsToDo from './components/DoctorsModule/AddTestsToDo';
import AddConsultationNotes from './components/DoctorsModule/AddConsultationNotes';
import AddLabTest from './components/LabModule/AddLabTest';
import LabDashBoard from './components/LabModule/LabDashBoard';
import AddLabTestCategory from './components/LabModule/AddLabTestCategory';
import AddTestResult from './components/LabModule/AddTestResult';
import LabTestCategories from './components/LabModule/LabTestCategories';
import LabTests from './components/LabModule/LabTests';
import AddPrescription from './components/DoctorsModule/AddPresctription';
import QualificationList from './components/AdminModule/QualificationList';
import RolesAndPermissionList from './components/AdminModule/RolesAndPermissionList';
import TestResultDetails from './components/LabModule/TestResultDetails';
import LabTestResults from './components/LabModule/LabTestResults';
import SignUp from './components/SignUp';

// const AppContent: React.FC = () => {

//   const location = useLocation();  // Gets current route location
//   const navigate = useNavigate();  // Programmatic navigation
//   const showHeader = location.pathname !== "/login" // show header except for login page\


//   // State management for user authentication
//   const [userName, setUserName] = useState<string>(
//     // Initialize userName from localStorage or empty string
//     () => localStorage.getItem("userName") || ""
//   );

//   // Assume user is logged in initially (might need adjustment)
//   const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true)

//   const handleLogout = () => {
//     localStorage.clear();  // Clear all client-side storage
//     setIsLoggedIn(false); // Update auth state
//     setUserName(""); // Clear username
//     navigate('/login')  // Redirect to login
//   } 

//   return (
//     <>
//       {/* Conditional header rendering */}
//       {showHeader && <NaviBar userName={userName} onLogout={handleLogout} />}
//       <div className='container mt-4'>
//         <Routes>
//           <Route path='/login' element={<Login onLoginSuccess={(username) => {
//                 setUserName(username);
//                 setIsLoggedIn(true);
//                 navigate('/'); 
//               }} 
//             />}/>
//           <Route path="/" element={<PatientList />} />
//           <Route path="/patients" element={<PatientList />} />
//           <Route path="/addPatients" element={<AddPatient />} />
//           <Route path="/admin/roles" element={<RolesList />} />
//           <Route path="/admin/permissions" element={<PermissionList />} />
//           <Route path="/staffs/3" element={<StaffList />} />
//           <Route path="/addStaffs/3" element={<AddStaff />} />
//           <Route path="/addSpecializations" element={<AddSpecialization />} />
//           <Route path="/staff/:userId/:staffId" element={<EditStaff />} />
//           <Route path="/editStaff/:staffId" element={<EditStaff />} />
//           {/* <Route path="/admin/roles" element={<AddRole/>}/> */}
//         </Routes>
//       </div>
//     </>
//   );
// }
// const App: React.FC = () => (
//   <BrowserRouter>
//     <AppContent />
//   </BrowserRouter>
// ); 


// Main application content component
const AppContent: React.FC = () => {

  // State management for user authentication
  const [userName, setUserName] = useState<string>(
    /**
     *  a lazy initializer — a function that runs only once when the component mounts. 
     * @returns    It tries to get "userName" from localStorage.
                    If found, it sets userName to that value.
                    If not, it sets it to an empty string "".
     */
    () => localStorage.getItem("userName") || ""
  );

  // Assume user is logged in initially (might need adjustment) 
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  //Router hooks
  const location = useLocation();
  const showHeader = location.pathname !== "/login"; // hiding header on login page

  //programmatic navigation
  const navigate = useNavigate();

  //logout handler function
  const handleLogout = async () => {
    const response = await apiService.logout();
    localStorage.clear(); // Clear all client-side storage
    setIsLoggedIn(false); // Update auth state
    setUserName(""); // Clear username
    navigate("/login");
  };


  return (
    <>
      {/* conditional rendering */}
      {showHeader && <NavBar userName={userName} onLogout={handleLogout} />}

      {/* Main content container */}
      <div className='container mt-4'>

        {/* Route Configuration */}
        <Routes>
          {/* Public routes */}
          {/* Landingpage */}
          <Route path='/' element={<LandingPage />} />

          {/* SignUp */}
          <Route path='/signup' element={<SignUp/>}/>

          {/* Login route with success callback */}
          <Route path='/login' element={<Login onLoginSuccess={(userName) => {
            setUserName(userName);
            setIsLoggedIn(true);
            navigate('/')
          }} />} />

          {/* unauthorzed access route */}
          <Route path='/unauthorized' element={<Unauthorized />} />

          {/* Role-protected routes */}
          {/* Admin route */}
          {/* ✅ Protected Admin Route with all children */}
          <Route path="/admin" element={
            <PrivateRoute allowedRoles={['1']}>
              <AdminDashboard />
            </PrivateRoute>
          }>
            <Route path="staffs/:userId" element={<StaffList />} />
            <Route path="addStaffs/:userId" element={<AddStaff />} />
            <Route path="updateStaff/:userId/:staffId" element={<EditStaff />} />
            <Route path="roles" element={<RolesList />} />
            <Route path="permissions" element={<PermissionList />} />
            <Route path="rolesAndPermissions" element={<RolesAndPermissionList />} />
            <Route path="specializations" element={<SpecializationsList />} />
            <Route path="qualificationList" element={<QualificationList />} />
            <Route index element={<div>Select a menu option</div>} />
          </Route>

          <Route path="/reception"
            element={
              <PrivateRoute allowedRoles={['4', '1']}>
                <ReceptionDashBoard />
              </PrivateRoute>
            }
          >
            {/* Nested routes  */}
            <Route path="appointments" element={<Appointments />} />
            {/* index - routes are React Router's way of specifying what to render 
            when no nested path is matched. */}
            <Route index element={<Appointments />} />
            <Route path="addAppointments/:userId" element={<AddAppointment />} />
            <Route path="updateAppointments/:userId/:appointmentId" element={<EditAppointment />} />
            <Route path="appointmentdetails/:userId/:appointmentId" element={<AppointmentDetails />} />
            <Route path="patients" element={<PatientList />} />
            <Route path="addPatients/:userId" element={<AddPatient />} />
            <Route path='addBillingInfo' element={<AddBillingInfo />} />
            <Route path='updatePatient/:userId/:patientId' element={<EditPatient />} />
            <Route path='patientHistory/:userId/:patientId' element={<PatientHistory />} />
          </Route>

          {/* Doctor DashBoard */}
          <Route path='/doctorDash' element={<DoctorsDashBoard />}>
            <Route index element={<Appointments />} />
            <Route path="appointments" element={<Appointments />} />
            <Route path="appointmentdetails/:userId/:appointmentId" element={<AppointmentDetails />} />
            <Route path="patients" element={<PatientList />} />
            <Route path='patientHistory/:userId/:patientId' element={<PatientHistory />} />
            <Route path='consultationNotes/:appointmentId' element={<ConsultationNotes />} />
            <Route path='addTestsToDo/:appointmentId' element={<AddTestsToDo />} />
            <Route path='addConsultationNotes/:userId/:appointmentId' element={<AddConsultationNotes />} />
            <Route path='addPerscription/:userId/:appointmentId' element={<AddPrescription />} />
          </Route>


          {/* laboratory DashBoard */}
          <Route path='/laboratory' element={<LabDashBoard />}>
            <Route path='addLabTest' element={<AddLabTest />} />
            <Route path='testList' element={<LabTests />} />
            <Route path='labTestCategories' element={<LabTestCategories />} />
            <Route path='addTestResult' element={<AddTestResult />} />
            <Route path='testResults' element={<LabTestResults />} />
            <Route path = 'testResultDetails/:appointmentId' element={<TestResultDetails/>}/>
          </Route>
        </Routes>
      </div>
    </>
  )
}

const App: React.FC = () => (
  <Router>
    <AppContent />
  </Router>
);
export default App;
