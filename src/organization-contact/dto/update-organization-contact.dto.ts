import { PartialType } from '@nestjs/mapped-types';
import { CreateOrganizationContactDto } from './create-organization-contact.dto';

export class UpdateOrganizationContactDto extends PartialType(CreateOrganizationContactDto) {}
