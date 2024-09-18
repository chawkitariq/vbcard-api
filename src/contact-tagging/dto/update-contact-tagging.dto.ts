import { PartialType } from '@nestjs/mapped-types';
import { CreateContactContactTaggingDto } from './create-contact-tagging.dto';

export class UpdateContactContactTaggingDto extends PartialType(CreateContactContactTaggingDto) {}
