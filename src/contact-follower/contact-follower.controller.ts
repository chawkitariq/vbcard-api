import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Patch,
  InternalServerErrorException,
  BadRequestException
} from '@nestjs/common';
import { ContactFollowerService } from './contact-follower.service';
import { GetUser } from 'src/decorators/get-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { CreateContactFollowerDto } from './dto/create-contact-follower.dto';
import { UpdateContactFollowerDto } from './dto/update-contact-follower.dto';
import { ContactService } from 'src/contact/contact.service';
import { ContactFollower } from './entities/contact-follower.entity';
import { UpdateResult } from 'typeorm';
import { ContactIdDto } from 'src/dto/contact-id.dto';

@Controller()
export class ContactFollowerController {
  constructor(
    private readonly contactFollowerService: ContactFollowerService,
    private readonly contactService: ContactService
  ) {}

  @Post('users/me/followings/:contactId')
  async follow(@GetUser() user: User, @Param() { contactId }: ContactIdDto, @Body() body: CreateContactFollowerDto) {
    let following: ContactFollower | null;

    try {
      following = await this.contactFollowerService.findOneByUserAndContact(user.id, contactId);
    } catch (error) {
      throw new InternalServerErrorException('Something wrong');
    }

    if (following) {
      throw new BadRequestException('Already exists');
    }

    try {
      const contact = await this.contactService.findOne(contactId);
      return this.contactFollowerService.create({ ...body, user, contact });
    } catch (error) {
      throw new InternalServerErrorException('Something wrong');
    }
  }

  @Patch('users/me/followings/:contactId')
  async updateFollow(
    @GetUser() user: User,
    @Param() { contactId }: ContactIdDto,
    @Body() body: UpdateContactFollowerDto
  ) {
    let updateResult: UpdateResult | undefined;

    try {
      updateResult = await this.contactFollowerService.update(user.id, contactId, body);
    } catch (error) {
      throw new InternalServerErrorException('Something wrong');
    }

    if (!updateResult.affected) {
      throw new BadRequestException('ContactFollower does not exist');
    }
  }

  @Delete('users/me/followings/:contactId')
  async unfollow(@GetUser() user: User, @Param() { contactId }: ContactIdDto) {
    let updateResult: UpdateResult | undefined;

    try {
      updateResult = await this.contactFollowerService.unfollow(user.id, contactId);
    } catch (error) {
      throw new InternalServerErrorException('Something wrong');
    }

    if (!updateResult.affected) {
      throw new BadRequestException('ContactFollower does not exist');
    }
  }

  @Get('users/me/followings')
  findOneUserContactFollowers(@GetUser() user: User) {
    return this.contactFollowerService.findOneUserContactFollowers(user.id);
  }

  @Get('contacts/:contactId/followers')
  async findOneContactFollowers(@Param() { contactId }: ContactIdDto) {
    return this.contactFollowerService.findOneContactFollowers(contactId);
  }
}
