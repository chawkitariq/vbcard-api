import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  BadRequestException
} from '@nestjs/common';
import { OrganizationInvitationService } from './organization-invitation.service';
import { CreateOrganizationInvitationDto } from './dto/create-organization-invitation.dto';
import { IdDto } from 'src/dto/id.dto';
import { OrganizationService } from 'src/organization/organization.service';
import { GetUser } from 'src/decorators/get-user.decorator';
import { User } from 'src/user/entities/user.entity';

@Controller('organizations/:id/invitations')
export class OrganizationInvitationController {
  constructor(
    private readonly organizationInvitationService: OrganizationInvitationService,
    private readonly organizationService: OrganizationService
  ) {}

  @Post()
  async create(
    @GetUser() user: User,
    @Param() { id }: IdDto,
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
  findAll(@GetUser() user: User, @Param() { id }: IdDto) {
    return this.organizationInvitationService.findBy({
      organization: { id, owner: { id: user.id } }
    });
  }

  @Get(':invitationId')
  async findOne(
    @GetUser() user: User,
    @Param() { id: organizationId }: IdDto,
    @Param() invitationId: string
  ) {
    const organizationInvitation =
      await this.organizationInvitationService.findOneBy({
        id: invitationId,
        organization: { id: organizationId, owner: { id: user.id } }
      });

    if (!organizationInvitation) {
      throw new BadRequestException('Organization not found');
    }

    return organizationInvitation;
  }

  @Delete(':invitationId')
  async remove(
    @GetUser() user: User,
    @Param() { id: organizationId }: IdDto,
    @Param() invitationId: string
  ) {
    const { affected } = await this.organizationInvitationService.remove({
      id: invitationId,
      organization: { id: organizationId, owner: { id: user.id } }
    });

    if (!affected) {
      throw new BadRequestException('Organization not found');
    }
  }
}
