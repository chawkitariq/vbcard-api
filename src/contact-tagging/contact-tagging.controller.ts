import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  InternalServerErrorException,
  BadRequestException
} from '@nestjs/common';
import { ContactContactTaggingService } from './contact-tagging.service';
import { GetUser } from 'src/decorators/get-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { ContactService } from 'src/contact/contact.service';
import { CreateContactTagDto } from 'src/contact-tag/dto/create-contact-tag.dto';
import { ContactTagService } from 'src/contact-tag/contact-tag.service';
import { ContactIdDto } from 'src/dto/contact-id.dto';
import { ContactTagIdDto } from 'src/dto/contact-tag-id.dto';
import { DeleteResult } from 'typeorm';

@Controller()
export class ContactContactTaggingController {
  constructor(
    private readonly taggingService: ContactContactTaggingService,
    private readonly contactService: ContactService,
    private readonly contactTagService: ContactTagService
  ) {}

  @Post('users/me/contacts/:contactId/tags')
  async create(@GetUser() user: User, @Param() { contactId }: ContactIdDto, @Body() body: CreateContactTagDto) {
    try {
      const tag = await this.contactTagService.create(body);
      const contact = await this.contactService.findOne(contactId);
      return this.taggingService.create({
        user,
        contact,
        tag
      });
    } catch (error) {
      throw new InternalServerErrorException('Something wrong');
    }
  }

  @Delete('users/me/contacts/:contactId/tags/:contactTagId')
  async remove(@GetUser() user: User, @Param() { contactId }: ContactIdDto, @Param() { contactTagId }: ContactTagIdDto) {
    let deleteResult: DeleteResult | undefined;

    try {
      deleteResult = await this.taggingService.remove(user.id, contactId, contactTagId);
    } catch (error) {
      throw new InternalServerErrorException('Something wrong');
    }

    if (!deleteResult.affected) {
      throw new BadRequestException('Contact have not tag');
    }
  }
}
