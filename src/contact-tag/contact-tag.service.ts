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

  findAll() {
    return this.tagRepository.find();
  }

  findOne(id: string) {
    return this.tagRepository.findOneBy({ id });
  }

  update(id: string, updateContactTagDto: UpdateContactTagDto) {
    return this.tagRepository.update(id, updateContactTagDto);
  }

  remove(id: string) {
    return this.tagRepository.delete(id);
  }
}
