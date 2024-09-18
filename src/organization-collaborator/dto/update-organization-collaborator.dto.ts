import { PartialType } from '@nestjs/mapped-types';
import { CreateOrganizationCollaboratorDto } from './create-organization-collaborator.dto';

export class UpdateOrganizationCollaboratorDto extends PartialType(CreateOrganizationCollaboratorDto) {}
