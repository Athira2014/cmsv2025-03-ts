import { LabTestCategory } from "./LabTestCategory";

export interface LabTest{
    labTestsId : number,
    testName : string,
    description : string,
    parameters : string,
    createdDate : string,
    isActive :  boolean,
    labTestCategory ?: LabTestCategory;
    labTestCatId : number
}