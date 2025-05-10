import { Appointment } from "./Appointment";
import { LabTest } from "./LabTest";
import { LabTestDetails } from "./LabTestDetails";

export interface LabTestPrescription{

    labPrescId : number,
    appointment ?: Appointment,
    appointmentId : number,
    labTests : LabTest[],
    testToBeDoneOnOrBefore : string,
    isActive : boolean,
    createdDate : string,
    labTestDetails : LabTestDetails[],
    
}