import { Doctor } from "./Doctor";

export interface Specialization{
    specializationId : number,
    specializationName : string,
    createdDate?: string,
    isActive?: boolean,
    doctors?: Doctor[]

}