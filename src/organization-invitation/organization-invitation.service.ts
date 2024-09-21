import { Injectable } from '@nestjs/common';
import { CreateOrganizationInvitationDto } from './dto/create-organization-invitation.dto';
import { UpdateOrganizationInvitationDto } from './dto/update-organization-invitation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { OrganizationInvitation } from './entities/organization-invitation.entity';

@Injectable()
export class OrganizationInvitationService {
  constructor(
    @InjectRepository(OrganizationInvitation)
    private readonly organizationInvitationRepository: Repository<OrganizationInvitation>
  ) {}

  create(createOrganizationInvitationDto: CreateOrganizationInvitationDto) {
    const organizationInvitation = this.organizationInvitationRepository.create(createOrganizationInvitationDto);
    return this.organizationInvitationRepository.save(organizationInvitation);
  }

  findAll() {
    return this.organizationInvitationRepository.find();
  }

  findOne(id: string) {
    return this.organizationInvitationRepository.findOne({
      where: { id }
    });
  }

  update(id: string, updateOrganizationInvitationDto: UpdateOrganizationInvitationDto) {
    return this.organizationInvitationRepository.update(id, updateOrganizationInvitationDto);
  }

  remove(id: string) {
    return this.organizationInvitationRepository.delete({
      id
    });
  }
}
