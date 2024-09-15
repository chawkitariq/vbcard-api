import { PartialType } from '@nestjs/mapped-types';
import { CreateContactTaggingDto } from './create-contact-tagging.dto';

export class UpdateContactTaggingDto extends PartialType(CreateContactTaggingDto) {}
