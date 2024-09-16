import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  InternalServerErrorException,
  Post,
  Query
} from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Public } from 'src/decorator/public.decorator';
import { UserVerifyDto } from './dto/user-verify.dto';
import { UserVerifyResendDto } from './dto/user-verify-resend.dto';
import { UserVerificationService } from './user-verification.service';

@Controller('users')
export class UserVerificationController {
  constructor(
    private readonly authVerificationService: UserVerificationService,
    private readonly userService: UserService
  ) {}

  @Public()
  @Post('/verify')
  async verify(@Body() { token }: UserVerifyDto) {
    let user: User | null;

    try {
      user = await this.userService.findOneByVerificationToken(token);
    } catch (error) {
      throw new InternalServerErrorException('Something wrong');
    }

    if (!user) {
      throw new BadRequestException('Invalid token');
    }

    if (user.isVerificationTokenExpired()) {
      throw new BadRequestException('Expired token');
    }

    await this.authVerificationService.verify(user.id);
  }

  @Public()
  @Post('/verify/resend')
  async verifyRefresh(@Query() { email }: UserVerifyResendDto) {
    let user: User | null;

    try {
      user = await this.userService.findOneByEmail(email);
    } catch (error) {
      throw new InternalServerErrorException('Something wrong');
    }

    if (user.isVerified()) {
      throw new ConflictException('User already verified');
    }

    await this.authVerificationService.refresh(user.id);
  }
}
