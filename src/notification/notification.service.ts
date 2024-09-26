import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { IsNull, Repository } from 'typeorm';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>
  ) {}

  create(createNotificationDto: CreateNotificationDto) {
    const user = this.notificationRepository.create(createNotificationDto);
    return this.notificationRepository.save(user);
  }

  findAll(where?: Parameters<typeof this.notificationRepository.findBy>['0']) {
    return this.notificationRepository.findBy(where);
  }

  findOne(
    where: Parameters<typeof this.notificationRepository.findOneBy>['0']
  ) {
    return this.notificationRepository.findOneBy(where);
  }

  update(
    criteria: Parameters<typeof this.notificationRepository.update>['0'],
    updateNotificationDto: UpdateNotificationDto
  ) {
    return this.notificationRepository.update(criteria, updateNotificationDto);
  }

  remove(
    criteria: Parameters<typeof this.notificationRepository.softDelete>['0']
  ) {
    const mergedCriteria = Object.assign({}, criteria, { deletedAt: IsNull() });
    return this.notificationRepository.softDelete(mergedCriteria);
  }
}
