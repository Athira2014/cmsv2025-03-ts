import { Patient } from "../models/Patient";
import { Specialization } from "../models/Specialization";
import api from "./api";
import endpoints from "./endpoints";
import { Doctor } from "../models/Doctor";
import { Role } from "../models/Role";
import { Staff } from "../models/Staff";
import { apiResponse } from "./apiResponse";
import { Permission } from "../models/Permission";
import { Appointment } from "../models/Appointment";
import { ConsultationBilling } from "../models/ConsultationBilling";
import { ConsultationNote } from "../models/ConsultationNote";
import { LabTestPrescriptionDto } from "../components/DoctorsModule/LabTestPrescriptionDto ";
import { LabTestCategory } from "../models/LabTestCategory";
import { LabTest } from "../models/LabTest";
import { MedicinePrescription } from "../models/MedicinePrescription";
import { Qualification } from "../models/Qualification";
import { RolesAndPermissions } from "../models/RolesAndPermissions";
import { LabTestDetails } from "../models/LabTestDetails";
import { LabTestResult } from "../models/LabTestResult";
import { data } from "react-router-dom";
import { LabResultDTO } from "../models/LabResultDTO";
import { SignUpDTO } from "../models/SignUpDTO";

const userId = localStorage.getItem("userId")

//This file abstracts HTTP methods for cleaner component usage.
//organize all the API methods into a proper service file
const apiService = {

    // login service
    login: (credentials: { email: string, password: string }) =>
        api.post(endpoints.login, credentials),

    // logout service
    logout: () =>
        api.post(endpoints.logout),

    // fetch patientList
    patients: () =>
        api.get<apiResponse<Patient[]>>(endpoints.patientList),

    // fetch Patient by Id
    gtPatientById: (patientId: number, userId: number) =>
        api.get(endpoints.gtPatientById(patientId, userId)),

    // add Patient:
    addPatient: (userId: number, data: Patient) =>
        api.post(endpoints.addPatient(userId), data),

    // update patient
    updatePatient: (userId: number, data: Patient) =>
        api.put(endpoints.updatePatient(userId), data),

    // add Specializations
    addSpecializations: (data: Specialization) =>
        api.post(endpoints.addSpecializations, data),

    //fetch specializations
    specializations: () =>
        api.get<apiResponse<Specialization[]>>(endpoints.specializations),

    //Doctors list
    doctorsList: (userId: number) =>
        api.get<Doctor[]>(endpoints.doctorsList(userId)),

    //Get doctor by StaffId
    getDoctorByStaffId: (staffId: number) =>
        api.get(endpoints.getDoctorByStaffId(staffId)),

    // add Doctor
    addDoctor: (data: Doctor) =>
        api.post(endpoints.addDoctor, data),

    // upadte Doctor
    upadteDoctor: (data: Doctor) =>
        api.put(endpoints.upadteDoctor, data),

    // add Permission
    addPermission: (data: Permission) =>
        api.post(endpoints.addPermission, data),

    // permissions List
    permissionList: () =>
        api.get<apiResponse<Permission[]>>(endpoints.permissionList),

    // add Role
    addRole: (data: Role) =>
        api.post(endpoints.addRole, data),

    // roles
    roles: () =>
        api.get<apiResponse<Role[]>>(endpoints.roles),

    // fetch staffs
    staffs: (userId: number) =>
        api.get<apiResponse<Staff[]>>(endpoints.staffs(userId)),

    // addStaff
    addStaff: (userId: number, data: Staff) =>
        api.post(endpoints.addStaff(userId), data),

    // get Staff by staffId
    getStaff: (userId: number, staffId: number) =>
        api.get<apiResponse<Staff>>(endpoints.getStaff(userId, staffId)),

    // update Staff
    updateStaff: (userId: number, staffId: number, data: Staff) =>
        api.put(endpoints.editStaff(userId, staffId), data),

    //Appointment list
    appointments: () =>
        api.get(endpoints.appointments),

    // Add new appointment
    addAppointments: (userId: number, data: Appointment) =>
        api.post(endpoints.addAppointments(userId), data),

    // fetch appointment by id
    getAppointment: (appointmentId: number) =>
        api.get(endpoints.getAppointment(appointmentId)),

    // update Appointment
    updateAppointment: (userId: number, data: Appointment) =>
        api.put(endpoints.updateAppointment(userId), data),

    // ConsultationNote by AppointmentID
    getConsultationNoteByAppointmentId: (appointmentId: number) =>
        api.get(endpoints.getConsultationNoteByAppointmentId(appointmentId)),

    //get medicine prescription by AppointmentID
    getPrescriptionByAppointmentId: (appointmentId: number) =>
        api.get(endpoints.getPrescriptionByAppointmentId(appointmentId)),

    // Get Lab test prescribed by AppointmentID
    getTestsPrescribedByAppointmentId: (appointmentId: number) =>
        api.get(endpoints.getTestsPrescribedByAppointmentId(appointmentId)),

    //get billing info by appointment id
    getBillingInfo: (appointmentId: number) =>
        api.get(endpoints.getBillingInfo(appointmentId)),

    //create billing for consulting
    addBillingInfo: (userId: number, data: ConsultationBilling) =>
        api.post(endpoints.addBillingInfo(userId), data),

    // create consultation note
    addConsultationNotes: (userId: number, data: ConsultationNote) =>
        api.post(endpoints.addConsultationNotes(userId), data),

    // create Tests to do
    addTestsToDo: (dto: LabTestPrescriptionDto) =>
        api.post(endpoints.addTestsToDo(), dto),

    //Get Lab tests
    getLabTests: () =>
        api.get(endpoints.getLabTests()),

    // Get Labt Test Categories
    getLabTestCategories: () =>
        api.get(endpoints.getLabTestCategories()),

    //Add Lab Test Categories
    addLabTestCategories: (data: LabTestCategory) =>
        api.post(endpoints.addLabTestCategories(), data),

    // Add LAbt GTest
    addLabTest: (data: LabTest) =>
        api.post(endpoints.addLabTest(), data),

    // Add Prescriptions
    addPrescription: (userId: number, data: MedicinePrescription) =>
        api.post(endpoints.addPrescription(userId), data),

    // Create new Qualification
    addQualification: (data: Qualification) =>
        api.post(endpoints.addQualification(Number(userId)), data),

    // get qualifications
    qualifications: () =>
        api.get(endpoints.getQualifications()),

    // get Staff Qualifications
    staffQualifications: () =>
        api.get(endpoints.getStaffQualifications()),

    // Get Roles and permissions
    rolesAndPermissions: () =>
        api.get(endpoints.getRolesAndPermissions()),

    // create new roles and permission record
    addRolesAndPermission: (data: RolesAndPermissions) =>
        api.post(endpoints.addRolesAndPermission(), data),

    // Get all appointment history of a patient
    getAppointmentsByPatientId: (patientId: number) =>
        api.get(endpoints.getAppointmentsByPatientId(patientId)),

    // create test results
    addLabTestResult: (data: {
        result: LabTestResult;
        details: LabTestDetails;
    }) => api.post(endpoints.addLabTestResult(), data),

    // Get lab test results
    getLabTestResults: () =>
        api.get(endpoints.getLabTestResults()),

    //Get Test Report By AppointmentId
    getTestResultsByAppointmentId: (appointmentId: number) =>
        api.get<LabResultDTO[]>(endpoints.getTestResultsByAppointmentId(appointmentId)),

    // Get staff by emailid
    getStaffByEmailId: (emailId:string) =>
        api.get(endpoints.getStaffByEmailId(emailId)),

    // User Registration
    createUserRegistration:(data: SignUpDTO) =>
        api.post(endpoints.createUserRegistration(), data)
}

export default apiService;