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
    const organizationCollaborator = this.organizationCollaboratorRepository.create(createOrganizationCollaboratorDto);
    return this.organizationCollaboratorRepository.save(organizationCollaborator);
  }

  findAll() {
    return this.organizationCollaboratorRepository.find();
  }

  findOne(id: string) {
    return this.organizationCollaboratorRepository.findOne({
      where: { id }
    });
  }

  update(id: string, updateOrganizationCollaboratorDto: UpdateOrganizationCollaboratorDto) {
    return this.organizationCollaboratorRepository.update(id, updateOrganizationCollaboratorDto);
  }

  remove(id: string) {
    return this.organizationCollaboratorRepository.softDelete({
      id,
      deletedAt: IsNull()
    });
  }
}
