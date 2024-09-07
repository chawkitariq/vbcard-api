import { Injectable } from '@nestjs/common';
import { CreateTaggingDto } from './dto/create-tagging.dto';
import { UpdateTaggingDto } from './dto/update-tagging.dto';
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
    return 'This action adds a new tagging';
  }

  findAll() {
    return `This action returns all tagging`;
  }

  findOne(id: string) {
    return `This action returns a #${id} tagging`;
  }

  update(id: string, updateTaggingDto: UpdateTaggingDto) {
    return `This action updates a #${id} tagging`;
  }

  remove(id: string) {
    return `This action removes a #${id} tagging`;
  }
}
