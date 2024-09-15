import { Injectable } from '@nestjs/common';
import { CreateContactFollowingDto } from './dto/create-contact-following.dto';
import { UpdateContactFollowingDto } from './dto/update-contact-following.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ContactFollowing } from './entities/contact-following.entity';
import { IsNull, Repository } from 'typeorm';

@Injectable()
export class ContactFollowingService {
  constructor(
    @InjectRepository(ContactFollowing)
    private readonly contactFollowingRepository: Repository<ContactFollowing>
  ) {}

  create(createContactFollowingDto: CreateContactFollowingDto) {
    const following = this.contactFollowingRepository.create(createContactFollowingDto);
    return this.contactFollowingRepository.save(following);
  }

  findOneByUserAndContact(userId: string, contactId: string) {
    return this.contactFollowingRepository.findOneBy({
      user: { id: userId },
      contact: { id: contactId }
    });
  }

  findOneUserContactFollowings(userId: string) {
    return this.contactFollowingRepository.findBy({
      user: { id: userId }
    });
  }

  findOneContactFollowers(contactId: string) {
    return this.contactFollowingRepository.findBy({
      contact: { id: contactId }
    });
  }

  update(userId: string, contactId: string, body: UpdateContactFollowingDto) {
    return this.contactFollowingRepository.update(
      {
        user: { id: userId },
        contact: { id: contactId },
        deletedAt: IsNull()
      },
      body
    );
  }

  unfollow(userId: string, contactId: string) {
    return this.contactFollowingRepository.softDelete({
      user: { id: userId },
      contact: { id: contactId },
      deletedAt: IsNull()
    });
  }
}
