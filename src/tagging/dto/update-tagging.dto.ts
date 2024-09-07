import { PartialType } from '@nestjs/mapped-types';
import { CreateTaggingDto } from './create-tagging.dto';

export class UpdateTaggingDto extends PartialType(CreateTaggingDto) {}
