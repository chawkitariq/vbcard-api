import {
  Controller,
  Get,
  Body,
  Delete,
  BadRequestException
} from '@nestjs/common';
import { OrganizationCollaboratorService } from './organization-collaborator.service';
import { CreateOrganizationCollaboratorDto } from './dto/create-organization-collaborator.dto';
import { UpdateOrganizationCollaboratorDto } from './dto/update-organization-collaborator.dto';
import { User } from 'src/user/entities/user.entity';
import { GetUser } from 'src/decorators/get-user.decorator';
import { Id } from 'src/decorators/id.decorator';

@Controller()
export class OrganizationCollaboratorController {
  constructor(
    private readonly organizationCollaboratorService: OrganizationCollaboratorService
  ) {}

  // @Post('organizations/:organizationId/collaborators')
  create(
    @Body() createOrganizationCollaboratorDto: CreateOrganizationCollaboratorDto
  ) {
    return this.organizationCollaboratorService.create(
      createOrganizationCollaboratorDto
    );
  }

  @Get('organizations/:organizationId/collaborators')
  findAll(@GetUser() user: User, @Id('organizationId') organizationId: string) {
    return this.organizationCollaboratorService.findBy({
      organization: { id: organizationId, owner: { id: user.id } }
    });
  }

  @Get('organizations/:organizationId/collaborators/:organizationId')
  findOne(
    @GetUser() user: User,
    @Id('organizationId') organizationId: string,
    @Id('collaboratorId') collaboratorId: string
  ) {
    return this.organizationCollaboratorService.findOneBy({
      id: collaboratorId,
      organization: { id: organizationId, owner: { id: user.id } }
    });
  }

  // @Patch('organizations/:organizationId/collaborators/:organizationId')
  update(
    @Id() id: string,
    @Body() updateOrganizationCollaboratorDto: UpdateOrganizationCollaboratorDto
  ) {
    return this.organizationCollaboratorService.update(
      id,
      updateOrganizationCollaboratorDto
    );
  }

  @Delete('organizations/:organizationId/collaborators/:collaboratorId')
  async removeCollaborator(
    @GetUser() user: User,
    @Id('organizationId') organizationId: string,
    @Id('collaboratorId') collaboratorId: string
  ) {
    const { affected } = await this.organizationCollaboratorService.remove({
      id: collaboratorId,
      organization: { id: organizationId, owner: { id: user.id } }
    });

    if (!affected) {
      throw new BadRequestException('Member not found');
    }
  }

  @Delete('organizations/:organizationId/collaborators/me')
  async leaveUserOrganization(
    @GetUser() user: User,
    @Id('collaboratorId') collaboratorId: string
  ) {
    const { affected } = await this.organizationCollaboratorService.remove({
      id: collaboratorId,
      collaborator: { id: user.id }
    });

    if (!affected) {
      throw new BadRequestException('Organization not found');
    }
  }
}
