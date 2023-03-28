import { StringFilter } from "../../util/StringFilter";
import { StringNullableFilter } from "../../util/StringNullableFilter";

export type HospitalWhereInput = {
  id?: StringFilter;
  name?: StringNullableFilter;
};
