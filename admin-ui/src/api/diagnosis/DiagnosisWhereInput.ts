import { StringFilter } from "../../util/StringFilter";
import { PatientListRelationFilter } from "../patient/PatientListRelationFilter";
import { UserListRelationFilter } from "../user/UserListRelationFilter";

export type DiagnosisWhereInput = {
  id?: StringFilter;
  patient?: PatientListRelationFilter;
  user?: UserListRelationFilter;
};
