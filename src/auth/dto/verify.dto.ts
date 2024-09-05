import { IsDefined, IsNotEmpty, IsNumberString, MaxLength, MinLength } from 'class-validator';

export class AuthVerifyDto {
  @IsDefined()
  @IsNumberString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(6)
  token: string;
}
