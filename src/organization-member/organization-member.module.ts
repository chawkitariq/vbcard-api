import { Module } from '@nestjs/common';
import { OrganizationMemberService } from './organization-member.service';
import { OrganizationMemberController } from './organization-member.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationMember } from './entities/organization-member.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrganizationMember])],
  controllers: [OrganizationMemberController],
  providers: [OrganizationMemberService]
})
export class OrganizationMemberModule {}
