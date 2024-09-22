import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ConflictException,
  NotFoundException,
  BadRequestException
} from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { User } from 'src/user/entities/user.entity';
import { GetUser } from 'src/decorators/get-user.decorator';
import { IdDto } from 'src/dto/id.dto';

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
  findAll(@GetUser() owner: User) {
    return this.organizationService.findAllBy({ owner: { id: owner.id } });
  }

  @Get(':id')
  async findOne(@GetUser() owner: User, @Param() { id }: IdDto) {
    const organization = await this.organizationService.findOneBy({ id, owner: { id: owner.id } });

    if (!organization) {
      throw new NotFoundException('Organization Not found');
    }

    return organization;
  }

  @Patch(':id')
  async update(
    @GetUser() owner: User,
    @Param() { id }: IdDto,
    @Body() { name, ...updateOrganizationDto }: UpdateOrganizationDto
  ) {
    if (name) {
      const isNameAlreadyExist = await this.organizationService.isExistBy({ name, owner: { id: owner.id } });

      if (isNameAlreadyExist) {
        throw new ConflictException('Already exists');
      }
    }

    const { affected } = await this.organizationService.update(
      {
        id,
        owner: { id: owner.id }
      },
      { ...updateOrganizationDto, name }
    );

    if (!affected) {
      throw new BadRequestException('Organization not found');
    }
  }

  @Delete(':id')
  async remove(@GetUser() owner: User, @Param() { id }: IdDto) {
    const { affected } = await this.organizationService.remove({ id, owner: { id: owner.id } });

    if (!affected) {
      throw new NotFoundException('Organization Not found');
    }
  }
}
