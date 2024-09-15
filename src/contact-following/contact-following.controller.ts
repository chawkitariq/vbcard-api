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
import { ContactFollowingService } from './contact-following.service';
import { GetUser } from 'src/decorators/get-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { CreateContactFollowingDto } from './dto/create-contact-following.dto';
import { UpdateContactFollowingDto } from './dto/update-contact-following.dto';
import { ContactService } from 'src/contact/contact.service';
import { ContactFollowing } from './entities/contact-following.entity';
import { UpdateResult } from 'typeorm';
import { ContactIdDto } from 'src/dto/contact-id.dto';

@Controller()
export class ContactFollowingController {
  constructor(
    private readonly followingService: ContactFollowingService,
    private readonly contactService: ContactService
  ) {}

  @Post('users/me/followings/:contactId')
  async follow(@GetUser() user: User, @Param() { contactId }: ContactIdDto, @Body() body: CreateContactFollowingDto) {
    let following: ContactFollowing | null;

    try {
      following = await this.followingService.findOneByUserAndContact(user.id, contactId);
    } catch (error) {
      throw new InternalServerErrorException('Something wrong');
    }

    if (following) {
      throw new BadRequestException('Already exists');
    }

    try {
      const contact = await this.contactService.findOne(contactId);
      return this.followingService.create({ ...body, user, contact });
    } catch (error) {
      throw new InternalServerErrorException('Something wrong');
    }
  }

  @Patch('users/me/followings/:contactId')
  async updateFollow(
    @GetUser() user: User,
    @Param() { contactId }: ContactIdDto,
    @Body() body: UpdateContactFollowingDto
  ) {
    let updateResult: UpdateResult | undefined;

    try {
      updateResult = await this.followingService.update(user.id, contactId, body);
    } catch (error) {
      throw new InternalServerErrorException('Something wrong');
    }

    if (!updateResult.affected) {
      throw new BadRequestException('ContactFollowing does not exist');
    }
  }

  @Delete('users/me/followings/:contactId')
  async unfollow(@GetUser() user: User, @Param() { contactId }: ContactIdDto) {
    let updateResult: UpdateResult | undefined;

    try {
      updateResult = await this.followingService.unfollow(user.id, contactId);
    } catch (error) {
      throw new InternalServerErrorException('Something wrong');
    }

    if (!updateResult.affected) {
      throw new BadRequestException('ContactFollowing does not exist');
    }
  }

  @Get('users/me/followings')
  findOneUserContactFollowings(@GetUser() user: User) {
    return this.followingService.findOneUserContactFollowings(user.id);
  }

  @Get('contacts/:contactId/followers')
  async findOneContactFollowers(@Param() { contactId }: ContactIdDto) {
    return this.followingService.findOneContactFollowers(contactId);
  }
}
