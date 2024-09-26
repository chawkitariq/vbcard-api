import { Injectable } from '@nestjs/common';
import { CreateOrganizationInvitationDto } from './dto/create-organization-invitation.dto';
import { UpdateOrganizationInvitationDto } from './dto/update-organization-invitation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrganizationInvitation } from './entities/organization-invitation.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { OrganizationInvitationCreatedEvent } from './events/organization-invitation-created.event';

@Injectable()
export class OrganizationInvitationService {
  constructor(
    @InjectRepository(OrganizationInvitation)
    private readonly organizationInvitationRepository: Repository<OrganizationInvitation>,
    private readonly eventEmitter: EventEmitter2
  ) {}

  async create(
    createOrganizationInvitationDto: CreateOrganizationInvitationDto
  ) {
    const organizationInvitation = this.organizationInvitationRepository.create(
      createOrganizationInvitationDto
    );

    const newOrganizationInvitation =
      await this.organizationInvitationRepository.save(organizationInvitation);

    this.eventEmitter.emit(
      OrganizationInvitationCreatedEvent.name,
      new OrganizationInvitationCreatedEvent(organizationInvitation.id)
    );

    return newOrganizationInvitation;
  }

  findAll(
    where: Parameters<typeof this.organizationInvitationRepository.findBy>['0']
  ) {
    return this.organizationInvitationRepository.findBy(where);
  }

  findOne(
    where: Parameters<
      typeof this.organizationInvitationRepository.findOneBy
    >['0']
  ) {
    return this.organizationInvitationRepository.findOneBy(where);
  }

  update(
    criteria: Parameters<
      typeof this.organizationInvitationRepository.update
    >['0'],
    updateOrganizationInvitationDto: UpdateOrganizationInvitationDto
  ) {
    return this.organizationInvitationRepository.update(
      criteria,
      updateOrganizationInvitationDto
    );
  }

  remove(
    criteria: Parameters<
      typeof this.organizationInvitationRepository.delete
    >['0']
  ) {
    return this.organizationInvitationRepository.delete(criteria);
  }
}
