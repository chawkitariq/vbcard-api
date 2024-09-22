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

  findBy(
    where: Parameters<typeof this.organizationMemberRepository.findBy>['0']
  ) {
    return this.organizationMemberRepository.findBy(where);
  }

  findOne(id: string) {
    return this.organizationMemberRepository.findOneBy({ id });
  }

  findOneBy(
    where: Parameters<typeof this.organizationMemberRepository.findOneBy>['0']
  ) {
    return this.organizationMemberRepository.findOneBy(where);
  }

  update(id: string, updateOrganizationMemberDto: UpdateOrganizationMemberDto) {
    return this.organizationMemberRepository.update(
      id,
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
