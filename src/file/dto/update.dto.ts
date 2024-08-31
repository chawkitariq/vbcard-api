import { PartialType } from '@nestjs/mapped-types';
import { CreateFileDto } from './create.dto';

export class UpdateFileDto extends PartialType(CreateFileDto) {}
