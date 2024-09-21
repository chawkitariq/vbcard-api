import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { GetUser } from 'src/decorators/get-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { TwoFactorAuthenticationService } from './two-factor-authentication.service';
import { TwoFactorAuthenticationVerifyDto } from './dto/two-factor-authentication-verify.dto';

@Controller('2fa')
export class TwoFactorAuthenticationController {
  constructor(
    private readonly twoFactorAuthenticationService: TwoFactorAuthenticationService,
    private readonly userService: UserService
  ) {}

  @Post('enable')
  async enable(@GetUser() user: User) {
    const twoFactorAuthenticationSecret = this.twoFactorAuthenticationService.generateRandomBase32(20);

    await this.userService.update(user.id, {
      twoFactorAuthenticationSecret,
      twoFactorAuthenticationEnabledAt: new Date()
    });

    const otpauthUri = this.twoFactorAuthenticationService.generateTotpAuthUri(
      user.email,
      twoFactorAuthenticationSecret
    );

    return {
      otpauthUri
    };
  }

  @Post('verify')
  async verify(@GetUser() user: User, @Body() { token }: TwoFactorAuthenticationVerifyDto) {
    if (!user.twoFactorAuthenticationEnabledAt) {
      throw new BadRequestException('2FA not enabled');
    }

    const isValidTotpToken = this.twoFactorAuthenticationService.verifyTotp(token, user.twoFactorAuthenticationSecret);

    if (!isValidTotpToken) {
      throw new BadRequestException('Invalid 2FA token');
    }

    await this.userService.update(user.id, {
      twoFactorAuthenticationVerifiedAt: new Date()
    });
  }
}
