import { MedicinePrescription } from "./MedicinePrescription";
import { PharmacyMedicineInventory } from "./PharmacyMedicineInventory";

export interface PharmacyPurchase{
    pPurchaseId : number,
    medicinePresc ?: MedicinePrescription,
    medicinePrescId : number,
    pMedInv ?: PharmacyMedicineInventory,
    pMedInvId : number,
    pricePerUnit : number,
    dosage : number,
    totalPrice : number,
    isActive : boolean,
    createdDate : string

}