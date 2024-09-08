import { Module } from '@nestjs/common';
import { IsExistConstraint } from './is-exist.constraint';
import { IsOneExistConstraint } from './is-one-exist.constraint';
import { IsManyExistConstraint } from './is-many-exist.constraint';
import { IsAnyExistConstraint } from './is-any-exist.constraint';

@Module({
  providers: [IsExistConstraint, IsOneExistConstraint, IsManyExistConstraint, IsAnyExistConstraint],
  exports: [IsExistConstraint, IsOneExistConstraint, IsManyExistConstraint, IsAnyExistConstraint]
})
export class ConstraintModule {}
