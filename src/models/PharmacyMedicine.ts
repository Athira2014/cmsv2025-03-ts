import { PharmacyMedicineCategory } from "./PharmacyMedicineCategory";
import { PharmacyMedicineInventory } from "./PharmacyMedicineInventory";

export interface PharmacyMedicine{
    pMedId : number,
    pMedCat ?: PharmacyMedicineCategory,
    pMedCatId : number,
    name : string,
    details : string,
    isActive : boolean,
    createdDate : string,
    pharmacyMedicineInventories : PharmacyMedicineInventory[]
}