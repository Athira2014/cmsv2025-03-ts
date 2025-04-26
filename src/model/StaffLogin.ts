import { Staff } from "./Staff";

export interface StaffLogin{
    stLoginId : number,
    staff ?: Staff,
    staffId : number,
    userName : string,
    password : string,
    createdDate : string

}