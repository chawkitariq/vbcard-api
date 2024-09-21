import { Controller, Post, Body, Param, Delete, BadRequestException } from '@nestjs/common';
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

  @Post('users/me/contacts/:contactId/tags')
  async create(@GetUser() user: User, @Param() { contactId }: ContactIdDto, @Body() body: CreateContactTagDto) {
    const tag = await this.contactTagService.create(body);
    const contact = await this.contactService.findOne(contactId);

    return this.contactTaggingService.create({
      user,
      contact,
      tag
    });
  }

  @Delete('users/me/contacts/:contactId/tags/:contactTagId')
  async remove(
    @GetUser() user: User,
    @Param() { contactId }: ContactIdDto,
    @Param() { contactTagId }: ContactTagIdDto
  ) {
    const { affected } = await this.contactTaggingService.remove(user.id, contactId, contactTagId);

    if (!affected) {
      throw new BadRequestException('Contact have not tag');
    }
  }
}
