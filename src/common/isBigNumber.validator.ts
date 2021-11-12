import { BigNumber } from 'ethers';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'isBigNumber', async: false })
export class IsBigNumber implements ValidatorConstraintInterface {
  validate(val: unknown, args: ValidationArguments) {
    return val instanceof BigNumber;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Invalid big number';
  }
}
