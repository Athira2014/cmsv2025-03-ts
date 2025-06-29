import { Appointment } from "./Appointment";
import { PharmacyPurchase } from "./PharmacyPurchase";

export interface MedicinePrescription{
    medicinePrescId : number,
    appointment ?: Appointment,
    appointmentId : number,
    medicines : string,
    dosage : string,
    frequency : string,
    createdDate : string,
    pharmacyPurchases?: PharmacyPurchase[];
}