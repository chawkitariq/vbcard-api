import { BadRequestException, Controller, Get, InternalServerErrorException, Query } from '@nestjs/common';
import { VerificationService } from './verification.service';
import { Verification } from './entities/verification.entity';

@Controller('verifications')
export class VerificationController {
  constructor(private readonly verificationService: VerificationService) {}

  @Get('verify')
  async verifyUser(@Query('token') token: string) {
    let verification: Verification | undefined;

    try {
      verification = await this.verificationService.findOneByToken(token);
    } catch (error) {
      throw new InternalServerErrorException('Something wrong');
    }

    if (!verification) {
      throw new BadRequestException('Invalid token');
    }

    if (verification.isExpired()) {
      throw new BadRequestException('Token expired');
    }

    try {
      await this.verificationService.update(verification.id, {
        token: '',
        expiredAt: null,
        verifiedAt: new Date()
      });
    } catch (error) {
      throw new InternalServerErrorException('Something wrong');
    }
  }
}
