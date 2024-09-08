import { Module } from '@nestjs/common';
import { IsExistConstraint } from './is-exist.constraint';
import { IsOneExistConstraint } from './is-one-exist.constraint';

@Module({
  providers: [IsExistConstraint, IsOneExistConstraint],
  exports: [IsExistConstraint, IsOneExistConstraint]
})
export class ConstraintModule {}
