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

  findAll(
    options?: Parameters<typeof this.contactTaggingRepository.find>['0']
  ) {
    return this.contactTaggingRepository.find(options);
  }

  findOne(
    options?: Parameters<typeof this.contactTaggingRepository.findOne>['0']
  ) {
    return this.contactTaggingRepository.findOne(options);
  }

  exists(
    options: Parameters<typeof this.contactTaggingRepository.exists>['0']
  ) {
    return this.contactTaggingRepository.exists(options);
  }

  remove(
    criteria: Parameters<typeof this.contactTaggingRepository.delete>['0']
  ) {
    return this.contactTaggingRepository.delete(criteria);
  }
}
