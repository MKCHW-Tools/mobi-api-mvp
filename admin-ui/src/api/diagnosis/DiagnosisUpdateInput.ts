import { PatientUpdateManyWithoutDiagnosesInput } from "./PatientUpdateManyWithoutDiagnosesInput";
import { UserUpdateManyWithoutDiagnosesInput } from "./UserUpdateManyWithoutDiagnosesInput";

export type DiagnosisUpdateInput = {
  patient?: PatientUpdateManyWithoutDiagnosesInput;
  user?: UserUpdateManyWithoutDiagnosesInput;
};
