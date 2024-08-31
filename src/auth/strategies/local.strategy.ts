import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { HashService } from 'src/hash/hash.service';

@Injectable()
export class AuthLocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
    private readonly hashService: HashService
  ) {
    super({ usernameField: 'email', passwordField: 'password' });
  }

  async validate(email: string, plainPassword: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      return null;
    }

    const isValidPassword = await this.hashService.compare(plainPassword, user.password);

    if (!isValidPassword) {
      return null;
    }

    return user;
  }
}
