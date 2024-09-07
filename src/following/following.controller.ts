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
import { FollowingService } from './following.service';
import { GetUser } from 'src/decorators/get-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { CreateFollowingDto } from './dto/create-following.dto';
import { UpdateFollowingDto } from './dto/update-following.dto';
import { ContactService } from 'src/contact/contact.service';
import { Following } from './entities/following.entity';
import { UpdateResult } from 'typeorm';
import { ContactIdDto } from 'src/dto/contact-id.dto';

@Controller()
export class FollowingController {
  constructor(
    private readonly followingService: FollowingService,
    private readonly contactService: ContactService
  ) {}

  @Post('users/me/followings/:contactId')
  async follow(@GetUser() user: User, @Param() { contactId }: ContactIdDto, @Body() body: CreateFollowingDto) {
    let following: Following | null;

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
  async updateFollow(@GetUser() user: User, @Param() { contactId }: ContactIdDto, @Body() body: UpdateFollowingDto) {
    let updateResult: UpdateResult | undefined;

    try {
      updateResult = await this.followingService.update(user.id, contactId, body);
    } catch (error) {
      throw new InternalServerErrorException('Something wrong');
    }

    if (!updateResult.affected) {
      throw new BadRequestException('Following does not exist');
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
      throw new BadRequestException('Following does not exist');
    }
  }

  @Get('users/me/followings')
  findOneUserFollowings(@GetUser() user: User) {
    return this.followingService.findOneUserFollowings(user.id);
  }

  @Get('contacts/:contactId/followers')
  async findOneContactFollowers(@Param() { contactId }: ContactIdDto) {
    return this.followingService.findOneContactFollowers(contactId);
  }
}
