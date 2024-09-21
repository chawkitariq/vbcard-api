import { Module } from '@nestjs/common';
import { OrganizationContactService } from './organization-contact.service';
import { OrganizationContactController } from './organization-contact.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationContact } from './entities/organization-contact.entity';
import { OrganizationModule } from 'src/organization/organization.module';
import { ContactModule } from 'src/contact/contact.module';

@Module({
  imports: [TypeOrmModule.forFeature([OrganizationContact]), OrganizationModule, ContactModule],
  controllers: [OrganizationContactController],
  providers: [OrganizationContactService]
})
export class OrganizationContactModule {}
