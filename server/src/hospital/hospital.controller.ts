import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { HospitalService } from "./hospital.service";
import { HospitalControllerBase } from "./base/hospital.controller.base";

@swagger.ApiTags("hospitals")
@common.Controller("hospitals")
export class HospitalController extends HospitalControllerBase {
  constructor(
    protected readonly service: HospitalService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
