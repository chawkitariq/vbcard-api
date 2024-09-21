import { Injectable } from '@nestjs/common';
import { CreateContactTaggingDto } from './dto/create-contact-tagging.dto';
import { ContactTagging } from './entities/contact-tagging.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ContactTaggingService {
  constructor(
    @InjectRepository(ContactTagging)
    private readonly contactTaggingRepository: Repository<ContactTagging>
  ) {}

  create(createContactTaggingDto: CreateContactTaggingDto) {
    const tag = this.contactTaggingRepository.create(createContactTaggingDto);
    return this.contactTaggingRepository.save(tag);
  }

  remove(userId: string, contactId: string, contactTagId: string) {
    return this.contactTaggingRepository.delete({
      user: { id: userId },
      contact: { id: contactId },
      tag: { id: contactTagId }
    });
  }
}
