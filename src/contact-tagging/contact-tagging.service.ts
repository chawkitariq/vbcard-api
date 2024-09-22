import { Injectable } from '@nestjs/common';
import { CreateContactTaggingDto } from './dto/create-contact-tagging.dto';
import { ContactTagging } from './entities/contact-tagging.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateContactTaggingDto } from './dto/update-contact-tagging.dto';

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

  findBy(where: Parameters<typeof this.contactTaggingRepository.findBy>['0']) {
    return this.contactTaggingRepository.findBy(where);
  }

  existsBy(
    where: Parameters<typeof this.contactTaggingRepository.existsBy>['0']
  ) {
    return this.contactTaggingRepository.existsBy(where);
  }

  remove(
    criteria: Parameters<typeof this.contactTaggingRepository.delete>['0']
  ) {
    return this.contactTaggingRepository.delete(criteria);
  }
}
