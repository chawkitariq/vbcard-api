import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateContactDto } from './dto/create.dto';
import { UpdateContactDto } from './dto/update.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity';
import { IsNull, Repository } from 'typeorm';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>
  ) {}

  create(createContactDto: CreateContactDto) {
    const contact = this.contactRepository.create(createContactDto);
    return this.contactRepository.save(contact);
  }

  findAll() {
    return this.contactRepository.find();
  }

  findOne(id: string) {
    return this.contactRepository.findOne({
      where: { id }
    });
  }

  update(id: string, updateContactDto: UpdateContactDto) {
    return this.contactRepository.update(id, updateContactDto);
  }

  remove(id: string) {
    return this.contactRepository.softDelete({
      id,
      deletedAt: IsNull()
    });
  }

  async findOneOrHttpFail(id: string) {
    let contact: Contact | null;

    try {
      contact = await this.findOne(id);
    } catch (error) {
      throw new InternalServerErrorException('Something wrong');
    }

    if (!contact) {
      throw new NotFoundException('Contact not found');
    }

    return contact;
  }
}
