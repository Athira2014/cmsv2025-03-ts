import { data } from "react-router-dom";
import { Patient } from "../models/Patient";
import { Specialization } from "../models/Specialization";
import api from "./api";
import endpoints from "./endpoints";
import { Doctor } from "../models/Doctor";
import { Role } from "../models/Role";
import { Staff } from "../models/Staff";
import { apiResponse } from "./apiResponse";
import { update } from "lodash";
import { Permission } from "../models/Permission";

//This file abstracts HTTP methods for cleaner component usage.
//organize all the API methods into a proper service file
const apiService = {

    // login service
    login: (credentials: { email: string, password: string }) =>
        api.post(endpoints.login, credentials),


    // fetch patientList
    patients: () =>
         api.get<apiResponse<Patient[]>>(endpoints.patientList),

    // add Patient:
    addPatient: (userId: number, data: Patient) =>
        api.post(endpoints.addPatient(userId), data),

    // add Specializations
    addSpecializations: (data: Specialization) =>
        api.post(endpoints.addSpecializations, data),

    //fetch specializations
    specializations: () =>
         api.get<apiResponse<Specialization[]>>(endpoints.specializations),

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
    getStaff:(userId: number, staffId: number) =>
        api.get<apiResponse<Staff>>(endpoints.getStaff(userId, staffId)),

    // update Staff
    updateStaff: (userId: number, staffId: number, data: Staff) =>
        api.put(endpoints.editStaff(userId, staffId), data)
}

export default apiService;