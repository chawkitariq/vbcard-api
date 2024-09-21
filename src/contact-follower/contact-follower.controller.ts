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

@Controller()
export class ContactFollowerController {
  constructor(
    private readonly contactFollowerService: ContactFollowerService,
    private readonly contactService: ContactService
  ) {}

  @Post('users/me/followings/:contactId')
  async follow(@GetUser() user: User, @Param() { contactId }: ContactIdDto, @Body() body: CreateContactFollowerDto) {
    const following = await this.contactFollowerService.findOneByUserAndContact(user.id, contactId);

    if (following) {
      throw new ConflictException('Already exists');
    }

    const contact = await this.contactService.findOne(contactId);

    return this.contactFollowerService.create({ ...body, user, contact });
  }

  @Patch('users/me/followings/:contactId')
  async updateFollow(
    @GetUser() user: User,
    @Param() { contactId }: ContactIdDto,
    @Body() body: UpdateContactFollowerDto
  ) {
    const { affected } = await this.contactFollowerService.update(user.id, contactId, body);

    if (!affected) {
      throw new BadRequestException('ContactFollower does not exist');
    }
  }

  @Delete('users/me/followings/:contactId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async unfollow(@GetUser() user: User, @Param() { contactId }: ContactIdDto) {
    const { affected } = await this.contactFollowerService.unfollow(user.id, contactId);

    if (!affected) {
      throw new BadRequestException('ContactFollower does not exist');
    }
  }

  @Get('users/me/followings')
  findUserMeFollowings(@GetUser() user: User) {
    return this.contactFollowerService.findUserFollowings(user.id);
  }

  @Get('contacts/:contactId/followers')
  async findContactFollowers(@Param() { contactId }: ContactIdDto) {
    return this.contactFollowerService.findContactFollowers(contactId);
  }
}
