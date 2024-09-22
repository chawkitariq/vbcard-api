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

  findBy(where: Parameters<typeof this.organizationRepository.findBy>['0']) {
    return this.organizationRepository.findBy(where);
  }

  findOne(id: string) {
    return this.organizationRepository.findOneBy({ id });
  }

  findOneBy(where: Parameters<typeof this.organizationRepository.findOneBy>['0']) {
    return this.organizationRepository.findOneBy(where);
  }

  isExistBy(where: Parameters<typeof this.organizationRepository.existsBy>['0']) {
    return this.organizationRepository.existsBy(where);
  }

  update(
    criteria: Parameters<typeof this.organizationRepository.update>['0'],
    updateOrganizationDto: UpdateOrganizationDto
  ) {
    return this.organizationRepository.update(criteria, updateOrganizationDto);
  }

  remove(criteria: Parameters<typeof this.organizationRepository.softDelete>['0']) {
    const mergedCriteria = Object.assign({}, criteria, { deletedAt: IsNull() });
    return this.organizationRepository.softDelete(mergedCriteria);
  }
}
