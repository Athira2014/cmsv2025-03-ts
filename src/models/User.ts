import { Role } from "./Role";
import { Staff } from "./Staff";

export interface User{
    userId : number,
    staff ?: Staff,
    staffId : number,
    userName : string,
    email : string,
    passwordHash : string,
    role ?: Role,
    roleId : number,
    lastLogin : string,
    isActive : boolean,
    createdAt : string,
    updatedAt : string
}