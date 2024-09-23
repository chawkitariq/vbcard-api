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

  findBy(where?: Parameters<typeof this.contactRepository.findBy>['0']) {
    return this.contactRepository.findBy(where);
  }

  findOne(id: string) {
    return this.contactRepository.findOneBy({ id });
  }

  findOneBy(where: Parameters<typeof this.contactRepository.findOneBy>['0']) {
    return this.contactRepository.findOneBy(where);
  }

  existsBy(where: Parameters<typeof this.contactRepository.existsBy>['0']) {
    return this.contactRepository.existsBy(where);
  }

  update(
    criteria: Parameters<typeof this.contactRepository.softDelete>['0'],
    updateContactDto: UpdateContactDto
  ) {
    return this.contactRepository.update(criteria, updateContactDto);
  }

  remove(criteria: Parameters<typeof this.contactRepository.softDelete>['0']) {
    const mergedCriteria = Object.assign({}, criteria, { deletedAt: IsNull() });
    return this.contactRepository.softDelete(mergedCriteria);
  }
}
