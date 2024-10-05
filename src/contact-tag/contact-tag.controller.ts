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
import { ContactTagService } from './contact-tag.service';
import { CreateContactTagDto } from './dto/create-contact-tag.dto';
import { UpdateContactTagDto } from './dto/update-contact-tag.dto';
import { Id } from 'src/decorators/id.decorator';
import { GetUser } from 'src/decorators/get-user.decorator';
import { User } from 'src/user/entities/user.entity';

@Controller('contactstags')
export class ContactTagController {
  constructor(private readonly contactTagService: ContactTagService) {}

  @Post()
  async create(
    @GetUser() owner: User,
    @Body() { name, ...createContactTagDto }: CreateContactTagDto
  ) {
    const isExists = await this.contactTagService.exists({
      where: { owner: { id: owner.id }, name }
    });

    if (isExists) {
      throw new ConflictException('Tag already exists');
    }

    return this.contactTagService.create({
      ...createContactTagDto,
      name,
      owner
    });
  }

  @Get()
  findAll(@GetUser('id') ownerId: string) {
    return this.contactTagService.findAll({
      where: {
        owner: { id: ownerId }
      }
    });
  }

  @Get(':id')
  async findOne(@GetUser('id') ownerId: string, @Id() id: string) {
    const tag = await this.contactTagService.findOne({
      where: {
        id,
        owner: { id: ownerId }
      }
    });

    if (!tag) {
      throw new NotFoundException('Tag not found');
    }

    return tag;
  }

  @Patch(':id')
  async update(
    @GetUser() ownerId: string,
    @Id() id: string,
    @Body() { name, ...updateContactTagDto }: UpdateContactTagDto
  ) {
    const { affected } = await this.contactTagService.update(
      {
        id,
        owner: { id: ownerId }
      },
      { ...updateContactTagDto, name }
    );

    if (!affected) {
      throw new BadRequestException('Tag not found');
    }
  }

  @Delete(':id')
  async remove(@GetUser('id') ownerId: string, @Id() id: string) {
    const { affected } = await this.contactTagService.remove({
      id,
      owner: { id: ownerId }
    });

    if (!affected) {
      throw new BadRequestException('Tag not found');
    }
  }
}
