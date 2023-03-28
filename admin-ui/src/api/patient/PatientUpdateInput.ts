import { DiagnosisUpdateManyWithoutPatientsInput } from "./DiagnosisUpdateManyWithoutPatientsInput";

export type PatientUpdateInput = {
  age?: string | null;
  diagnoses?: DiagnosisUpdateManyWithoutPatientsInput;
  gender?: "Male" | "Female" | null;
  location?: string | null;
  name?: string | null;
  phoneNumber?: string | null;
};
