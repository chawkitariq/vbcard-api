import { Exclude } from 'class-transformer';
import { Verification } from 'src/verification/entities/verification.entity';

export class CreateUserDto {
  @Exclude()
  email: string;

  @Exclude()
  password: string;

  @Exclude()
  verification?: Verification;
}
