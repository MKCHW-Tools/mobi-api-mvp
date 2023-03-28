import { DiagnosisListRelationFilter } from "../diagnosis/DiagnosisListRelationFilter";
import { StringNullableFilter } from "../../util/StringNullableFilter";
import { StringFilter } from "../../util/StringFilter";

export type UserWhereInput = {
  diagnoses?: DiagnosisListRelationFilter;
  email?: StringNullableFilter;
  firstName?: StringNullableFilter;
  id?: StringFilter;
  lastName?: StringNullableFilter;
  phoneNumber?: StringFilter;
  status?: "Active" | "Inactive";
  username?: StringFilter;
};
