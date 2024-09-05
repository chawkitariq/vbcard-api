import { Exclude } from 'class-transformer';

export class CreateUserDto {
  @Exclude()
  email: string;

  @Exclude()
  password: string;
}
