import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { DiagnosisServiceBase } from "./base/diagnosis.service.base";

@Injectable()
export class DiagnosisService extends DiagnosisServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
