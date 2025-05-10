import { PharmacyMedicine } from "./PharmacyMedicine";

export interface PharmacyMedicineCategory{
    pMedCatId : number,
    pMedCatName : string,
    details : string,
    isActive : boolean,
    createdDate : string,
    pharmacyMedicines : PharmacyMedicine[]
}