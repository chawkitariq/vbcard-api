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
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity';
import { IsNull, Repository } from 'typeorm';
import { IdDto } from 'src/dto/id.dto';

@Controller('contacts')
export class ContactController {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
    private readonly contactService: ContactService,
    private readonly fileService: FileService
  ) {}

  @Post()
  async create(@GetUser() owner: User, @Body() { photoId, ...createContactDto }: CreateContactDto) {
    if (photoId) {
      const photo = await this.fileService.findOne(photoId);
      createContactDto.photo = photo;
    }

    return this.contactService.create({
      ...createContactDto,
      owner
    });
  }

  @Get()
  async findAll(@GetUser() owner: User) {
    return this.contactRepository.findBy({
      owner: { id: owner.id }
    });
  }

  @Get(':id')
  async findOne(@GetUser() owner: User, @Param() { id }: IdDto) {
    const contact = await this.contactRepository.findOneBy({
      id,
      owner: { id: owner.id }
    });

    if (!contact) {
      throw new NotFoundException('Contact not found');
    }

    return contact;
  }

  @Patch(':id')
  async update(@GetUser() owner: User, @Param() { id }: IdDto, @Body() updateContactDto: UpdateContactDto) {
    const { affected } = await this.contactRepository.update(
      {
        id,
        owner: { id: owner.id }
      },
      updateContactDto
    );

    if (!affected) {
      throw new NotFoundException('Contact not found');
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@GetUser() owner: User, @Param() { id }: IdDto) {
    const { affected } = await this.contactRepository.softDelete({
      id,
      owner: { id: owner.id },
      deletedAt: IsNull()
    });

    if (!affected) {
      throw new NotFoundException('Contact not found');
    }
  }
}
