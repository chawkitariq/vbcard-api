import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrganizationCollaboratorService } from './organization-collaborator.service';
import { CreateOrganizationCollaboratorDto } from './dto/create-organization-collaborator.dto';
import { UpdateOrganizationCollaboratorDto } from './dto/update-organization-collaborator.dto';
import { IdDto } from 'src/dto/id.dto';

@Controller('organizations/collaborators')
export class OrganizationCollaboratorController {
  constructor(private readonly organizationCollaboratorService: OrganizationCollaboratorService) {}

  @Post()
  create(@Body() createOrganizationCollaboratorDto: CreateOrganizationCollaboratorDto) {
    return this.organizationCollaboratorService.create(createOrganizationCollaboratorDto);
  }

  @Get()
  findAll() {
    return this.organizationCollaboratorService.findAll();
  }

  @Get(':id')
  findOne(@Param() { id }: IdDto) {
    return this.organizationCollaboratorService.findOne(id);
  }

  @Patch(':id')
  update(@Param() { id }: IdDto, @Body() updateOrganizationCollaboratorDto: UpdateOrganizationCollaboratorDto) {
    return this.organizationCollaboratorService.update(id, updateOrganizationCollaboratorDto);
  }

  @Delete(':id')
  remove(@Param() { id }: IdDto) {
    return this.organizationCollaboratorService.remove(id);
  }
}
