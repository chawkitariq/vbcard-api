import { Module } from '@nestjs/common';
import { OrganizationInvitationService } from './organization-invitation.service';
import { OrganizationInvitationController } from './organization-invitation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationInvitation } from './entities/organization-invitation.entity';
import { OrganizationModule } from 'src/organization/organization.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrganizationInvitation]),
    OrganizationModule
  ],
  controllers: [OrganizationInvitationController],
  providers: [OrganizationInvitationService]
})
export class OrganizationInvitationModule {}
