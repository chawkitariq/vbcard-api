import { PartialType } from '@nestjs/mapped-types';
import { CreateVerificationDto } from './create.dto';

export class UpdateVerificationDto extends PartialType(CreateVerificationDto) {
  verifiedAt?: Date;
}
