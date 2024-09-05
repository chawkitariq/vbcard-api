import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { AuthLocalStrategy } from './strategies/local.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthJwtStrategy } from './strategies/jwt.strategy';
import { HashModule } from 'src/hash/hash.module';
import { AuthRegisterListener } from './listeners/register.listener';

@Module({
  imports: [
    HashModule,
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRES_IN || '1h'
      }
    })
  ],
  providers: [AuthService, AuthLocalStrategy, AuthJwtStrategy, AuthRegisterListener],
  controllers: [AuthController]
})
export class AuthModule {}
