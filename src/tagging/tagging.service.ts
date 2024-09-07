import { Injectable } from '@nestjs/common';
import { CreateTaggingDto } from './dto/create-tagging.dto';
import { Tagging } from './entities/tagging.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TaggingService {
  constructor(
    @InjectRepository(Tagging)
    private readonly taggingRepository: Repository<Tagging>
  ) {}

  create(createTaggingDto: CreateTaggingDto) {
    const tag = this.taggingRepository.create(createTaggingDto);
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
