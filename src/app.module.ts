import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { HashModule } from './hash/hash.module';
import { FileModule } from './file/file.module';
import { AwsS3Module } from './aws-s3/aws-s3.module';
import { FileManagerModule } from './file-manager/file-manager.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ConstraintModule } from './constraint/constraint.module';
import { ContactTagModule } from './contact-tag/contact-tag.module';
import { NotificationModule } from './notification/notification.module';
import { UserModule } from './user/user.module';
import { ContactModule } from './contact/contact.module';
import { ContactFollowerModule } from './contact-follower/contact-follower.module';
import { ContactTaggingModule } from './contact-tagging/contact-tagging.module';
import { ContactStatisticModule } from './contact-statistic/contact-statistic.module';
import { StoryModule } from './story/story.module';
import { UserVerificationModule } from './user-verification/user-verification.module';
import { ContactStatisticTrackingModule } from './contact-statistic-tracking/contact-statistic-tracking.module';
import { OrganizationModule } from './organization/organization.module';
import { OrganizationMemberModule } from './organization-member/organization-member.module';
import { OrganizationCollaboratorModule } from './organization-collaborator/organization-collaborator.module';
import { TwoFactorAuthenticationModule } from './two-factor-authentication/two-factor-authentication.module';
import { OrganizationInvitationModule } from './organization-invitation/organization-invitation.module';
import { OrganizationContactModule } from './organization-contact/organization-contact.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { TotpModule } from './totp/totp.module';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ConstraintModule,
    DatabaseModule,
    UserModule,
    AuthenticationModule,
    UserVerificationModule,
    TwoFactorAuthenticationModule,
    HashModule,
    ContactModule,
    FileModule,
    AwsS3Module,
    FileManagerModule,
    ContactFollowerModule,
    ContactTagModule,
    ContactTaggingModule,
    NotificationModule,
    ContactStatisticModule,
    StoryModule,
    ContactStatisticTrackingModule,
    OrganizationModule,
    OrganizationMemberModule,
    OrganizationCollaboratorModule,
    OrganizationInvitationModule,
    OrganizationContactModule,
    SubscriptionModule,
    TotpModule
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
