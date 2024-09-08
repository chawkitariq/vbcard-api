import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { EntityTarget, FindManyOptions, DataSource } from 'typeorm';

type TFindOptionsCallback<Entity> = (value: unknown) => FindManyOptions<Entity>;

type TArgsConstraints<Entity> = [EntityTarget<Entity>, TFindOptionsCallback<Entity>];

@ValidatorConstraint({ name: 'IsExistConstraint', async: true })
@Injectable()
export class IsExistConstraint<Entity> implements ValidatorConstraintInterface {
  constructor(private dataSource: DataSource) {}

  async validate(value: unknown, args: ValidationArguments): Promise<boolean> {
    const [entityClass, findOptionsCallback] = args.constraints as TArgsConstraints<Entity>;

    const repository = this.dataSource.getRepository(entityClass);

    const findOptions = findOptionsCallback(value);

    try {
      return repository.exists(findOptions);
    } catch (error) {
      return false;
    }
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} does not exist!`;
  }
}

export function IsExist<Entity>(
  entity: EntityTarget<Entity>,
  findOptionsCallback: TFindOptionsCallback<Entity>,
  validationOptions?: ValidationOptions
) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [entity, findOptionsCallback] as TArgsConstraints<Entity>,
      validator: IsExistConstraint<Entity>
    });
  };
}
