import { Injectable } from '@nestjs/common';
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

  findAll(where?: Parameters<typeof this.userRepository.findBy>['0']) {
    return this.userRepository.findBy(where);
  }

  async findOne(where: Parameters<typeof this.userRepository.findOneBy>['0']) {
    return this.userRepository.findOneBy(where);
  }

  async update(
    criteria: Parameters<typeof this.userRepository.update>['0'],
    updateUserDto: UpdateUserDto
  ) {
    return this.userRepository.update(criteria, updateUserDto);
  }

  async remove(
    criteria: Parameters<typeof this.userRepository.softDelete>['0']
  ) {
    const mergedCriteria = Object.assign({}, criteria, { deletedAt: IsNull() });
    return this.userRepository.softDelete(mergedCriteria);
  }
}
