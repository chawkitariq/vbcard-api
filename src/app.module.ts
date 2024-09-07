import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthJwtGuard } from './auth/guards/jwt.guard';
import { HashModule } from './hash/hash.module';
import { ContactModule } from './contact/contact.module';
import { FileModule } from './file/file.module';
import { S3Module } from './s3/s3.module';
import { FileManagerModule } from './file-manager/file-manager.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ConstraintModule } from './constraint/constraint.module';
import { FollowingModule } from './following/following.module';
import { TagModule } from './tag/tag.module';

@Module({
  imports: [
    EventEmitterModule.forRoot({ global: true }),
    {
      global: true,
      module: ConstraintModule
    },
    DatabaseModule,
    UserModule,
    AuthModule,
    HashModule,
    ContactModule,
    FileModule,
    S3Module,
    FileManagerModule,
    FollowingModule,
    TagModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthJwtGuard
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor
    }
  ]
})
export class AppModule {}
