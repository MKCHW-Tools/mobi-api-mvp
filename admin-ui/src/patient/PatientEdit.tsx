import * as React from "react";

import {
  Edit,
  SimpleForm,
  EditProps,
  TextInput,
  ReferenceArrayInput,
  SelectArrayInput,
  SelectInput,
} from "react-admin";

import { DiagnosisTitle } from "../diagnosis/DiagnosisTitle";

export const PatientEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput label="age" source="age" />
        <ReferenceArrayInput
          source="diagnoses"
          reference="Diagnosis"
          parse={(value: any) => value && value.map((v: any) => ({ id: v }))}
          format={(value: any) => value && value.map((v: any) => v.id)}
        >
          <SelectArrayInput optionText={DiagnosisTitle} />
        </ReferenceArrayInput>
        <SelectInput
          source="gender"
          label="gender"
          choices={[
            { label: "Male", value: "Male" },
            { label: "Female", value: "Female" },
          ]}
          optionText="label"
          allowEmpty
          optionValue="value"
        />
        <TextInput label="location" source="location" />
        <TextInput label="name" source="name" />
        <TextInput label="phone number" source="phoneNumber" />
      </SimpleForm>
    </Edit>
  );
};
