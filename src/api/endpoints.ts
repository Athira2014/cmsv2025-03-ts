import React from "react";

const BASE_URL = "http://localhost:9092/api";

// Centralizes all endpoint URLs.
const endpoints = {
    login: `${BASE_URL}/login`,
    patientList: `${BASE_URL}/patients`,
    addPatient: (userId : number)=> `${BASE_URL}/addPatients/${userId}`,
    addSpecializations: `${BASE_URL}/addSpecializations`,
    addDoctor: `${BASE_URL}/doctors`,
    upadteDoctor: `${BASE_URL}/doctors`,
    addPermission: `${BASE_URL}/admin/permissions`,
    permissionList: `${BASE_URL}/admin/permissions`,
    addRole: `${BASE_URL}/admin/roles`,
    roles: `${BASE_URL}/admin/roles`,
    staffs:(userId:number) => `${BASE_URL}/staffs/${userId}`,
    addStaff:(userId: number) => `${BASE_URL}/addStaffs/${userId}`,
    specializations: `${BASE_URL}/specializations`,
    getStaff:(userId:number, staffId: number) => `${BASE_URL}/staff/${userId}/${staffId}`, // (/staff/:userid/:staffid) 
    editStaff:(userId:number, staffId: number)=> `${BASE_URL}/updateStaff/${userId}/${staffId}`, //staffs/:userId
}

export default endpoints;