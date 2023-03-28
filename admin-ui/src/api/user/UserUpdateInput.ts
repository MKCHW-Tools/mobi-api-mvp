import { DiagnosisUpdateManyWithoutUsersInput } from "./DiagnosisUpdateManyWithoutUsersInput";
import { InputJsonValue } from "../../types";

export type UserUpdateInput = {
  diagnoses?: DiagnosisUpdateManyWithoutUsersInput;
  email?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  password?: string;
  phoneNumber?: string;
  roles?: InputJsonValue;
  status?: "Active" | "Inactive" | null;
  username?: string;
};
