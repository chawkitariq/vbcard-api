import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { UserService } from 'src/user/user.service';
import { GetUser } from 'src/decorators/get-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { Id } from 'src/decorators/id.decorator';

@Controller('notifications')
export class NotificationController {
  constructor(
    private readonly notificationService: NotificationService,
    private readonly userService: UserService
  ) {}

  @Post()
  async create(
    @GetUser() sender: User,
    @Body() { recipientId, ...createNotificationDto }: CreateNotificationDto
  ) {
    const recipient = await this.userService.findOne({ id: recipientId });

    return this.notificationService.create({
      sender,
      recipient,
      ...createNotificationDto
    });
  }

  @Get()
  findAll(@GetUser() user: User) {
    return this.notificationService.findAll({
      sender: { id: user.id }
    });
  }

  @Get(':id')
  async findOne(@GetUser() user: User, @Id() id: string) {
    const notification = await this.notificationService.findOne({
      id,
      sender: { id: user.id }
    });

    if (!notification) {
      throw new NotFoundException('Notification not found');
    }

    return notification;
  }

  @Patch(':id')
  async update(
    @GetUser() user: User,
    @Id() id: string,
    @Body() { recipientId, ...updateNotificationDto }: UpdateNotificationDto
  ) {
    if (recipientId) {
      updateNotificationDto.recipient = await this.userService.findOne({
        id: recipientId
      });
    }

    const { affected } = await this.notificationService.update(
      {
        id,
        sender: { id: user.id }
      },
      updateNotificationDto
    );

    if (!affected) {
      throw new NotFoundException('Notification not found');
    }

    return this.notificationService.findOne({ id });
  }

  @Delete(':id')
  async remove(@GetUser() user: User, @Id() id: string) {
    const { affected } = await this.notificationService.remove({
      id,
      sender: { id: user.id }
    });

    if (!affected) {
      throw new NotFoundException('Notification not found');
    }
  }
}
