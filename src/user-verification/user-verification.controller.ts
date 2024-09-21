import { BadRequestException, Body, ConflictException, Controller, Post, Query } from '@nestjs/common';
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
  async verify(@Body() { token }: UserVerifyDto) {
    const user = await this.userService.findOneByVerificationToken(token);

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
    const user = await this.userService.findOneByEmail(email);

    if (user.isVerified()) {
      throw new ConflictException('User already verified');
    }

    await this.authVerificationService.refresh(user.id);
  }
}
