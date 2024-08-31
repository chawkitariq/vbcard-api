import { IsDefined, IsEmail, IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class AuthRegisterDto {
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
