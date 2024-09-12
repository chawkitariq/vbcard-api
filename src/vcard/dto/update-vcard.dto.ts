import { PartialType } from '@nestjs/mapped-types';
import { CreateVcardDto } from './create-vcard.dto';

export class UpdateVcardDto extends PartialType(CreateVcardDto) {}
