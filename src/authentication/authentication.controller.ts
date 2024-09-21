import { Body, ConflictException, Controller, Post, UseGuards } from '@nestjs/common';
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
    let user: User | undefined;

    user = await this.userService.findOneByEmail(email);

    if (user) {
      throw new ConflictException('User already exists');
    }

    await this.authenticationService.register({ email, password });
  }

  @Public()
  @Post('login')
  @UseGuards(AuthenticationLocalGuard)
  async login(@GetUser() user: User) {
    return this.authenticationService.login(user);
  }
}
