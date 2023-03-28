import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { DiagnosisService } from "./diagnosis.service";
import { DiagnosisControllerBase } from "./base/diagnosis.controller.base";

@swagger.ApiTags("diagnoses")
@common.Controller("diagnoses")
export class DiagnosisController extends DiagnosisControllerBase {
  constructor(
    protected readonly service: DiagnosisService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
