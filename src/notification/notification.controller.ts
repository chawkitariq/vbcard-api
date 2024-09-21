import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { UserService } from 'src/user/user.service';

@Controller('notifications')
export class NotificationController {
  constructor(
    private readonly notificationService: NotificationService,
    private readonly userService: UserService
  ) {}

  @Post()
  async create(@Body() { recipientId, ...createNotificationDto }: CreateNotificationDto) {
    const recipient = await this.userService.findOne(recipientId);

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
    const notification = await this.notificationService.findOne(id);

    if (!notification) {
      throw new NotFoundException('User not found');
    }

    return notification;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() { recipientId, ...updateNotificationDto }: UpdateNotificationDto) {
    if (recipientId) {
      updateNotificationDto.recipient = await this.userService.findOne(recipientId);
    }

    const { affected } = await this.notificationService.update(id, updateNotificationDto);

    if (!affected) {
      throw new NotFoundException('Notification not found');
    }

    return this.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const { affected } = await this.notificationService.remove(id);

    if (!affected) {
      throw new NotFoundException('Contact not found');
    }
  }
}
