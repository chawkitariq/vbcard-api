import {
  Controller,
  Get,
  Body,
  Param,
  Delete,
  BadRequestException
} from '@nestjs/common';
import { OrganizationMemberService } from './organization-member.service';
import { CreateOrganizationMemberDto } from './dto/create-organization-member.dto';
import { UpdateOrganizationMemberDto } from './dto/update-organization-member.dto';
import { GetUser } from 'src/decorators/get-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { Id } from 'src/decorators/id.decorator';

@Controller()
export class OrganizationMemberController {
  constructor(
    private readonly organizationMemberService: OrganizationMemberService
  ) {}

  // DO NOT UNCOMMENT
  // @Post('organizations/:id/members')
  create(@Body() createOrganizationMemberDto: CreateOrganizationMemberDto) {
    return this.organizationMemberService.create(createOrganizationMemberDto);
  }

  @Get('organizations/:id/members')
  findAll(@GetUser('id') userId: string, @Id() id: string) {
    return this.organizationMemberService.findBy({
      organization: { id, owner: { id: userId } }
    });
  }

  @Get('organizations/:id/members/:memberId')
  findOne(
    @GetUser('id') userId: string,
    @Id('organizationId') organizationId: string,
    @Param('memberId') memberId: string
  ) {
    return this.organizationMemberService.findOneBy({
      id: memberId,
      organization: { id: organizationId, owner: { id: userId } }
    });
  }

  // DO NOT UNCOMMENT
  // @Patch('organizations/:id/members/:id')
  update(
    @Id() id: string,
    @Body() updateOrganizationMemberDto: UpdateOrganizationMemberDto
  ) {
    return this.organizationMemberService.update(
      id,
      updateOrganizationMemberDto
    );
  }

  @Delete('organizations/:id/members/:memberId')
  async remove(
    @GetUser('id') userId: string,
    @Id('organizationId') organizationId: string,
    @Param('memberId') memberId: string
  ) {
    const { affected } = await this.organizationMemberService.remove({
      id: memberId,
      organization: { id: organizationId, owner: { id: userId } }
    });

    if (!affected) {
      throw new BadRequestException('Member not found');
    }
  }

  @Delete('organizations/:id/members/me')
  async leaveUserOrganization(
    @GetUser('id') userId: string,
    @Id('collaboratorId') collaboratorId: string
  ) {
    const { affected } = await this.organizationMemberService.remove({
      id: collaboratorId,
      member: { id: userId }
    });

    if (!affected) {
      throw new BadRequestException('Organization not found');
    }
  }
}
