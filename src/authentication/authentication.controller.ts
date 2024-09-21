import {
  Body,
  ConflictException,
  Controller,
  InternalServerErrorException,
  Post,
  Request,
  UseGuards
} from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { AuthenticationLocalGuard } from './guards/local.guard';
import { AuthenticationService } from './authentication.service';
import { Public } from '../decorators/public.decorator';
import { AuthenticationRegisterDto } from './dto/authentication-register.dto';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly userService: UserService
  ) {}

  @Public()
  @Post('register')
  async register(@Body() { email, password }: AuthenticationRegisterDto) {
    let user: User | undefined;

    try {
      user = await this.userService.findOneByEmail(email);
    } catch (error) {
      throw new InternalServerErrorException('Something wrong');
    }

    if (user) {
      throw new ConflictException('User already exists');
    }

    try {
      await this.authenticationService.register({ email, password });
    } catch (error) {
      throw new InternalServerErrorException('Something wrong');
    }
  }

  @Public()
  @Post('login')
  @UseGuards(AuthenticationLocalGuard)
  async login(@Request() { user }: { user: User }) {
    try {
      return this.authenticationService.login(user);
    } catch (error) {
      throw new InternalServerErrorException('Something wrong');
    }
  }
}
