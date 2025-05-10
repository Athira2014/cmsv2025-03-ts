import { Appointment } from "./Appointment";
import { Doctor } from "./Doctor";

export interface DoctorsAvailability{
    docAvailabilitytId: number,
    appointmentDate : string,
    appointmentFrom : string,
    appointmentTo : string,
    availabilityStatus : string,
    createdDate :string,
    doctor ?: Doctor,
    docId : number,
    appointment ?: Appointment,
    appointmentId : number
     
}