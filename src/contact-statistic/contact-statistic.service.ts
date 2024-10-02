import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from 'src/contact/entities/contact.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ContactStatisticService {
  constructor(
    @InjectRepository(Contact)
    private contactRepository: Repository<Contact>
  ) {}

  async incrementViewed(id: string) {
    const contact = await this.contactRepository.findOneBy({ id });
    contact.viewed++;
    return this.contactRepository.save(contact);
  }

  async incrementShared(id: string) {
    const contact = await this.contactRepository.findOneBy({ id });
    contact.shared++;
    return this.contactRepository.save(contact);
  }

  async incrementScanned(id: string) {
    const contact = await this.contactRepository.findOneBy({ id });
    contact.scanned++;
    return this.contactRepository.save(contact);
  }
}
