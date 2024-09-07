import { Injectable } from '@nestjs/common';
import { CreateFollowingDto } from './dto/create-following.dto';
import { UpdateFollowingDto } from './dto/update-following.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Following } from './entities/following.entity';
import { IsNull, Repository } from 'typeorm';

@Injectable()
export class FollowingService {
  constructor(
    @InjectRepository(Following)
    private readonly followingRepository: Repository<Following>
  ) {}

  create(createFollowingDto: CreateFollowingDto) {
    const following = this.followingRepository.create(createFollowingDto);
    return this.followingRepository.save(following);
  }

  findOneByUserAndContact(userId: string, contactId: string) {
    return this.followingRepository.findOneBy({
      user: { id: userId },
      contact: { id: contactId }
    });
  }

  findOneUserFollowings(userId: string) {
    return this.followingRepository.findBy({
      user: { id: userId }
    });
  }

  findOneContactFollowers(contactId: string) {
    return this.followingRepository.findBy({
      contact: { id: contactId }
    });
  }

  update(userId: string, contactId: string, body: UpdateFollowingDto) {
    return this.followingRepository.update(
      {
        user: { id: userId },
        contact: { id: contactId },
        deletedAt: IsNull()
      },
      body
    );
  }

  unfollow(userId: string, contactId: string) {
    return this.followingRepository.softDelete({
      user: { id: userId },
      contact: { id: contactId },
      deletedAt: IsNull()
    });
  }
}
