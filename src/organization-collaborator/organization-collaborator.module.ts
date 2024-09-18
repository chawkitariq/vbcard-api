import { Module } from '@nestjs/common';
import { OrganizationCollaboratorService } from './organization-collaborator.service';
import { OrganizationCollaboratorController } from './organization-collaborator.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationCollaborator } from './entities/organization-collaborator.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrganizationCollaborator])],
  controllers: [OrganizationCollaboratorController],
  providers: [OrganizationCollaboratorService]
})
export class OrganizationCollaboratorModule {}
