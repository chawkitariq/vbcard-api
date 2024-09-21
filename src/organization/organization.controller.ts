import { Controller, Get, Post, Body, Patch, Param, Delete, ConflictException } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { IdDto } from 'src/dto/id.dto';
import { User } from 'src/user/entities/user.entity';
import { GetUser } from 'src/decorators/get-user.decorator';

@Controller('organizations')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Post()
  async create(@GetUser() owner: User, @Body() { name }: CreateOrganizationDto) {
    const isAlreadyExist = await this.organizationService.isExistBy({ name, owner: { id: owner.id } });

    if (isAlreadyExist) {
      throw new ConflictException('Already exists');
    }

    return this.organizationService.create({ name, owner });
  }

  @Get()
  findAll() {
    return this.organizationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') { id }: IdDto) {
    return this.organizationService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') { id }: IdDto, @Body() updateOrganizationDto: UpdateOrganizationDto) {
    return this.organizationService.update(id, updateOrganizationDto);
  }

  @Delete(':id')
  remove(@Param('id') { id }: IdDto) {
    return this.organizationService.remove(id);
  }
}
