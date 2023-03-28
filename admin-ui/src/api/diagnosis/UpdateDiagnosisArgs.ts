import { DiagnosisWhereUniqueInput } from "./DiagnosisWhereUniqueInput";
import { DiagnosisUpdateInput } from "./DiagnosisUpdateInput";

export type UpdateDiagnosisArgs = {
  where: DiagnosisWhereUniqueInput;
  data: DiagnosisUpdateInput;
};
