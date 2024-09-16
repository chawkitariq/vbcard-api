import { IsDefined, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IsExist } from 'src/constraint/is-exist.constraint';
import { User } from 'src/user/entities/user.entity';

export class UserVerifyResendDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @IsExist(User, (email: string) => ({ where: { email } }))
  email: string;
}
