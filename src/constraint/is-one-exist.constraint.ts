import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { EntityTarget, FindOneOptions, DataSource } from 'typeorm';

@ValidatorConstraint({ name: 'IsOneExistConstraint', async: true })
@Injectable()
export class IsOneExistConstraint<Entity> implements ValidatorConstraintInterface {
  constructor(private dataSource: DataSource) {}

  async validate(value: unknown, args: ValidationArguments): Promise<boolean> {
    const [entityClass, findOneCallback]: [EntityTarget<Entity>, (value: unknown) => FindOneOptions<Entity>] =
      args.constraints as [EntityTarget<Entity>, (value: unknown) => FindOneOptions<Entity>];

    const repository = this.dataSource.getRepository(entityClass);

    const findOne = findOneCallback(value);

    try {
      const entity = await repository.findOne(findOne);
      return !!entity;
    } catch (error) {
      return false;
    }
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} does not exist!`;
  }
}

export function IsOneExists<Entity>(
  entity: EntityTarget<Entity>,
  findOneCallback: (value: unknown) => FindOneOptions<Entity> | FindOneOptions<Entity>[],
  validationOptions?: ValidationOptions
) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [entity, findOneCallback] as [
        EntityTarget<Entity>,
        (value: unknown) => FindOneOptions<Entity> | FindOneOptions<Entity>[]
      ],
      validator: IsOneExistConstraint<Entity>
    });
  };
}
