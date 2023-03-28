import { DiagnosisCreateNestedManyWithoutPatientsInput } from "./DiagnosisCreateNestedManyWithoutPatientsInput";

export type PatientCreateInput = {
  age?: string | null;
  diagnoses?: DiagnosisCreateNestedManyWithoutPatientsInput;
  gender?: "Male" | "Female" | null;
  location?: string | null;
  name?: string | null;
  phoneNumber?: string | null;
};
