import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  InternalServerErrorException
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { UpdateResult } from 'typeorm';
import { FileService } from 'src/file/file.service';
import { GetUser } from 'src/decorators/get-user.decorator';
import { User } from 'src/user/entities/user.entity';

@Controller('contacts')
export class ContactController {
  constructor(
    private readonly contactService: ContactService,
    private readonly fileService: FileService
  ) {}

  @Post()
  async create(@GetUser() user: User, @Body() { photoId, ...createContactDto }: CreateContactDto) {
    try {
      if (photoId) {
        const photo = await this.fileService.findOne(photoId);
        createContactDto.photo = photo;
      }

      return this.contactService.create({
        ...createContactDto,
        author: user
      });
    } catch (error) {
      throw new InternalServerErrorException('Something wrong');
    }
  }

  @Get()
  async findAll() {
    try {
      return this.contactService.findAll();
    } catch (error) {
      throw new InternalServerErrorException('Something wrong');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.contactService.findOneOrHttpFail(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateContactDto: UpdateContactDto) {
    let result: UpdateResult | undefined;

    try {
      result = await this.contactService.update(id, updateContactDto);
    } catch (error) {
      throw new InternalServerErrorException('Something wrong');
    }

    if (!result.affected) {
      throw new NotFoundException('Contact not found');
    }

    return this.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    let result: UpdateResult | undefined;

    try {
      result = await this.contactService.remove(id);
    } catch (error) {
      throw new InternalServerErrorException('Something wrong');
    }

    if (!result.affected) {
      throw new NotFoundException('Contact not found');
    }
  }
}
