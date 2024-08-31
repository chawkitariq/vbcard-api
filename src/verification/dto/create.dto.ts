import { User } from 'src/user/entities/user.entity';

export class CreateVerificationDto {
  token: string;
  expiredAt: Date;
  user?: User;
}
