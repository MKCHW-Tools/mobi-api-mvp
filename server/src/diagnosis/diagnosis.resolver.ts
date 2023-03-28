import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { GqlDefaultAuthGuard } from "../auth/gqlDefaultAuth.guard";
import * as common from "@nestjs/common";
import { DiagnosisResolverBase } from "./base/diagnosis.resolver.base";
import { Diagnosis } from "./base/Diagnosis";
import { DiagnosisService } from "./diagnosis.service";

@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
@graphql.Resolver(() => Diagnosis)
export class DiagnosisResolver extends DiagnosisResolverBase {
  constructor(
    protected readonly service: DiagnosisService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
