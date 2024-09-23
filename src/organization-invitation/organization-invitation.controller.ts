import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  BadRequestException,
  Patch
} from '@nestjs/common';
import { OrganizationInvitationService } from './organization-invitation.service';
import { CreateOrganizationInvitationDto } from './dto/create-organization-invitation.dto';
import { OrganizationService } from 'src/organization/organization.service';
import { GetUser } from 'src/decorators/get-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { UpdateOrganizationInvitationDto } from './dto/update-organization-invitation.dto';
import { Id } from 'src/decorators/id.decorator';

@Controller('organizations/:id/invitations')
export class OrganizationInvitationController {
  constructor(
    private readonly organizationInvitationService: OrganizationInvitationService,
    private readonly organizationService: OrganizationService
  ) {}

  @Post()
  async create(
    @GetUser() user: User,
    @Id() id: string,
    @Body() { email }: CreateOrganizationInvitationDto
  ) {
    const organization = await this.organizationService.findOneBy({
      id,
      owner: { id: user.id }
    });

    if (!organization) {
      throw new BadRequestException('Organization not found');
    }

    return this.organizationInvitationService.create({ email, organization });
  }

  @Get()
  async findAll(@GetUser() user: User, @Id() id: string) {
    const invitations = await this.organizationInvitationService.findBy({
      organization: { id, owner: { id: user.id } }
    });

    if (!invitations.length) {
      throw new BadRequestException('Organization not found');
    }
  }

  @Get(':invitationId')
  async findOne(
    @GetUser() user: User,
    @Id('organizationId') organizationId: string,
    @Param() invitationId: string
  ) {
    const organizationInvitation =
      await this.organizationInvitationService.findOneBy({
        id: invitationId,
        organization: { id: organizationId, owner: { id: user.id } }
      });

    if (!organizationInvitation) {
      throw new BadRequestException('Invitation not found');
    }

    return organizationInvitation;
  }

  @Patch('organizations/:id/members/:id')
  async update(
    @GetUser() user: User,
    @Id() id: string,
    @Body() updateOrganizationInvitationDto: UpdateOrganizationInvitationDto
  ) {
    const { affected } = await this.organizationInvitationService.update(
      {
        id,
        organization: { id, owner: { id: user.id } }
      },
      updateOrganizationInvitationDto
    );

    if (!affected) {
      throw new BadRequestException('Invitation not found');
    }
  }

  @Delete(':invitationId')
  async remove(
    @GetUser() user: User,
    @Id('organizationId') organizationId: string,
    @Param() invitationId: string
  ) {
    const { affected } = await this.organizationInvitationService.remove({
      id: invitationId,
      organization: { id: organizationId, owner: { id: user.id } }
    });

    if (!affected) {
      throw new BadRequestException('Invitation not found');
    }
  }
}
