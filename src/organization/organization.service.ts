import { Injectable } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Organization } from './entities/organization.entity';
import { IsNull, Repository } from 'typeorm';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private readonly organizationRepository: Repository<Organization>
  ) {}

  create(createOrganizationDto: CreateOrganizationDto) {
    const organization = this.organizationRepository.create(createOrganizationDto);
    return this.organizationRepository.save(organization);
  }

  findAll() {
    return this.organizationRepository.find();
  }

  findOne(id: string) {
    return this.organizationRepository.findOne({
      where: { id }
    });
  }

  update(id: string, updateOrganizationDto: UpdateOrganizationDto) {
    return this.organizationRepository.update(id, updateOrganizationDto);
  }

  remove(id: string) {
    return this.organizationRepository.softDelete({
      id,
      deletedAt: IsNull()
    });
  }
}
