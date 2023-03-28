import { DiagnosisWhereInput } from "./DiagnosisWhereInput";
import { DiagnosisOrderByInput } from "./DiagnosisOrderByInput";

export type DiagnosisFindManyArgs = {
  where?: DiagnosisWhereInput;
  orderBy?: Array<DiagnosisOrderByInput>;
  skip?: number;
  take?: number;
};
