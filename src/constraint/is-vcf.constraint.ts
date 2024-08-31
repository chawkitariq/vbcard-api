import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
  ValidationOptions
} from 'class-validator';
import vCard from 'vcf';

type CardVersion = '2.1' | '3.0' | '4.0';

@ValidatorConstraint({ name: 'IsVcf', async: false })
@Injectable()
export class IsVcfConstraint implements ValidatorConstraintInterface {
  validate(vcf: string, args: ValidationArguments): boolean {
    const [expectedVersion] = args.constraints as [CardVersion | undefined];

    try {
      const card = new vCard().parse(vcf);

      if (expectedVersion) {
        return card.version === expectedVersion;
      }

      return true;
    } catch (error) {
      return false;
    }
  }

  defaultMessage(args: ValidationArguments): string {
    const [expectedVersion] = args.constraints as [CardVersion | undefined];
    return expectedVersion ? `Invalid vCard version ${expectedVersion}` : 'Invalid vCard format';
  }
}

export function IsVcf(version?: CardVersion, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [version],
      validator: IsVcfConstraint
    });
  };
}
