import { Controller, Get, Post, Delete, Param } from '@nestjs/common';
import { FollowingService } from './following.service';
import { GetUser } from 'src/decorators/get-user.decorator';
import { User } from 'src/user/entities/user.entity';

@Controller()
export class FollowingController {
  constructor(private readonly followingService: FollowingService) {}

  @Post('users/me/followings/:contactId')
  follow(@GetUser() user: User, @Param() contactId: string) {
    console.log(user);
    console.log(contactId);
  }

  @Get('users/me/followings')
  findUserFollowings() {}

  @Get('contacts/:id/followers')
  findContactFollowers() {}

  @Delete('users/me/followings/:contactId')
  unfollow(@GetUser() user: User, @Param() contactId: string) {
    console.log(user);
    console.log(contactId);
  }
}
