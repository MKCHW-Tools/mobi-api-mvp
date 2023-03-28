import { StringNullableFilter } from "../../util/StringNullableFilter";
import { DiagnosisListRelationFilter } from "../diagnosis/DiagnosisListRelationFilter";
import { StringFilter } from "../../util/StringFilter";

export type PatientWhereInput = {
  age?: StringNullableFilter;
  diagnoses?: DiagnosisListRelationFilter;
  gender?: "Male" | "Female";
  id?: StringFilter;
  location?: StringNullableFilter;
  name?: StringNullableFilter;
  phoneNumber?: StringNullableFilter;
};
