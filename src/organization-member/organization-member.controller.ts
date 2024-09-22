import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrganizationMemberService } from './organization-member.service';
import { CreateOrganizationMemberDto } from './dto/create-organization-member.dto';
import { UpdateOrganizationMemberDto } from './dto/update-organization-member.dto';
import { IdDto } from 'src/dto/id.dto';

@Controller('organizations/members')
export class OrganizationMemberController {
  constructor(private readonly organizationMemberService: OrganizationMemberService) {}

  @Post()
  create(@Body() createOrganizationMemberDto: CreateOrganizationMemberDto) {
    return this.organizationMemberService.create(createOrganizationMemberDto);
  }

  @Get()
  findAll() {
    return this.organizationMemberService.findAll();
  }

  @Get(':id')
  findOne(@Param() { id }: IdDto) {
    return this.organizationMemberService.findOne(id);
  }

  @Patch(':id')
  update(@Param() { id }: IdDto, @Body() updateOrganizationMemberDto: UpdateOrganizationMemberDto) {
    return this.organizationMemberService.update(id, updateOrganizationMemberDto);
  }

  @Delete(':id')
  remove(@Param() { id }: IdDto) {
    return this.organizationMemberService.remove(id);
  }
}
