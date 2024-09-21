import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  HttpCode,
  HttpStatus
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
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
    if (photoId) {
      const photo = await this.fileService.findOne(photoId);
      createContactDto.photo = photo;
    }

    return this.contactService.create({
      ...createContactDto,
      author: user
    });
  }

  @Get()
  async findAll() {
    return this.contactService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const contact = await this.contactService.findOne(id);

    if (!contact) {
      throw new NotFoundException('Contact not found');
    }

    return contact;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateContactDto: UpdateContactDto) {
    const { affected } = await this.contactService.update(id, updateContactDto);

    if (!affected) {
      throw new NotFoundException('Contact not found');
    }

    return this.findOne(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    const { affected } = await this.contactService.remove(id);

    if (!affected) {
      throw new NotFoundException('Contact not found');
    }
  }
}
