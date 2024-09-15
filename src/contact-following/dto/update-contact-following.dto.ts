import { PartialType } from '@nestjs/mapped-types';
import { CreateContactFollowingDto } from './create-contact-following.dto';

export class UpdateContactFollowingDto extends PartialType(CreateContactFollowingDto) {}
