import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { AuthRegisterDto } from './dto/register.dto';
import { HashService } from 'src/hash/hash.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AuthRegisterEvent } from './events/register.event';
import { AuthVerifyEvent } from './events/verify.event';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly hashService: HashService,
    private readonly eventEmitter: EventEmitter2
  ) {}

  async register({ email, password }: AuthRegisterDto) {
    const hashedPassword = await this.hashService.hash(password);

    const user = await this.userService.create({
      email,
      password: hashedPassword
    });

    this.eventEmitter.emit(AuthRegisterEvent.name, new AuthRegisterEvent(user.id));

    return user;
  }

  async verify({ id }: User) {
    const updateResult = await this.userService.update(id, {
      verifiedAt: new Date(),
      verificationToken: null,
      verificationTokenExpirationAt: null
    });

    this.eventEmitter.emit(AuthVerifyEvent.name, new AuthVerifyEvent(id));

    return updateResult;
  }

  async login({ id, email }: User) {
    const payload = { email, sub: id };
    return {
      jwt: this.jwtService.sign(payload)
    };
  }
}
