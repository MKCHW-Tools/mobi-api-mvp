import { Patient } from "../patient/Patient";
import { User } from "../user/User";

export type Diagnosis = {
  createdAt: Date;
  id: string;
  patient?: Array<Patient>;
  updatedAt: Date;
  user?: Array<User>;
};
