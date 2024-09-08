import { Module } from '@nestjs/common';
import { IsExistConstraint } from './is-exist.constraint';
import { IsOneExistConstraint } from './is-one-exist.constraint';
import { isManyExistConstraint } from './is-many-exist.constraint';
import { IsAnyExistConstraint } from './is-any-exist.constraint';

@Module({
  providers: [IsExistConstraint, IsOneExistConstraint, isManyExistConstraint, IsAnyExistConstraint],
  exports: [IsExistConstraint, IsOneExistConstraint, isManyExistConstraint, IsAnyExistConstraint]
})
export class ConstraintModule {}
