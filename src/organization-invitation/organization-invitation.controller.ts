import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  BadRequestException,
  Patch
} from '@nestjs/common';
import { OrganizationInvitationService } from './organization-invitation.service';
import { CreateOrganizationInvitationDto } from './dto/create-organization-invitation.dto';
import { OrganizationService } from 'src/organization/organization.service';
import { GetUser } from 'src/decorators/get-user.decorator';
import { UpdateOrganizationInvitationDto } from './dto/update-organization-invitation.dto';
import { Id } from 'src/decorators/id.decorator';

@Controller()
export class OrganizationInvitationController {
  constructor(
    private readonly organizationInvitationService: OrganizationInvitationService,
    private readonly organizationService: OrganizationService
  ) {}

  @Post('organizations/:id/invitations')
  async create(
    @GetUser('id') userId: string,
    @Id() id: string,
    @Body() { email }: CreateOrganizationInvitationDto
  ) {
    const organization = await this.organizationService.findOne({
      id,
      owner: { id: userId }
    });

    if (!organization) {
      throw new BadRequestException('Organization not found');
    }

    return this.organizationInvitationService.create({ email, organization });
  }

  @Get('organizations/:id/invitations')
  findAll(@GetUser('id') userId: string, @Id() id: string) {
    return this.organizationInvitationService.findAll({
      organization: { id, owner: { id: userId } }
    });
  }

  @Get('organizations/:id/invitations/:invitationId')
  findOne(
    @GetUser('id') userId: string,
    @Id() organizationId: string,
    @Id('invitationId') invitationId: string
  ) {
    return this.organizationInvitationService.findOne({
      id: invitationId,
      organization: { id: organizationId, owner: { id: userId } }
    });
  }

  @Patch('organizations/:id/invitations/:invitationId')
  async update(
    @GetUser('id') userId: string,
    @Id() id: string,
    @Body() updateOrganizationInvitationDto: UpdateOrganizationInvitationDto
  ) {
    const { affected } = await this.organizationInvitationService.update(
      {
        id,
        organization: { id, owner: { id: userId } }
      },
      updateOrganizationInvitationDto
    );

    if (!affected) {
      throw new BadRequestException('Invitation not found');
    }
  }

  @Delete('organizations/:id/invitations/:invitationId')
  async remove(
    @GetUser('id') userId: string,
    @Id() organizationId: string,
    @Id('invitationId') invitationId: string
  ) {
    const { affected } = await this.organizationInvitationService.remove({
      id: invitationId,
      organization: { id: organizationId, owner: { id: userId } }
    });

    if (!affected) {
      throw new BadRequestException('Invitation not found');
    }
  }
}
