import { Module } from '@nestjs/common';
import { IsExistConstraint } from './is-exist.constraint';
import { IsOneExistConstraint } from './is-one-exist.constraint';
import { isManyExistConstraint } from './is-many-exist.constraint';

@Module({
  providers: [IsExistConstraint, IsOneExistConstraint, isManyExistConstraint],
  exports: [IsExistConstraint, IsOneExistConstraint, isManyExistConstraint]
})
export class ConstraintModule {}
