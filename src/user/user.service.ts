import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IsNull, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: string) {
    return this.userRepository.findOne({
      where: { id }
    });
  }

  async findOneByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email }
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  async remove(id: string) {
    return this.userRepository.softDelete({
      id,
      deletedAt: IsNull()
    });
  }

  async findOneOrHttpFail(id: string) {
    let user: User | null;

    try {
      user = await this.findOne(id);
    } catch (error) {
      throw new InternalServerErrorException('Failed to find user');
    }

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
