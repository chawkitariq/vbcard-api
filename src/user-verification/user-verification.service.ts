import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class UserVerificationService {
  constructor(private readonly userService: UserService) {}

  refresh(userId: string) {
    const verificationToken = this.generateOptToken();
    const verificationTokenExpirationAt = this.generateExpirationDate();

    return this.userService.update(userId, {
      verificationToken,
      verificationTokenExpirationAt
    });
  }

  private generateOptToken(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  private generateExpirationDate(): Date {
    const expiration = new Date();
    expiration.setMinutes(expiration.getMinutes() + 1);
    return expiration;
  }
}
