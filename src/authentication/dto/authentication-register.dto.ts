import { IsDefined, IsEmail, IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class AuthenticationRegisterDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  password: string;
}
