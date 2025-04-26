import { Staff } from "./Staff";

export interface StaffActionLog{
    logId : number,
    staff ?: Staff,
    staffId : number,
    toTable : string,
    action : string,
    actionDate : string
}