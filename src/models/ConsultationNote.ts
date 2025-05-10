import { Appointment } from "./Appointment";
import { Patient } from "./Patient";


export interface ConsultationNote{
    
    consNoteId : number,
    symptoms : string,
    diagnosis : string,
    followUp: string,
    appointment ?: Appointment,
    appointmentId : number,
    patient ?: Patient,
    patientId : number
}