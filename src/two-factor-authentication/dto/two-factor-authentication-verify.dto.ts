import { IsDefined, IsNotEmpty, IsNumberString, MaxLength, MinLength } from 'class-validator';
export class TwoFactorAuthenticationVerifyDto {
  @IsDefined()
  @IsNotEmpty()
  @IsNumberString()
  @MinLength(6)
  @MaxLength(6)
  token: string;
}
