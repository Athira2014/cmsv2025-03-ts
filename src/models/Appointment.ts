import { ConsultationBilling } from "./ConsultationBilling";
import { ConsultationNote } from "./ConsultationNote";
import { Doctor } from "./Doctor";
import { DoctorsAvailability } from "./DoctorsAvailability";
import { LabTestPrescription } from "./LabTestPrescription";
import { MedicinePrescription } from "./MedicinePrescription";
import { Patient } from "./Patient"

export interface Appointment {
    appointmentId?: number,
    appointmentDate?:string,
    reasonForVisit?: string,
    scheduleStatus?: string
    createdDate?: string,
    updatedDate?: string,
    appointmentTime?: string,
    isActive?: boolean,
	doctor?: Doctor,
	docId?: number,
	patient?:Patient,
	patientId?: number
    consultationBillingList?: ConsultationBilling[];
    consultationNotes?: ConsultationNote[];
    doctorsAvailabilities?: DoctorsAvailability[];
    labTestPrescriptions?: LabTestPrescription[];
    medicinePrescriptions?:MedicinePrescription[];
}
