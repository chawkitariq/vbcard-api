import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext
} from '@nestjs/common';
import { isUUID } from 'class-validator';
import { Request } from 'express';

export const Id = createParamDecorator((name = 'id', ctx: ExecutionContext) => {
  const { params } = ctx.switchToHttp().getRequest<Request>();

  const id = params[name];

  if (!isUUID(id)) {
    throw new BadRequestException(`Param ${name} must be UUID`);
  }

  return id;
});
