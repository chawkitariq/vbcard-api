import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Post,
  Query
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { Public } from 'src/decorators/public.decorator';
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
  async verify(@Body() { token: verificationToken }: UserVerifyDto) {
    const user = await this.userService.findOne({ verificationToken });

    if (!user) {
      throw new BadRequestException('Token not found');
    }

    if (user.isVerificationTokenExpired()) {
      throw new BadRequestException('Expired token');
    }

    await this.authVerificationService.verify(user.id);
  }

  @Public()
  @Post('/verify/send')
  async verifyRefresh(@Query() { email }: UserVerifyResendDto) {
    const user = await this.userService.findOne({ email });

    if (user.isVerified()) {
      throw new ConflictException('Already verified');
    }

    await this.authVerificationService.refresh(user.id);
  }
}
