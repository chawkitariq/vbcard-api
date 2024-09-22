import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  BadRequestException,
  ConflictException
} from '@nestjs/common';
import { ContactTaggingService } from './contact-tagging.service';
import { GetUser } from 'src/decorators/get-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { ContactService } from 'src/contact/contact.service';
import { CreateContactTagDto } from 'src/contact-tag/dto/create-contact-tag.dto';
import { ContactTagService } from 'src/contact-tag/contact-tag.service';
import { ContactIdDto } from 'src/dto/contact-id.dto';
import { ContactTagIdDto } from 'src/dto/contact-tag-id.dto';

@Controller()
export class ContactTaggingController {
  constructor(
    private readonly contactTaggingService: ContactTaggingService,
    private readonly contactService: ContactService,
    private readonly contactTagService: ContactTagService
  ) {}

  @Post('contacts/:contactId/tags')
  async create(
    @GetUser() user: User,
    @Param() { contactId }: ContactIdDto,
    @Body() { name }: CreateContactTagDto
  ) {
    const isNameAlreadyExist = await this.contactTaggingService.existsBy({
      user: { id: user.id },
      contact: { id: contactId },
      tag: { name }
    });

    if (isNameAlreadyExist) {
      throw new ConflictException('Contact already has the tag');
    }

    const tag = await this.contactTagService.create({ name });
    const contact = await this.contactService.findOne(contactId);

    return this.contactTaggingService.create({
      user,
      contact,
      tag
    });
  }

  @Post('contacts/:contactId/tags')
  async findAll(@GetUser() user: User, @Param() { contactId }: ContactIdDto) {
    return this.contactTaggingService.findBy({
      user: { id: user.id },
      contact: { id: contactId }
    });
  }

  @Post('contacts/:contactId/tags/:contactTagId')
  async update(
    @GetUser() user: User,
    @Param() { contactId }: ContactIdDto,
    @Param() { contactTagId }: ContactTagIdDto
  ) {
    const tag = await this.contactTagService.findOne(contactTagId);
    const contact = await this.contactService.findOne(contactId);

    const isAlreadyExist = await this.contactTaggingService.existsBy({
      user: { id: user.id },
      contact: { id: contactId },
      tag: { id: contactTagId }
    });

    if (isAlreadyExist) {
      throw new ConflictException('Contact already has the tag');
    }

    return this.contactTaggingService.create({
      user,
      contact,
      tag
    });
  }

  @Delete('contacts/:contactId/tags/:contactTagId')
  async remove(
    @GetUser() user: User,
    @Param() { contactId }: ContactIdDto,
    @Param() { contactTagId }: ContactTagIdDto
  ) {
    const { affected } = await this.contactTaggingService.remove({
      user: { id: user.id },
      contact: { id: contactId },
      tag: { id: contactTagId }
    });

    if (!affected) {
      throw new BadRequestException('Contact tag not found');
    }
  }
}
