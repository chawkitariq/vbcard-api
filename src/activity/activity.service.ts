import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Activity } from './entities/activity.entity';
import { Repository } from 'typeorm';
import { CreateActivityDto } from './dto/create-activity.dto';

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(Activity)
    private readonly activityRepository: Repository<Activity>
  ) {}

  create(createActivityDto: CreateActivityDto) {
    const user = this.activityRepository.create(createActivityDto);
    return this.activityRepository.save(user);
  }

  findAll() {
    return this.activityRepository.find();
  }

  async findOne(id: string) {
    return this.activityRepository.findOne({
      where: { id }
    });
  }
}
