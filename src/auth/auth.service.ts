import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { AuthRegisterDto } from './dto/register.dto';
import { HashService } from 'src/hash/hash.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly hashService: HashService
  ) {}

  async register({ email, password }: AuthRegisterDto) {
    const hashedPassword = await this.hashService.hash(password);

    return this.userService.create({
      email,
      password: hashedPassword
    });
  }

  async login({ id, email }: User) {
    const payload = { email, sub: id };
    return {
      jwt: this.jwtService.sign(payload)
    };
  }
}
