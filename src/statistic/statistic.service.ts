import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from 'src/contact/entities/contact.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StatisticService {
  constructor(
    @InjectRepository(Contact)
    private contactRepository: Repository<Contact>
  ) {}

  async incrementViewed(contactId: string): Promise<Contact> {
    const contact = await this.contactRepository.findOneBy({ id: contactId });
    contact.viewed++;
    return this.contactRepository.save(contact);
  }

  async incrementShared(contactId: string): Promise<Contact> {
    const contact = await this.contactRepository.findOneBy({ id: contactId });
    contact.shared++;
    return this.contactRepository.save(contact);
  }

  async incrementScanned(contactId: string): Promise<Contact> {
    const contact = await this.contactRepository.findOneBy({ id: contactId });
    contact.scanned++;
    return this.contactRepository.save(contact);
  }
}
