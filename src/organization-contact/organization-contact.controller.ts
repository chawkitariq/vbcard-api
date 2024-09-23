import { Controller, Get, Post, Param, NotFoundException, Body, BadRequestException } from '@nestjs/common';
import { OrganizationContactService } from './organization-contact.service';
import { OrganizationService } from 'src/organization/organization.service';
import { CreateContactDto } from 'src/contact/dto/create-contact.dto';
import { ContactController } from 'src/contact/contact.controller';
import { User } from 'src/user/entities/user.entity';
import { GetUser } from 'src/decorators/get-user.decorator';
import { Id } from 'src/decorators/id.decorator';

@Controller('organizations/:id/contacts')
export class OrganizationContactController {
  constructor(
    private readonly organizationContactService: OrganizationContactService,
    private readonly organizationService: OrganizationService,
    private readonly contactController: ContactController
  ) {}

  @Post()
  async create(@GetUser() user: User, @Id() id: string, @Body() createContactDto: CreateContactDto) {
    const organization = await this.organizationService.findOne(id);

    if (!organization) {
      throw new BadRequestException('Organization not found');
    }

    const contact = await this.contactController.create(user, createContactDto);

    await this.organizationContactService.create({
      organization,
      contact
    });

    return contact;
  }

  @Get()
  async findAll(@Id() id: string) {
    const organization = await this.organizationService.findOne(id);

    if (!organization) {
      throw new NotFoundException('Organization not found');
    }

    return this.organizationContactService.findAll(organization.id);
  }
}
