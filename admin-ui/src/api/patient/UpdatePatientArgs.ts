import { PatientWhereUniqueInput } from "./PatientWhereUniqueInput";
import { PatientUpdateInput } from "./PatientUpdateInput";

export type UpdatePatientArgs = {
  where: PatientWhereUniqueInput;
  data: PatientUpdateInput;
};
