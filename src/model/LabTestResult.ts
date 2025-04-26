import { LabTestDetails } from "./LabTestDetails";

export interface LabTestResult{
    labTestResId : number,
    labTestDetails ?: LabTestDetails,
    labTestDetId : number,
    description : string,
    result : number,
    flag : string,
    createdDate : string,
    isActive : boolean
}