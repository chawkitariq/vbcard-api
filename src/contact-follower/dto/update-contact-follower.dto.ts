import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateContactFollowerDto } from './create-contact-follower.dto';

export class UpdateContactFollowerDto extends PartialType(
  OmitType(CreateContactFollowerDto, ['longitude', 'latitude'] as const)
) {}
