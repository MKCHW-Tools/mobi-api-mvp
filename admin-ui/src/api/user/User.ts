import { Diagnosis } from "../diagnosis/Diagnosis";
import { JsonValue } from "type-fest";

export type User = {
  createdAt: Date;
  diagnoses?: Array<Diagnosis>;
  email: string | null;
  firstName: string | null;
  id: string;
  lastName: string | null;
  phoneNumber: string;
  roles: JsonValue;
  status?: "Active" | "Inactive" | null;
  updatedAt: Date;
  username: string;
};
