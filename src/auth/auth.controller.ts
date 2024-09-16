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
import { AuthLocalGuard } from './guards/local.guard';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { AuthRegisterDto } from './dto/register.dto';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  @Public()
  @Post('register')
  async register(@Body() { email, password }: AuthRegisterDto) {
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
      await this.authService.register({ email, password });
    } catch (error) {
      throw new InternalServerErrorException('Something wrong');
    }
  }

  @Public()
  @Post('login')
  @UseGuards(AuthLocalGuard)
  async login(@Request() { user }: { user: User }) {
    try {
      return this.authService.login(user);
    } catch (error) {
      throw new InternalServerErrorException('Something wrong');
    }
  }
}
