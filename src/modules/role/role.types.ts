import { PreconditionType } from "@energyweb/iam-contracts";

export interface Fields {
  fieldType: string;
  label: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  minValue?: number;
  maxValue?: number;
  minDate?: Date;
  maxDate?: Date;
}

export interface Issuer {
  issuerType: string;
  did?: string[];
  roleName?: string;
}

export interface EnrolmentPrecondition {
  type: PreconditionType;
  conditions: string[];
}[]