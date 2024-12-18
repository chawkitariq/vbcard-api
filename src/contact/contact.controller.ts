import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  NotFoundException,
  HttpCode,
  HttpStatus
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { GetUser } from 'src/decorators/get-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { Id } from 'src/decorators/id.decorator';
import { Contact } from './entities/contact.entity';

@Controller('contacts')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(
    @GetUser() owner: User,
    @Body() { photoId, ...createContactDto }: CreateContactDto
  ) {
    return this.contactService.create({
      ...createContactDto,
      owner
    });
  }

  @Get()
  async findAll(@GetUser() owner: User) {
    return this.contactService.findAll({
      owner: { id: owner.id }
    });
  }

  @Get('public')
  async findAllPublic() {
    return this.contactService.findAll({
      visibility: Contact.Visibility.Public
    });
  }

  @Get(':id')
  async findOne(@GetUser() owner: User, @Id() id: string) {
    const contact = await this.contactService.findOne({
      id,
      owner: { id: owner.id }
    });

    if (!contact) {
      throw new NotFoundException('Contact not found');
    }

    return contact;
  }

  @Get(':id/public')
  async findOnePublic(@Id() id: string) {
    const contact = await this.contactService.findOne({
      id,
      visibility: Contact.Visibility.Public
    });

    if (!contact) {
      throw new NotFoundException('Contact not found');
    }

    return contact;
  }

  @Patch(':id')
  async update(
    @GetUser() owner: User,
    @Id() id: string,
    @Body() updateContactDto: UpdateContactDto
  ) {
    const { affected } = await this.contactService.update(
      {
        id,
        owner: { id: owner.id }
      },
      updateContactDto
    );

    if (!affected) {
      throw new NotFoundException('Contact not found');
    }

    return this.contactService.findOne({ id });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@GetUser() owner: User, @Id() id: string) {
    const { affected } = await this.contactService.remove({
      id,
      owner: { id: owner.id }
    });

    if (!affected) {
      throw new NotFoundException('Contact not found');
    }
  }
}
