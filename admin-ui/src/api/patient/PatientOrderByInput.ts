import { SortOrder } from "../../util/SortOrder";

export type PatientOrderByInput = {
  age?: SortOrder;
  createdAt?: SortOrder;
  gender?: SortOrder;
  id?: SortOrder;
  location?: SortOrder;
  name?: SortOrder;
  phoneNumber?: SortOrder;
  updatedAt?: SortOrder;
};
