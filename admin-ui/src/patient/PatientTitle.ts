import { Patient as TPatient } from "../api/patient/Patient";

export const PATIENT_TITLE_FIELD = "name";

export const PatientTitle = (record: TPatient): string => {
  return record.name || String(record.id);
};
