import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  InternalServerErrorException,
  BadRequestException
} from '@nestjs/common';
import { TaggingService } from './tagging.service';
import { GetUser } from 'src/decorators/get-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { ContactService } from 'src/contact/contact.service';
import { CreateTagDto } from 'src/tag/dto/create-tag.dto';
import { TagService } from 'src/tag/tag.service';
import { ContactIdDto } from 'src/dto/contact-id.dto';
import { TagIdDto } from 'src/dto/tag-id.dto';
import { DeleteResult } from 'typeorm';

@Controller()
export class TaggingController {
  constructor(
    private readonly taggingService: TaggingService,
    private readonly contactService: ContactService,
    private readonly tagService: TagService
  ) {}

  @Post('users/me/contacts/:contactId/tags')
  async create(@GetUser() user: User, @Param() { contactId }: ContactIdDto, @Body() body: CreateTagDto) {
    try {
      const tag = await this.tagService.create(body);
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

  @Delete('users/me/contacts/:contactId/tags/:tagId')
  async remove(@GetUser() user: User, @Param() { contactId }: ContactIdDto, @Param() { tagId }: TagIdDto) {
    let deleteResult: DeleteResult | undefined;

    try {
      deleteResult = await this.taggingService.remove(user.id, contactId, tagId);
    } catch (error) {
      throw new InternalServerErrorException('Something wrong');
    }

    if (!deleteResult.affected) {
      throw new BadRequestException('Contact have not tag');
    }
  }
}
