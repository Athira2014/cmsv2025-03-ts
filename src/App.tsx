import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import AddPatient from './components/ReceptionModule/AddPatient';
import PatientList from './components/ReceptionModule/PatientList';
import PermissionList from './components/AdminModule/PermissionList';
import StaffList from './components/StaffList';
import AddStaff from './components/AdminModule/AddStaff';
import AddSpecialization from './components/AdminModule/AddSpecialization';
import EditStaff from './components/AdminModule/EditStaff';
import AddRole from './components/AdminModule/AddRole';
import Login from './components/Login';
import NavBar from './components/NavBar';
import AdminDashboard from './components/AdminModule/AdminDashboard';
import Unauthorized from './components/Unauthorized';
import LandingPage from './components/LandingPage/LandingPage';
import PrivateRoute from './components/PrivateRoute';
import RolesList from './components/AdminModule/RolesList';
import SpecializationsList from './components/AdminModule/SpecializationsList';

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
  const handleLogout = () => {
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
          <Route path="/admin"
            element={
              <PrivateRoute allowedRoles={['1']}>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          {/* Staff List */}
          <Route path='/staffs/:userId'
            element={
              <StaffList />
            }
          />
          {/* Update Staff */}
          <Route path='/updateStaff/:userId/:staffId'
            element={
              <PrivateRoute allowedRoles={['1']}>
                <EditStaff />
              </PrivateRoute>
            } />

          {/* Roles List */}
          <Route
            path='/admin/roles'
            element={
              <PrivateRoute allowedRoles={['1']}>
                <RolesList />
              </PrivateRoute>
            }
          />
          {/* Permissions page */}
          <Route path='/admin/permissions'
          element ={
            <PrivateRoute allowedRoles={['1']}>
              <PermissionList/>
            </PrivateRoute>
          }
          />
          {/* Specializations page */}
          <Route path='/specializations'
          element ={
            <PrivateRoute allowedRoles={['1']}>
              <SpecializationsList/>
            </PrivateRoute>
          }
          />
          {/* <Route path="/staffs/:userId" element={<StaffList />} /> */}
          {/* <Route path="/admin/permissions" element={<PermissionList />} /> */}
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
