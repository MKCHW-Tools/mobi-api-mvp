import { DiagnosisCreateNestedManyWithoutUsersInput } from "./DiagnosisCreateNestedManyWithoutUsersInput";
import { InputJsonValue } from "../../types";

export type UserCreateInput = {
  diagnoses?: DiagnosisCreateNestedManyWithoutUsersInput;
  email?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  password: string;
  phoneNumber: string;
  roles: InputJsonValue;
  status?: "Active" | "Inactive" | null;
  username: string;
};
