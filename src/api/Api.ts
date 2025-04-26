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
    login : `${BASE_URL}/login`,
    patientList : `${BASE_URL}/patients`,
    addPatient : `${BASE_URL}/addPatients` 
}

export default Api;

