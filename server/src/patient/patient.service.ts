import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { PatientServiceBase } from "./base/patient.service.base";

@Injectable()
export class PatientService extends PatientServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
