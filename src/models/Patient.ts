import { Appointment } from "./Appointment";
import { ConsultationNote } from "./ConsultationNote";

export interface Patient{
    patientId : number,
    firstName : string,
    lastName : string,
    dob : string,
    sex : string,
    phone : string,
    email : string,
    address : string,
    membershipStatus : string,
    alternatePhone : string,
    //membershipFromDate : string,
    appointments?:Appointment[],
    consultationNotes?: ConsultationNote[];
}