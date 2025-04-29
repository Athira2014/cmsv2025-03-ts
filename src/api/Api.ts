const BASE_URL = "http://localhost:9092/api";
//login 
//receptionist
// {
//     "password": "joh@123",  
//     "email": "john.doe@example.com"
//   }
//Admin
// {
//     "password": "rio@123",  
//     "email": "rio.degen@example.com",
//     "userName":"rio_gen"
//   }

const Api = {
    login: `${BASE_URL}/login`,
    patientList: `${BASE_URL}/patients`,
    addPatient: `${BASE_URL}/addPatients/1`,
    addSpecializations: `${BASE_URL}/addSpecializations`,
    addDoctor : `${BASE_URL}/doctors`,
    addPermission: `${BASE_URL}/admin/permissions`,
    permissionList: `${BASE_URL}/admin/permissions`,
    addRole: `${BASE_URL}/admin/roles`,
    roles: `${BASE_URL}/admin/roles`,
    staffs: `${BASE_URL}/staffs/3`,
    addStaff: `${BASE_URL}/addStaffs/3`,
    specializations : `${BASE_URL}/specializations`
}

export default Api;

