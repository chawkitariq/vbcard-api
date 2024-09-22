import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
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
    return this.contactRepository.findOneBy({ id });
  }

  findOneBy(where: Parameters<typeof this.contactRepository.findOneBy>['0']) {
    return this.contactRepository.findOneBy(where);
  }

  existBy(where: Parameters<typeof this.contactRepository.existsBy>['0']) {
    return this.contactRepository.existsBy(where);
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
}
