import { PharmacyMedicine } from "./PharmacyMedicine";

export interface PharmacyMedicineInventory{
    pMedInvId : number,
    pMed ?: PharmacyMedicine,
    pMedId : number,
    expiryDate : string,
    manufacturer : string,
    count : number,
    lowFlag : string,
    isActive : boolean,
    createdDate : string
} 