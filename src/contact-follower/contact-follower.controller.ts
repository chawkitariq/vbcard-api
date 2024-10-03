import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Patch,
  BadRequestException,
  HttpCode,
  HttpStatus,
  ConflictException,
  ForbiddenException,
  NotFoundException
} from '@nestjs/common';
import { GetUser } from 'src/decorators/get-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { CreateContactFollowerDto } from './dto/create-contact-follower.dto';
import { UpdateContactFollowerDto } from './dto/update-contact-follower.dto';
import { ContactService } from 'src/contact/contact.service';
import { ContactFollowerService } from './contact-follower.service';
import { Not } from 'typeorm';
import { Id } from 'src/decorators/id.decorator';

@Controller()
export class ContactFollowerController {
  constructor(
    private readonly contactFollowerService: ContactFollowerService,
    private readonly contactService: ContactService
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('contacts/:id/followers')
  async createFollower(
    @GetUser() user: User,
    @Id() id: string,
    @Body() createContactFollowerDto: CreateContactFollowerDto
  ) {
    const isAlreadyFollowed = await this.contactFollowerService.exists({
      where: {
        follower: { id: user.id },
        contact: { id }
      }
    });

    if (isAlreadyFollowed) {
      throw new ConflictException('Already followed');
    }

    const contact = await this.contactService.findOne({
      id,
      owner: { id: Not(user.id) }
    });

    if (!contact) {
      throw new ForbiddenException('You are owner');
    }

    const follower = await this.contactFollowerService.create({
      ...createContactFollowerDto,
      follower: user,
      contact
    });

    return follower;
  }

  @Get('contacts/:contactId/followers')
  async findAllFollower(
    @GetUser() user: User,
    @Id('contactId') contactId: string
  ) {
    const contact = await this.contactService.findOne({
      id: contactId,
      owner: { id: user.id }
    });

    if (!contact) {
      throw new BadRequestException('Contact not found');
    }

    const followers = await this.contactFollowerService.findAll({
      where: {
        contact: { id: contact.id }
      },
      relations: ['follower']
    });

    return followers.map(({ follower }) => follower);
  }

  @Patch('users/me/followings/:contactId')
  async updateFollowing(
    @GetUser() user: User,
    @Id('contactId') contactId: string,
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

  @Get('users/me/followings')
  async findAllFollowing(@GetUser() user: User) {
    const followings = await this.contactFollowerService.findAll({
      where: {
        follower: { id: user.id }
      },
      relations: ['contact']
    });

    return followings.map(({ contact }) => contact);
  }

  @Get('users/me/followings/:id')
  async findOneFollwing(@GetUser('id') followerId: string, @Id() id: string) {
    const following = await this.contactFollowerService.findOne({
      where: {
        contact: { id },
        follower: { id: followerId }
      },
      relations: ['contact']
    });

    if (!following) {
      throw new NotFoundException('Following not found');
    }

    return following.contact;
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('users/me/followings/:contactId')
  async deleteFollowing(
    @GetUser() user: User,
    @Id('contactId') contactId: string
  ) {
    const { affected } = await this.contactFollowerService.delete({
      follower: { id: user.id },
      contact: { id: contactId }
    });

    if (!affected) {
      throw new BadRequestException('Following not found');
    }
  }
}
