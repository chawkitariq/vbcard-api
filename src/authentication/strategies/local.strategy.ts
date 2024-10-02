import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { HashService } from 'src/hash/hash.service';

@Injectable()
export class AuthenticationLocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
    private readonly hashService: HashService
  ) {
    super({ usernameField: 'email', passwordField: 'password' });
  }

  async validate(email: string, plainPassword: string): Promise<any> {
    const user = await this.userService.findOne({ email });

    if (!user) {
      throw new UnauthorizedException();
    }

    const isValidPassword = await this.hashService.compare(
      plainPassword,
      user.password
    );

    if (!isValidPassword) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
