import { Injectable } from '@nestjs/common';
import { CreateContactContactTaggingDto } from './dto/create-contact-tagging.dto';
import { ContactContactTagging } from './entities/contact-tagging.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ContactContactTaggingService {
  constructor(
    @InjectRepository(ContactContactTagging)
    private readonly contactContactTaggingRepository: Repository<ContactContactTagging>
  ) {}

  create(createContactContactTaggingDto: CreateContactContactTaggingDto) {
    const tag = this.contactContactTaggingRepository.create(createContactContactTaggingDto);
    return this.contactContactTaggingRepository.save(tag);
  }

  remove(userId: string, contactId: string, contactTagId: string) {
    return this.contactContactTaggingRepository.delete({
      user: { id: userId },
      contact: { id: contactId },
      tag: { id: contactTagId }
    });
  }
}
