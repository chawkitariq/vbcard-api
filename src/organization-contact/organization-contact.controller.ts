import {
  Controller,
  Get,
  Post,
  Body,
  BadRequestException
} from '@nestjs/common';
import { OrganizationContactService } from './organization-contact.service';
import { OrganizationService } from 'src/organization/organization.service';
import { CreateContactDto } from 'src/contact/dto/create-contact.dto';
import { ContactController } from 'src/contact/contact.controller';
import { User } from 'src/user/entities/user.entity';
import { GetUser } from 'src/decorators/get-user.decorator';
import { Id } from 'src/decorators/id.decorator';

@Controller()
export class OrganizationContactController {
  constructor(
    private readonly organizationContactService: OrganizationContactService,
    private readonly organizationService: OrganizationService,
    private readonly contactController: ContactController
  ) {}

  @Post('organizations/:id/contacts')
  async create(
    @GetUser() user: User,
    @Id() organizationId: string,
    @Body() createContactDto: CreateContactDto
  ) {
    const organization = await this.organizationService.findOne(organizationId);

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

  @Get('organizations/:id/contacts')
  async findAll(@GetUser('id') userId: string, @Id() organizationId: string) {
    const organizationContact = await this.organizationContactService.findAll({
      organization: { id: organizationId, owner: { id: userId } }
    });

    return organizationContact.map(({ contact }) => contact);
  }

  @Get('contacts/:id/organization')
  async findContactOrganization(
    @GetUser('id') userId: string,
    @Id() contactId: string
  ) {
    const organizationContact = await this.organizationContactService.findOne({
      contact: { id: contactId },
      organization: { owner: { id: userId } }
    });

    return organizationContact;
  }
}
