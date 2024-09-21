import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrganizationInvitationService } from './organization-invitation.service';
import { CreateOrganizationInvitationDto } from './dto/create-organization-invitation.dto';
import { UpdateOrganizationInvitationDto } from './dto/update-organization-invitation.dto';

@Controller('organizations/invitations')
export class OrganizationInvitationController {
  constructor(private readonly organizationInvitationService: OrganizationInvitationService) {}

  @Post()
  create(@Body() createOrganizationInvitationDto: CreateOrganizationInvitationDto) {
    return this.organizationInvitationService.create(createOrganizationInvitationDto);
  }

  @Get()
  findAll() {
    return this.organizationInvitationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.organizationInvitationService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrganizationInvitationDto: UpdateOrganizationInvitationDto) {
    return this.organizationInvitationService.update(id, updateOrganizationInvitationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.organizationInvitationService.remove(id);
  }
}
