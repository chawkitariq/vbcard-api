import { Injectable } from '@nestjs/common';
import { CreateOrganizationCollaboratorDto } from './dto/create-organization-collaborator.dto';
import { IsNull, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { OrganizationCollaborator } from './entities/organization-collaborator.entity';
import { UpdateOrganizationCollaboratorDto } from './dto/update-organization-collaborator.dto';

@Injectable()
export class OrganizationCollaboratorService {
  constructor(
    @InjectRepository(OrganizationCollaborator)
    private readonly organizationCollaboratorRepository: Repository<OrganizationCollaborator>
  ) {}

  create(createOrganizationCollaboratorDto: CreateOrganizationCollaboratorDto) {
    const organizationCollaborator =
      this.organizationCollaboratorRepository.create(
        createOrganizationCollaboratorDto
      );
    return this.organizationCollaboratorRepository.save(
      organizationCollaborator
    );
  }

  findBy(
    where: Parameters<
      typeof this.organizationCollaboratorRepository.findBy
    >['0']
  ) {
    return this.organizationCollaboratorRepository.findBy(where);
  }

  findOneBy(
    where: Parameters<
      typeof this.organizationCollaboratorRepository.findOneBy
    >['0']
  ) {
    return this.organizationCollaboratorRepository.findOneBy(where);
  }

  update(
    id: string,
    updateOrganizationCollaboratorDto: UpdateOrganizationCollaboratorDto
  ) {
    return this.organizationCollaboratorRepository.update(
      id,
      updateOrganizationCollaboratorDto
    );
  }

  remove(
    criteria: Parameters<
      typeof this.organizationCollaboratorRepository.softDelete
    >['0']
  ) {
    const mergedCriteria = Object.assign({}, criteria, { deletedAt: IsNull() });
    return this.organizationCollaboratorRepository.softDelete(mergedCriteria);
  }
}
