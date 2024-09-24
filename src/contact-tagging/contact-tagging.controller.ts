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
import { Id } from 'src/decorators/id.decorator';

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
    @Id('contactId') contactId: string,
    @Body() { name }: CreateContactTagDto
  ) {
    const contact = await this.contactService.findOne(contactId);

    if (!contact) {
      throw new ConflictException('Contact not found');
    }

    const tag = await this.contactTagService.create({ name });

    if (!tag) {
      throw new ConflictException('Tag not found');
    }

    const isNameAlreadyExist = await this.contactTaggingService.exists({
      user: { id: user.id },
      contact: { id: contactId },
      tag: { name }
    });

    if (isNameAlreadyExist) {
      throw new ConflictException('Contact already has the tag');
    }

    return this.contactTaggingService.create({
      user,
      contact,
      tag
    });
  }

  @Post('contacts/:contactId/tags')
  async findAll(@GetUser() user: User, @Id('contactId') contactId: string) {
    return this.contactTaggingService.findBy({
      user: { id: user.id },
      contact: { id: contactId }
    });
  }

  @Post('contacts/:contactId/tags/:contactTagId')
  async update(
    @GetUser() user: User,
    @Id('contactId') contactId: string,
    @Id('contactTagId') contactTagId: string
  ) {
    const contact = await this.contactService.findOne(contactId);

    if (!contact) {
      throw new BadRequestException('Contact not found');
    }

    const tag = await this.contactTagService.findOne(contactTagId);

    if (!tag) {
      throw new BadRequestException('Tag not found');
    }

    const isAlreadyExist = await this.contactTaggingService.exists({
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
    @Id('contactId') contactId: string,
    @Id('contactTagId') contactTagId: string
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
