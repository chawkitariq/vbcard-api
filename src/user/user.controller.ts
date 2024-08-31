import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  InternalServerErrorException
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateResult } from 'typeorm';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    try {
      return this.userService.create(createUserDto);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  @Get()
  findAll() {
    try {
      return this.userService.findAll();
    } catch (error) {
      throw new NotFoundException('Failed to find users');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOneOrHttpFail(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    let result: UpdateResult | undefined;

    try {
      result = await this.userService.update(id, updateUserDto);
    } catch (error) {
      throw new InternalServerErrorException('Failed to update user');
    }

    if (result.affected <= 0) {
      throw new NotFoundException('User not found');
    }

    return this.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    let result: UpdateResult | undefined;

    try {
      result = await this.userService.remove(id);
    } catch (error) {
      throw new InternalServerErrorException('Failed to remove user');
    }

    if (result.affected <= 0) {
      throw new NotFoundException('User not found');
    }
  }
}
