import {
  Controller,
  Post,
  Body,
  Delete,
  BadRequestException,
  ConflictException,
  Get
} from '@nestjs/common';
import { ContactTaggingService } from './contact-tagging.service';
import { GetUser } from 'src/decorators/get-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { ContactService } from 'src/contact/contact.service';
import { CreateContactTagDto } from 'src/contact-tag/dto/create-contact-tag.dto';
import { Id } from 'src/decorators/id.decorator';
import { ContactTagController } from 'src/contact-tag/contact-tag.controller';

@Controller()
export class ContactTaggingController {
  constructor(
    private readonly contactTaggingService: ContactTaggingService,
    private readonly contactService: ContactService,
    private readonly contactTagController: ContactTagController
  ) {}

  @Post('contacts/:contactId/tags')
  async create(
    @GetUser() user: User,
    @Id('contactId') contactId: string,
    @Body() { name, ...createContactTagDto }: CreateContactTagDto
  ) {
    const contact = await this.contactService.findOne({ id: contactId });

    if (!contact) {
      throw new ConflictException('Contact not found');
    }

    const isAlreadyTagged = await this.contactTaggingService.exists({
      where: {
        user: { id: user.id },
        contact: { id: contact.id },
        tag: { name }
      }
    });

    if (!isAlreadyTagged) {
      throw new ConflictException('Contact already has tag');
    }

    const tag = await this.contactTagController.create(user, {
      ...createContactTagDto,
      name
    });

    return this.contactTaggingService.create({
      user,
      contact,
      tag
    });
  }

  @Get('contacts/:contactId/tags')
  async findAll(
    @GetUser('id') userId: string,
    @Id('contactId') contactId: string
  ) {
    const contactTagging = await this.contactTaggingService.findAll({
      where: {
        user: { id: userId },
        contact: { id: contactId }
      }
    });

    return contactTagging.map(({ tag }) => tag);
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
      throw new BadRequestException("Contact doesn't have tag");
    }
  }
}
