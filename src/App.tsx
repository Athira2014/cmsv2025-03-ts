import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Router, Routes, useLocation } from 'react-router-dom';
import AddPatient from './component/AddPatient';
import PatientList from './component/PatientList';

const AppContent : React.FC = () =>{
  const location = useLocation();
return(
  <>
  <div className='container mt-4'>
    <Routes>
      <Route path="/" element ={<PatientList/>}/>
      <Route path="/patients" element={<PatientList/>}/>
      <Route path="/addPatients" element = {<AddPatient/>}/>
    </Routes>
  </div>
  </>
);
}
const App :React.FC=()=>(
  <BrowserRouter>
    <AppContent/>
  </BrowserRouter>
);
export default App;
