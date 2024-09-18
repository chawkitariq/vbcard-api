import { PartialType } from '@nestjs/mapped-types';
import { CreateContactFollowerDto } from './create-contact-follower.dto';

export class UpdateContactFollowerDto extends PartialType(CreateContactFollowerDto) {}
