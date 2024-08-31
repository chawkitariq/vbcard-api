import { Module } from '@nestjs/common';
import { IsExistConstraint } from './is-exist.constraint';
import { IsNotExistConstraint } from './is-not-exist.constraint';

@Module({
  providers: [IsExistConstraint, IsNotExistConstraint],
  exports: [IsExistConstraint, IsNotExistConstraint]
})
export class ConstraintModule {}
