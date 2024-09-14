import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { UpdateResult } from 'typeorm';
import { Notification } from './entities/notification.entity';

@Controller('notification')
export class NotificationController {
  constructor(
    private readonly notificationService: NotificationService,
    private readonly userService: UserService
  ) {}

  @Post()
  async create(@Body() { recipientId, ...createNotificationDto }: CreateNotificationDto) {
    let recipient: User | null;

    try {
      recipient = await this.userService.findOne(recipientId);
    } catch (error) {
      throw new InternalServerErrorException('Something wrong');
    }

    return this.notificationService.create({
      recipient,
      ...createNotificationDto
    });
  }

  @Get()
  findAll() {
    return this.notificationService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    let notification: Notification | null;

    try {
      notification = await this.notificationService.findOne(id);
    } catch (error) {
      throw new InternalServerErrorException('Something wrong');
    }

    if (!notification) {
      throw new NotFoundException('User not found');
    }

    return notification;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() { recipientId, ...updateNotificationDto }: UpdateNotificationDto) {
    let result: UpdateResult | undefined;

    try {
      if (recipientId) {
        updateNotificationDto.recipient = await this.userService.findOne(recipientId);
      }

      result = await this.notificationService.update(id, updateNotificationDto);
    } catch (error) {
      throw new InternalServerErrorException('Something wrong');
    }

    if (result.affected <= 0) {
      throw new NotFoundException('Notification not found');
    }

    return this.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    let result: UpdateResult | undefined;

    try {
      result = await this.notificationService.remove(id);
    } catch (error) {
      throw new InternalServerErrorException('Something wrong');
    }

    if (!result.affected) {
      throw new NotFoundException('Contact not found');
    }
  }
}
