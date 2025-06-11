import { LabTestPrescription } from "../../models/LabTestPrescription";

export interface LabTestPrescriptionDto {
  labTestPrescription: LabTestPrescription;
  labTestIds: number[];
}
