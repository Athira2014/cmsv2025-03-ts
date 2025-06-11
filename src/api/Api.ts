import { config } from "process";
import axios from 'axios';


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
//     "email": "riogen@gmail.com",
//     "userName":"rio_gen"
//   }
///Doctor
// {
//     "userName": "andrew_j",
//     "password": "andrew@2024",
// 	"email": "andrew@gmail.com"
// }

// const Api = {
//     login: `${BASE_URL}/login`,
//     patientList: `${BASE_URL}/patients`,
//     addPatient: `${BASE_URL}/addPatients/1`,
//     addSpecializations: `${BASE_URL}/addSpecializations`,
//     addDoctor : `${BASE_URL}/doctors`,
//     upadteDoctor : `${BASE_URL}/doctors`,
//     addPermission: `${BASE_URL}/admin/permissions`,
//     permissionList: `${BASE_URL}/admin/permissions`,
//     addRole: `${BASE_URL}/admin/roles`,
//     roles: `${BASE_URL}/admin/roles`,
//     staffs: `${BASE_URL}/staffs/3`,
//     addStaff: `${BASE_URL}/addStaffs/3`,
//     specializations : `${BASE_URL}/specializations`,
//     getStaff : `${BASE_URL}/staff/3`, // (/staff/:userid/:staffid) 
//     editStaff : `${BASE_URL}/updateStaff/3`, //staffs/:userId
// }

// create axios instance
//clean, scalable, and avoids misusing the axios.create()
const api = axios.create({
    baseURL: BASE_URL // backend base URL
});

// Optional: automatically attach token if available
api.interceptors.request.use((config) => { 
    const token =localStorage.getItem('authToken');
    if(token){
        config.headers['authorization'] = token;
    }

    return config;
})

export default api;

