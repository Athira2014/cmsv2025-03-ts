import { LabTest } from "./LabTest";

export interface LabTestCategory{
    labTestCatId : number,
    category : string,
    isActive : boolean,
    createdDate : string,
    labTests : LabTest[],
    
}