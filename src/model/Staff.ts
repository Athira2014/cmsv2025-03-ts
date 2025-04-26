import { Doctor } from "./Doctor";
import { Role } from "./Role";
import { StaffAttendance } from "./StaffAttendance";

export interface Staff{
    staffId : number,
    firstName : string,
    lastName : string,
    dob : string,
    role ?: Role,
    phone : string,
    email : string,
    joiningDate : string,
    tillDate : string,
    salary : number,
    status : string,
    address : string,
    doctor ?: Doctor,
    staffAttendances : StaffAttendance[]
}