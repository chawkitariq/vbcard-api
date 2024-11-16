import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { AuthenticationLocalStrategy } from './strategies/local.strategy';
import { AuthenticationController } from './authentication.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthenticationJwtStrategy } from './strategies/jwt.strategy';
import { HashModule } from 'src/hash/hash.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AuthenticationJwtGuard } from './guards/jwt.guard';
import { UnauthorizedExceptionFilter } from './filters/unauthorized-exception.filter';

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
  providers: [
    AuthenticationService,
    AuthenticationLocalStrategy,
    AuthenticationJwtStrategy,
    AuthenticationJwtGuard,
    UnauthorizedExceptionFilter,
    {
      provide: APP_GUARD,
      useExisting: AuthenticationJwtGuard
    },
    {
      provide: APP_FILTER,
      useExisting: UnauthorizedExceptionFilter
    }
  ],
  controllers: [AuthenticationController]
})
export class AuthenticationModule {}
