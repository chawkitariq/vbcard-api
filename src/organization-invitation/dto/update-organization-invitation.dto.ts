import { PartialType } from '@nestjs/mapped-types';
import { CreateOrganizationInvitationDto } from './create-organization-invitation.dto';

export class UpdateOrganizationInvitationDto extends PartialType(CreateOrganizationInvitationDto) {}
