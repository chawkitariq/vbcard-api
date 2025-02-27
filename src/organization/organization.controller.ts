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
import { Id } from 'src/decorators/id.decorator';

@Controller('organizations')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Post()
  async create(
    @GetUser() owner: User,
    @Body() { name }: CreateOrganizationDto
  ) {
    const isAlreadyExist = await this.organizationService.exists({
      name,
      owner: { id: owner.id }
    });

    if (isAlreadyExist) {
      throw new ConflictException('Already exists');
    }

    return this.organizationService.create({ name, owner });
  }

  @Get()
  findAll(@GetUser() owner: User) {
    return this.organizationService.findAll({ owner: { id: owner.id } });
  }

  @Get(':id')
  async findOne(@GetUser() owner: User, @Id() id: string) {
    return this.organizationService.findOne({
      id,
      owner: { id: owner.id }
    });
  }

  @Patch(':id')
  async update(
    @GetUser() owner: User,
    @Id() id: string,
    @Body() { name, ...updateOrganizationDto }: UpdateOrganizationDto
  ) {
    if (name) {
      const isNameAlreadyExist = await this.organizationService.exists({
        name,
        owner: { id: owner.id }
      });

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
  async remove(@GetUser() owner: User, @Id() id: string) {
    const { affected } = await this.organizationService.remove({
      id,
      owner: { id: owner.id }
    });

    if (!affected) {
      throw new NotFoundException('Organization Not found');
    }
  }
}
