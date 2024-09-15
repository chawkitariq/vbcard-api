import { Injectable } from '@nestjs/common';
import { CreateContactTaggingDto } from './dto/create-contact-tagging.dto';
import { ContactTagging } from './entities/contact-tagging.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ContactTaggingService {
  constructor(
    @InjectRepository(ContactTagging)
    private readonly taggingRepository: Repository<ContactTagging>
  ) {}

  create(createContactTaggingDto: CreateContactTaggingDto) {
    const tag = this.taggingRepository.create(createContactTaggingDto);
    return this.taggingRepository.save(tag);
  }

  remove(userId: string, contactId: string, tagId: string) {
    return this.taggingRepository.delete({
      user: { id: userId },
      contact: { id: contactId },
      tag: { id: tagId }
    });
  }
}
