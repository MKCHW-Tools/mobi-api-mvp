/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { DiagnosisCreateNestedManyWithoutUsersInput } from "./DiagnosisCreateNestedManyWithoutUsersInput";
import {
  ValidateNested,
  IsOptional,
  IsString,
  IsJSON,
  IsEnum,
} from "class-validator";
import { Type } from "class-transformer";
import { GraphQLJSON } from "graphql-type-json";
import { InputJsonValue } from "../../types";
import { EnumUserStatus } from "./EnumUserStatus";

@InputType()
class UserCreateInput {
  @ApiProperty({
    required: false,
    type: () => DiagnosisCreateNestedManyWithoutUsersInput,
  })
  @ValidateNested()
  @Type(() => DiagnosisCreateNestedManyWithoutUsersInput)
  @IsOptional()
  @Field(() => DiagnosisCreateNestedManyWithoutUsersInput, {
    nullable: true,
  })
  diagnoses?: DiagnosisCreateNestedManyWithoutUsersInput;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  email?: string | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  firstName?: string | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  lastName?: string | null;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  password!: string;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  phoneNumber!: string;

  @ApiProperty({
    required: true,
  })
  @IsJSON()
  @Field(() => GraphQLJSON)
  roles!: InputJsonValue;

  @ApiProperty({
    required: false,
    enum: EnumUserStatus,
  })
  @IsEnum(EnumUserStatus)
  @IsOptional()
  @Field(() => EnumUserStatus, {
    nullable: true,
  })
  status?: "Active" | "Inactive" | null;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  username!: string;
}

export { UserCreateInput as UserCreateInput };