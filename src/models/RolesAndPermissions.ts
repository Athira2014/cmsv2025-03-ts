import { Permission } from "./Permission";
import { Role } from "./Role";

export interface RolesAndPermissions{
    roleAndPermId ?: number,
    role ?: Role,
    roleId : number,
    permission ?: Permission,
    permissionId : number,
    createdDate : string,
    isActive : boolean
}