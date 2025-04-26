import { Staff } from "./Staff";

export interface StaffAttendance{
    stAttedanceId : number,
    staff ?: Staff,
    staffId : number,
    entryDateTime : string,
    exitDateTime : string,
    leaveStatus : string
}