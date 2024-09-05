import { Module } from '@nestjs/common';
import { IsExistConstraint } from './is-exist.constraint';

@Module({
  providers: [IsExistConstraint],
  exports: [IsExistConstraint]
})
export class ConstraintModule {}
