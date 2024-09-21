import { Controller, Get, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IdDto } from 'src/dto/id.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') { id }: IdDto) {
    const user = await this.userService.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  @Patch(':id')
  async update(@Param('id') { id }: IdDto, @Body() updateUserDto: UpdateUserDto) {
    const { affected } = await this.userService.update(id, updateUserDto);

    if (!affected) {
      throw new NotFoundException('User not found');
    }

    return this.userService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id') { id }: IdDto) {
    const { affected } = await this.userService.remove(id);

    if (!affected) {
      throw new NotFoundException('User not found');
    }
  }
}
