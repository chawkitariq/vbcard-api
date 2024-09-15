import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  InternalServerErrorException,
  Post,
  Query,
  Request,
  UseGuards
} from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { AuthLocalGuard } from './guards/local.guard';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { AuthRegisterDto } from './dto/register.dto';
import { UserService } from 'src/user/user.service';
import { AuthVerifiedGuard } from './guards/verified.guard';
import { AuthVerifyDto } from './dto/verify.dto';
import { AuthVerifyResendDto } from './dto/verify-resend.dto';

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

  @Post('register/verify')
  @Public()
  async verify(@Body() { token }: AuthVerifyDto) {
    let user: User | null;

    try {
      user = await this.userService.findOneByVerificationToken(token);
    } catch (error) {
      throw new InternalServerErrorException('Something wrong');
    }

    if (!user) {
      throw new BadRequestException('Invalid token');
    }

    if (user.isVerificationTokenExpired()) {
      throw new BadRequestException('Expired token');
    }

    await this.authService.verify(user);
  }

  @Post('register/verify/resend')
  @Public()
  async verifyRefresh(@Query() { email }: AuthVerifyResendDto) {
    let user: User | null;

    try {
      user = await this.userService.findOneByEmail(email);
    } catch (error) {
      throw new InternalServerErrorException('Something wrong');
    }

    if (user.isVerified()) {
      throw new ConflictException('User already verified');
    }

    const verificationToken = this.generateOptToken();
    const verificationTokenExpirationAt = this.generateExpirationDate();

    await this.userService.update(user.id, {
      verificationToken,
      verificationTokenExpirationAt
    });
  }

  @Post('login')
  @Public()
  @UseGuards(AuthLocalGuard, AuthVerifiedGuard)
  async login(@Request() { user }: { user: User }) {
    try {
      return this.authService.login(user);
    } catch (error) {
      throw new InternalServerErrorException('Something wrong');
    }
  }

  generateOptToken(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  generateExpirationDate(): Date {
    const expiration = new Date();
    expiration.setMinutes(expiration.getMinutes() + 1);
    return expiration;
  }
}
