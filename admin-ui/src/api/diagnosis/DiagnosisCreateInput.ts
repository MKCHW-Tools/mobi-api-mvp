import { PatientCreateNestedManyWithoutDiagnosesInput } from "./PatientCreateNestedManyWithoutDiagnosesInput";
import { UserCreateNestedManyWithoutDiagnosesInput } from "./UserCreateNestedManyWithoutDiagnosesInput";

export type DiagnosisCreateInput = {
  patient?: PatientCreateNestedManyWithoutDiagnosesInput;
  user?: UserCreateNestedManyWithoutDiagnosesInput;
};
