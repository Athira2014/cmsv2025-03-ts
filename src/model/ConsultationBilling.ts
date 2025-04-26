import { Appointment } from "./Appointment";

export interface ConsultationBilling{

    consultationBilltId : number,
    additionalCostAny : number,
    totalAmount : number,
    amountPaid : number,
    outstandingAmt : number,
    billingDate : string,
    paymentStatus : string,
    appointment ?: Appointment,
    appointmentId : number
}