import { Diagnosis } from "../diagnosis/Diagnosis";

export type Patient = {
  age: string | null;
  createdAt: Date;
  diagnoses?: Array<Diagnosis>;
  gender?: "Male" | "Female" | null;
  id: string;
  location: string | null;
  name: string | null;
  phoneNumber: string | null;
  updatedAt: Date;
};
