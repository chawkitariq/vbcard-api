import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { OrganizationMember } from './entities/organization-member.entity';
import { CreateOrganizationMemberDto } from './dto/create-organization-member.dto';
import { UpdateOrganizationMemberDto } from './dto/update-organization-member.dto';

@Injectable()
export class OrganizationMemberService {
  constructor(
    @InjectRepository(OrganizationMember)
    private readonly organizationMemberRepository: Repository<OrganizationMember>
  ) {}

  create(CreateOrganizationMemberDto: CreateOrganizationMemberDto) {
    const organizationMember = this.organizationMemberRepository.create(
      CreateOrganizationMemberDto
    );
    return this.organizationMemberRepository.save(organizationMember);
  }

  findAll(
    where?: Parameters<typeof this.organizationMemberRepository.findBy>['0']
  ) {
    return this.organizationMemberRepository.findBy(where);
  }

  findOne(
    where: Parameters<typeof this.organizationMemberRepository.findOneBy>['0']
  ) {
    return this.organizationMemberRepository.findOneBy(where);
  }

  update(
    criteria: Parameters<typeof this.organizationMemberRepository.update>['0'],
    updateOrganizationMemberDto: UpdateOrganizationMemberDto
  ) {
    return this.organizationMemberRepository.update(
      criteria,
      updateOrganizationMemberDto
    );
  }

  remove(
    criteria: Parameters<
      typeof this.organizationMemberRepository.softDelete
    >['0']
  ) {
    const mergedCriteria = Object.assign({}, criteria, { deletedAt: IsNull() });
    return this.organizationMemberRepository.softDelete(mergedCriteria);
  }
}
