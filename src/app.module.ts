import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { HashModule } from './hash/hash.module';
import { FileModule } from './file/file.module';
import { S3Module } from './s3/s3.module';
import { FileManagerModule } from './file-manager/file-manager.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ConstraintModule } from './constraint/constraint.module';
import { ContactTagModule } from './contact-tag/contact-tag.module';
import { NotificationModule } from './notification/notification.module';
import { UserModule } from './user/user.module';
import { ContactModule } from './contact/contact.module';
import { ContactFollowerModule } from './contact-follower/contact-follower.module';
import { ContactContactTaggingModule } from './contact-tagging/contact-tagging.module';
import { ContactStatisticModule } from './contact-statistic/contact-statistic.module';
import { SettingModule } from './setting/setting.module';
import { StoryModule } from './story/story.module';
import { BillingModule } from './billing/billing.module';
import { ActivityModule } from './activity/activity.module';
import { UserVerificationModule } from './user-verification/user-verification.module';
import { ContactStatisticTrackingModule } from './contact-statistic-tracking/contact-statistic-tracking.module';
import { OrganizationModule } from './organization/organization.module';
import { OrganizationMemberModule } from './organization-member/organization-member.module';
import { OrganizationCollaboratorModule } from './organization-collaborator/organization-collaborator.module';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ConstraintModule,
    DatabaseModule,
    UserModule,
    AuthModule,
    HashModule,
    ContactModule,
    FileModule,
    S3Module,
    FileManagerModule,
    ContactFollowerModule,
    ContactTagModule,
    ContactContactTaggingModule,
    NotificationModule,
    ContactStatisticModule,
    UserVerificationModule,
    SettingModule,
    StoryModule,
    BillingModule,
    ActivityModule,
    ContactStatisticTrackingModule,
    OrganizationModule,
    OrganizationMemberModule,
    OrganizationCollaboratorModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor
    }
  ]
})
export class AppModule {}
