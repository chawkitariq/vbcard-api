import { Injectable } from '@nestjs/common';
import { CreateContactTagDto } from './dto/create-contact-tag.dto';
import { UpdateContactTagDto } from './dto/update-contact-tag.dto';
import { ContactTag } from './entities/contact-tag.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ContactTagService {
  constructor(
    @InjectRepository(ContactTag)
    private readonly tagRepository: Repository<ContactTag>
  ) {}

  create(createContactTagDto: CreateContactTagDto) {
    const tag = this.tagRepository.create(createContactTagDto);
    return this.tagRepository.save(tag);
  }

  findAll(options?: Parameters<typeof this.tagRepository.find>['0']) {
    return this.tagRepository.find(options);
  }

  findOne(options?: Parameters<typeof this.tagRepository.findOne>['0']) {
    return this.tagRepository.findOne(options);
  }

  exists(options: Parameters<typeof this.tagRepository.exists>['0']) {
    return this.tagRepository.exists(options);
  }

  update(
    criteria: Parameters<typeof this.tagRepository.update>['0'],
    updateContactTagDto: UpdateContactTagDto
  ) {
    return this.tagRepository.update(criteria, updateContactTagDto);
  }

  remove(criteria: Parameters<typeof this.tagRepository.delete>['0']) {
    return this.tagRepository.delete(criteria);
  }
}
