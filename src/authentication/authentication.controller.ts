import {
  Body,
  ConflictException,
  Controller,
  Header,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards
} from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { AuthenticationLocalGuard } from './guards/local.guard';
import { AuthenticationService } from './authentication.service';
import { Public } from '../decorators/public.decorator';
import { AuthenticationRegisterDto } from './dto/authentication-register.dto';
import { UserService } from 'src/user/user.service';
import { GetUser } from 'src/decorators/get-user.decorator';

@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly userService: UserService
  ) {}

  @Public()
  @Post('register')
  async register(@Body() { email, password }: AuthenticationRegisterDto) {
    const isExists = await this.userService.existsBy({ email });

    if (isExists) {
      throw new ConflictException('User already exists');
    }

    await this.authenticationService.register({ email, password });
  }

  @Public()
  @Post('login')
  @Header('Cache-Control', 'no-store')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthenticationLocalGuard)
  async login(@GetUser() user: User) {
    return this.authenticationService.login(user);
  }
}
