import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { EntityTarget, FindManyOptions, DataSource } from 'typeorm';

@ValidatorConstraint({ name: 'IsManyExistConstraint', async: true })
@Injectable()
export class IsManyExistConstraint<Entity> implements ValidatorConstraintInterface {
  constructor(private dataSource: DataSource) {}

  async validate(value: unknown, args: ValidationArguments): Promise<boolean> {
    const [entityClass, findCallback]: [EntityTarget<Entity>, (value: unknown) => FindManyOptions<Entity>] =
      args.constraints as [EntityTarget<Entity>, (value: unknown) => FindManyOptions<Entity>];

    const repository = this.dataSource.getRepository(entityClass);

    const findOptions = findCallback(value);

    try {
      const entities = await repository.find(findOptions);
      return entities.length > 0;
    } catch (error) {
      return false;
    }
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} does not exist!`;
  }
}

export function IsManyExist<Entity>(
  entity: EntityTarget<Entity>,
  findCallback: (value: unknown) => FindManyOptions<Entity>,
  validationOptions?: ValidationOptions
) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [entity, findCallback] as [EntityTarget<Entity>, (value: unknown) => FindManyOptions<Entity>],
      validator: IsManyExistConstraint<Entity>
    });
  };
}
