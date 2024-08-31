import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { IsExistConstraint } from './is-exist.constraint';

@Injectable()
@ValidatorConstraint({ name: 'IsNotExistConstraint', async: true })
export class IsNotExistConstraint implements ValidatorConstraintInterface {
  constructor(private readonly isExistConstraint: IsExistConstraint) {}

  async validate(ids: any, args: ValidationArguments): Promise<boolean> {
    return !(await this.isExistConstraint.validate(ids, args));
  }

  defaultMessage({ property, value }: ValidationArguments): string {
    if (Array.isArray(value)) {
      return `Some of the IDs in ${property} already exist`;
    } else {
      return `${property} already exists`;
    }
  }
}

export function IsNotExist(entityClass: Function, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [entityClass],
      validator: IsNotExistConstraint
    });
  };
}
