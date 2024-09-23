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
    const organizationContact = this.organizationContactRepository.create(
      createOrganizationContactDto
    );
    return this.organizationContactRepository.save(organizationContact);
  }

  findOne(
    where: Parameters<typeof this.organizationContactRepository.findOneBy>['0']
  ) {
    return this.organizationContactRepository.findOne({
      where,
      relations: ['contact']
    });
  }

  async findAll(
    where: Parameters<typeof this.organizationContactRepository.findBy>['0']
  ) {
    return this.organizationContactRepository.find({
      where,
      relations: ['contact']
    });
  }
}
