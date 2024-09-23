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
import { IdDto } from 'src/dto/id.dto';
import { GetUser } from 'src/decorators/get-user.decorator';
import { User } from 'src/user/entities/user.entity';

@Controller('organizations/:id/members')
export class OrganizationMemberController {
  constructor(
    private readonly organizationMemberService: OrganizationMemberService
  ) {}

  // @Post()
  create(@Body() createOrganizationMemberDto: CreateOrganizationMemberDto) {
    return this.organizationMemberService.create(createOrganizationMemberDto);
  }

  @Get()
  findAll(@GetUser() user: User, @Param() { id }: IdDto) {
    return this.organizationMemberService.findBy({
      organization: { id, owner: { id: user.id } }
    });
  }

  @Get(':memberId')
  findOne(
    @GetUser() user: User,
    @Param() { id: organizationId }: IdDto,
    @Param('memberId') memberId: string
  ) {
    return this.organizationMemberService.findOneBy({
      id: memberId,
      organization: { id: organizationId, owner: { id: user.id } }
    });
  }

  // @Patch(':id')
  update(
    @Param() { id }: IdDto,
    @Body() updateOrganizationMemberDto: UpdateOrganizationMemberDto
  ) {
    return this.organizationMemberService.update(
      id,
      updateOrganizationMemberDto
    );
  }

  @Delete(':memberId')
  async remove(
    @GetUser() user: User,
    @Param() { id: organizationId }: IdDto,
    @Param('memberId') memberId: string
  ) {
    const { affected } = await this.organizationMemberService.remove({
      id: memberId,
      organization: { id: organizationId, owner: { id: user.id } }
    });

    if (!affected) {
      throw new BadRequestException('Member not found');
    }
  }
}
