import React from "react";
import Appointments from "../components/ReceptionModule/Appointments";
import { SignUpDTO } from "../models/SignUpDTO";

const BASE_URL = "http://localhost:9092/api";
const userId = localStorage.getItem("userId")

// Centralizes all endpoint URLs.
const endpoints = {
    login: `${BASE_URL}/login`,
    logout: `${BASE_URL}/logout`,
    patientList: `${BASE_URL}/patients`,
    gtPatientById: (patientId: number, userId: number) => `${BASE_URL}/gtPatientById/${patientId}/${userId}`,
    addPatient: (userId: number) => `${BASE_URL}/addPatients/${userId}`,
    updatePatient: (userId: number) => `${BASE_URL}/updatePatient/${userId}`,
    addSpecializations: `${BASE_URL}/addSpecializations`,
    doctorsList: (userId: number) => `${BASE_URL}/getDoctors/${userId}`,
    getDoctorByStaffId: (staffId: number) => `${BASE_URL}/getDoctorByStaffId/${staffId}`,
    addDoctor: `${BASE_URL}/doctors`,
    upadteDoctor: `${BASE_URL}/doctors`,
    addPermission: `${BASE_URL}/admin/permissions`,
    permissionList: `${BASE_URL}/admin/permissions`,
    addRole: `${BASE_URL}/admin/roles`,
    roles: `${BASE_URL}/admin/roles`,
    staffs: (userId: number) => `${BASE_URL}/staffs/${userId}`,
    addStaff: (userId: number) => `${BASE_URL}/addStaffs/${userId}`,
    specializations: `${BASE_URL}/specializations`,
    getStaff: (userId: number, staffId: number) => `${BASE_URL}/staff/${userId}/${staffId}`, // (/staff/:userid/:staffid) 
    editStaff: (userId: number, staffId: number) => `${BASE_URL}/updateStaff/${userId}/${staffId}`, //staffs/:userId
    appointments: `${BASE_URL}/appointments`,
    addAppointments: (userId: number) => `${BASE_URL}/addAppointments/${userId}`,
    getAppointment: (appointmentId: number) => `${BASE_URL}/appointment/${appointmentId}`,
    updateAppointment: (userId: number) => `${BASE_URL}/updateAppointments/${userId}`,
    getConsultationNoteByAppointmentId: (appointmentId: number) =>
        `${BASE_URL}/consultation-notes/appointment/${appointmentId}`,
    getPrescriptionByAppointmentId: (appointmentId: number) =>
        `${BASE_URL}/medicine-prescription/appointment/${appointmentId}`,
    getTestsPrescribedByAppointmentId: (appointmentId: number) =>
        `${BASE_URL}/labtestsprescribed/${appointmentId}`,
    getBillingInfo: (appointmentId: number) =>
        `${BASE_URL}/billings`,
    addBillingInfo: (userId: number) =>
        `${BASE_URL}/addBillingInfo/${userId}`,
    addConsultationNotes: (userId: number) =>
        `${BASE_URL}/consultationnote/${userId}`,
    getLabTests: () =>
        `${BASE_URL}/labTests`,
    addTestsToDo: () =>
        `${BASE_URL}/labtestprescription`,
    getLabTestCategories: () =>
        `${BASE_URL}/labTestCategories`,
    addLabTestCategories: () =>
        `${BASE_URL}/labTestCategories`,
    addLabTest: () =>
        `${BASE_URL}/labTests`,
    getlabTestCategories:() => 
        `${BASE_URL}/labTestCategories`,
    addPrescription:(userId:number) =>
        `${BASE_URL}/addPrescription/${userId}`,
    addQualification:(userId:number) =>
        `${BASE_URL}/addQualifications/${userId}`,
    getQualifications:() =>
        `${BASE_URL}/qualifications`,
    getStaffQualifications:() =>
        `${BASE_URL}/staffQualifications`,
    getRolesAndPermissions:() =>
        `${BASE_URL}/admin/rolesAndPermissions`,
    addRolesAndPermission:() =>
        `${BASE_URL}/admin/addRolesAndPermissions`,
    getAppointmentsByPatientId:(patientId:number)=>
        `${BASE_URL}/appointmentByPatientId/${patientId}`,
    addLabTestResult:() =>
        `${BASE_URL}/lab_test_results`,
    getLabTestResults:() =>
        `${BASE_URL}/labtestresults`,
    getTestResultsByAppointmentId:(appointmentId:number) =>
        `${BASE_URL}/testResults_by_appointment/${appointmentId}`,
    getStaffByEmailId:(emailId:string) =>
        `${BASE_URL}/staff_by_email/${emailId}`,
    createUserRegistration:() =>
        `${BASE_URL}/signup`

}

export default endpoints;