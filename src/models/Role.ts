import { RolesAndPermissions } from "./RolesAndPermissions";
import { Staff } from "./Staff";
import { User } from "./User";

export interface Role{
    roleId : number,
    role : string,
    responsibility: string,
    isActive?: boolean,
    createdDate?: string,
    staffList?: Staff[],
    rolesAndPermissions?: RolesAndPermissions[],
    users?: User[]
}