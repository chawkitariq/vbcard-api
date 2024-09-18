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
    const organizationMember = this.organizationMemberRepository.create(CreateOrganizationMemberDto);
    return this.organizationMemberRepository.save(organizationMember);
  }

  findAll() {
    return this.organizationMemberRepository.find();
  }

  findOne(id: string) {
    return this.organizationMemberRepository.findOne({
      where: { id }
    });
  }

  update(id: string, updateOrganizationMemberDto: UpdateOrganizationMemberDto) {
    return this.organizationMemberRepository.update(id, updateOrganizationMemberDto);
  }

  remove(id: string) {
    return this.organizationMemberRepository.softDelete({
      id,
      deletedAt: IsNull()
    });
  }
}
