import { Patient } from "../model/Patient";

export interface ApiResponse {
    status: number;
    data: Patient[];
    error: any;
  }