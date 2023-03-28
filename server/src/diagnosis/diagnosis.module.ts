import { Module } from "@nestjs/common";
import { DiagnosisModuleBase } from "./base/diagnosis.module.base";
import { DiagnosisService } from "./diagnosis.service";
import { DiagnosisController } from "./diagnosis.controller";
import { DiagnosisResolver } from "./diagnosis.resolver";

@Module({
  imports: [DiagnosisModuleBase],
  controllers: [DiagnosisController],
  providers: [DiagnosisService, DiagnosisResolver],
  exports: [DiagnosisService],
})
export class DiagnosisModule {}
