import { Injectable } from '@nestjs/common';
import { CreateStoryDto } from './dto/create-story.dto';
import { UpdateStoryDto } from './dto/update-story.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Story } from './entities/story.entity';
import { IsNull, Repository } from 'typeorm';

@Injectable()
export class StoryService {
  constructor(
    @InjectRepository(Story)
    private readonly storyRepository: Repository<Story>
  ) {}

  create(createStoryDto: CreateStoryDto) {
    const user = this.storyRepository.create(createStoryDto);
    return this.storyRepository.save(user);
  }

  findAll() {
    return this.storyRepository.find();
  }

  findOne(id: string) {
    return this.storyRepository.findOne({
      where: { id }
    });
  }

  update(id: string, updateStoryDto: UpdateStoryDto) {
    return this.storyRepository.update(id, updateStoryDto);
  }

  remove(id: string) {
    return this.storyRepository.softDelete({
      id,
      deletedAt: IsNull()
    });
  }
}
