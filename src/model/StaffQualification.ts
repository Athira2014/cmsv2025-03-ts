import { Qualification } from "./Qualification";
import { Staff } from "./Staff";

export interface StaffQualification{
    sqId : number,
    staff ?: Staff,
    staffId : number,
    qualification ?: Qualification,
    qId : number,
    createdDate : string
}