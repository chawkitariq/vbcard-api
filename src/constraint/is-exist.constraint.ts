import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { DataSource, In } from 'typeorm';

@Injectable()
@ValidatorConstraint({ name: 'IsExistConstraint', async: true })
export class IsExistConstraint implements ValidatorConstraintInterface {
  constructor(private readonly dataSource: DataSource) {}

  async validate(ids: any, { constraints }: ValidationArguments): Promise<boolean> {
    const entityClass = constraints[0];
    const repository = this.dataSource.getRepository(entityClass);

    try {
      if (!Array.isArray(ids)) {
        const entity = await repository.findOneBy({ id: ids });
        return !!entity;
      } else {
        const entities = await repository.findBy({ id: In(ids) });
        return entities.length === ids.length;
      }
    } catch (error) {
      return false;
    }
  }

  defaultMessage({ property, value }: ValidationArguments): string {
    if (Array.isArray(value)) {
      return `Some of the IDs in ${property} do not exist`;
    } else {
      return `${property} does not exist`;
    }
  }
}

export function IsExist(entityClass: Function, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [entityClass],
      validator: IsExistConstraint
    });
  };
}
