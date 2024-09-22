import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Patch,
  BadRequestException,
  HttpCode,
  HttpStatus,
  ConflictException
} from '@nestjs/common';
import { GetUser } from 'src/decorators/get-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { CreateContactFollowerDto } from './dto/create-contact-follower.dto';
import { UpdateContactFollowerDto } from './dto/update-contact-follower.dto';
import { ContactService } from 'src/contact/contact.service';
import { ContactIdDto } from 'src/dto/contact-id.dto';
import { ContactFollowerService } from './contact-follower.service';
import { Not } from 'typeorm';

@Controller()
export class ContactFollowerController {
  constructor(
    private readonly contactFollowerService: ContactFollowerService,
    private readonly contactService: ContactService
  ) {}

  @Post('contacts/:contactId/followings')
  async follow(
    @GetUser() user: User,
    @Param() { contactId }: ContactIdDto,
    @Body() createContactFollowerDto: CreateContactFollowerDto
  ) {
    const isAlreadyFollowing = await this.contactFollowerService.findOneBy({
      follower: { id: user.id },
      contact: { id: contactId }
    });

    if (isAlreadyFollowing) {
      throw new ConflictException('Already followed');
    }

    const contact = await this.contactService.findOneBy({
      id: contactId,
      owner: { id: Not(user.id) }
    });

    const isContactOwner = !contact;

    if (isContactOwner) {
      throw new BadRequestException('You are owner');
    }

    return this.contactFollowerService.create({
      ...createContactFollowerDto,
      follower: user,
      contact
    });
  }

  @Patch('contacts/:contactId/followings')
  async updateFollow(
    @GetUser() user: User,
    @Param() { contactId }: ContactIdDto,
    @Body() updateContactFollowerDto: UpdateContactFollowerDto
  ) {
    const { affected } = await this.contactFollowerService.update(
      {
        follower: { id: user.id },
        contact: { id: contactId }
      },
      updateContactFollowerDto
    );

    if (!affected) {
      throw new BadRequestException('Following not found');
    }
  }

  @Delete('contacts/:contactId/followings')
  @HttpCode(HttpStatus.NO_CONTENT)
  async unfollow(@GetUser() user: User, @Param() { contactId }: ContactIdDto) {
    const { affected } = await this.contactFollowerService.delete({
      follower: { id: user.id },
      contact: { id: contactId }
    });

    if (!affected) {
      throw new BadRequestException('Following not found');
    }
  }

  @Get('users/me/followings')
  findUserMeFollowings(@GetUser() user: User) {
    return this.contactFollowerService.findBy({
      follower: { id: user.id }
    });
  }

  @Get('contacts/:contactId/followers')
  async findContactFollowers(
    @GetUser() user: User,
    @Param() { contactId }: ContactIdDto
  ) {
    return this.contactFollowerService.findBy({
      contact: { id: contactId, owner: { id: user.id } }
    });
  }
}
