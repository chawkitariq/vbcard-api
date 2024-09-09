import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
  ValidationOptions
} from 'class-validator';
import vCard = require('vcf');

@Injectable()
@ValidatorConstraint({ name: 'IsVcardConstraint', async: true })
export class IsVcardConstraint implements ValidatorConstraintInterface {
  private errorMessage?: string;

  validate(vcard: string, _: ValidationArguments): boolean {
    try {
      const parsedVcard = vcard.replace(/\r?\n/g, '\r\n');
      new vCard().parse(parsedVcard);
      return true;
    } catch (error) {
      this.errorMessage = error.message;
      return false;
    }
  }

  defaultMessage(_: ValidationArguments): string {
    return this.errorMessage;
  }
}

export function IsVcard(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsVcardConstraint
    });
  };
}
