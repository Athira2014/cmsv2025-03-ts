import { Appointment } from "./Appointment";
import { DoctorsAvailability } from "./DoctorsAvailability";
import { Specialization } from "./Specialization";
import { Staff } from "./Staff";

export interface Doctor{
    docId : number,
    staff ?: Staff,
    staffId : number,
    specialization ?: Specialization,
    specializationId : number,
    fee : number,
    licenceNo : number,
    createdDate : string,
    appintments : Appointment[],
    doctorsAvailabilities : DoctorsAvailability[],
    isActive : boolean
}