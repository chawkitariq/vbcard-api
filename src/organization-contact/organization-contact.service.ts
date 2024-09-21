import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrganizationContact } from './entities/organization-contact.entity';
import { CreateOrganizationContactDto } from './dto/create-organization-contact.dto';

@Injectable()
export class OrganizationContactService {
  constructor(
    @InjectRepository(OrganizationContact)
    private readonly organizationContactRepository: Repository<OrganizationContact>
  ) {}

  create(createOrganizationContactDto: CreateOrganizationContactDto) {
    const organizationContact = this.organizationContactRepository.create(createOrganizationContactDto);
    return this.organizationContactRepository.save(organizationContact);
  }

  async findAll(organizationId: string) {
    const contacts = await this.organizationContactRepository.find({
      where: {
        organization: { id: organizationId }
      },
      relations: ['contact']
    });

    return contacts.map(({ contact }) => contact);
  }
}
