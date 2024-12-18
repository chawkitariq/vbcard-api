import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { AuthenticationRegisterDto } from './dto/authentication-register.dto';
import { HashService } from 'src/hash/hash.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AuthenticationRegisterEvent } from './events/authentication-register.event';
import ms from 'ms';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly hashService: HashService,
    private readonly eventEmitter: EventEmitter2
  ) {}

  async register({ email, password }: AuthenticationRegisterDto) {
    const hashedPassword = await this.hashService.hash(password);

    const user = await this.userService.create({
      email,
      password: hashedPassword
    });

    this.eventEmitter.emit(
      AuthenticationRegisterEvent.name,
      new AuthenticationRegisterEvent(user.id)
    );

    return user;
  }

  async login({ id, email }: User) {
    const payload = { email, sub: id };
    const expiresIn = ms(process.env.JWT_EXPIRES_IN || '1h') / 1000;

    return {
      token_type: 'Bearer',
      expires_in: expiresIn,
      access_token: this.jwtService.sign(payload, {
        expiresIn
      })
    };
  }
}
