import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Post
} from '@nestjs/common';
import { GetUser } from 'src/decorators/get-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { TwoFactorAuthenticationVerifyDto } from './dto/two-factor-authentication-verify.dto';
import { TotpService } from 'src/totp/totp.service';
import { SkipTwoFactorAuthentication } from 'src/decorators/skip-two-factor-authentication';
import { JwtService } from '@nestjs/jwt';

@Controller('2fa')
export class TwoFactorAuthenticationController {
  constructor(
    private readonly totpService: TotpService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  @Post('enable')
  @SkipTwoFactorAuthentication()
  async enable(@GetUser() user: User) {
    if (user.twoFactorAuthenticationEnabledAt) {
      throw new ConflictException('2FA already enabled');
    }

    const twoFactorAuthenticationSecret =
      this.totpService.generateRandomBase32(20);

    await this.userService.update(user.id, {
      twoFactorAuthenticationSecret,
      twoFactorAuthenticationEnabledAt: new Date()
    });

    const otpAuthUri = this.totpService.generateOtpAuthUrl(
      process.env.APP_NAME,
      user.email,
      twoFactorAuthenticationSecret
    );

    return {
      otpAuthUri
    };
  }

  @Post('verify')
  @SkipTwoFactorAuthentication()
  async verify(
    @GetUser() user: User,
    @Body() { token }: TwoFactorAuthenticationVerifyDto
  ) {
    if (!user.twoFactorAuthenticationEnabledAt) {
      throw new BadRequestException('2FA not enabled');
    }

    const isValidTotpToken = this.totpService.verify(
      token,
      user.twoFactorAuthenticationSecret
    );

    if (!isValidTotpToken) {
      throw new BadRequestException('Invalid 2FA token');
    }

    return {
      access_token: this.jwtService.sign({
        sud: user.id,
        email: user.email,
        tfaVerified: true
      })
    };
  }

  @Post('disable')
  async disable(@GetUser() user: User) {
    if (!user.twoFactorAuthenticationEnabledAt) {
      throw new BadRequestException('2FA not enabled');
    }

    await this.userService.update(user.id, {
      twoFactorAuthenticationSecret: '',
      twoFactorAuthenticationEnabledAt: null
    });
  }
}
