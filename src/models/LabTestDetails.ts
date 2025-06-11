import { LabTestPrescription } from "./LabTestPrescription";
import { LabTestResult } from "./LabTestResult";

export interface LabTestDetails{
    labTestDetId : number,
    dateAndTime : string,
    remarks : string,
    isActive : boolean,
    labTestPrescription ?: LabTestPrescription,
    labPrescId : number,
    labTestResult ?: LabTestResult
}