import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  twoFactorAuthenticationSecret?: string;
  twoFactorAuthenticationEnabledAt?: Date;

  verificationToken?: string;
  verificationTokenExpirationAt?: Date;
  verifiedAt?: Date;
}
