import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
  ValidationOptions
} from 'class-validator';
import vCard = require('vcf');

export type TJcard = Parameters<(typeof vCard)['fromJSON']>['0'];

@Injectable()
@ValidatorConstraint({ name: 'IsJcardConstraint', async: true })
export class IsJcardConstraint implements ValidatorConstraintInterface {
  private errorMessage?: string;

  validate(jcard: TJcard, _: ValidationArguments): boolean {
    try {
      vCard.fromJSON(jcard);
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

export function IsJcard(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsJcardConstraint
    });
  };
}
