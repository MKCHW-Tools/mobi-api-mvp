import { Module } from "@nestjs/common";
import { PatientModuleBase } from "./base/patient.module.base";
import { PatientService } from "./patient.service";
import { PatientController } from "./patient.controller";
import { PatientResolver } from "./patient.resolver";

@Module({
  imports: [PatientModuleBase],
  controllers: [PatientController],
  providers: [PatientService, PatientResolver],
  exports: [PatientService],
})
export class PatientModule {}
