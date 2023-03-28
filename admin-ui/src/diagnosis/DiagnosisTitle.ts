import { Diagnosis as TDiagnosis } from "../api/diagnosis/Diagnosis";

export const DIAGNOSIS_TITLE_FIELD = "id";

export const DiagnosisTitle = (record: TDiagnosis): string => {
  return record.id || String(record.id);
};
