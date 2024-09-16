import { Injectable } from '@nestjs/common';
import { CreateContactFollowerDto } from './dto/create-contact-follower.dto';
import { UpdateContactFollowerDto } from './dto/update-contact-follower.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ContactFollower } from './entities/contact-follower.entity';
import { IsNull, Repository } from 'typeorm';

@Injectable()
export class ContactFollowerService {
  constructor(
    @InjectRepository(ContactFollower)
    private readonly contactFollowerRepository: Repository<ContactFollower>
  ) {}

  create(createContactFollowerDto: CreateContactFollowerDto) {
    const following = this.contactFollowerRepository.create(createContactFollowerDto);
    return this.contactFollowerRepository.save(following);
  }

  findOneByUserAndContact(userId: string, contactId: string) {
    return this.contactFollowerRepository.findOneBy({
      user: { id: userId },
      contact: { id: contactId }
    });
  }

  findUserFollowings(userId: string) {
    return this.contactFollowerRepository.findBy({
      user: { id: userId }
    });
  }

  findContactFollowers(contactId: string) {
    return this.contactFollowerRepository.findBy({
      contact: { id: contactId }
    });
  }

  update(userId: string, contactId: string, body: UpdateContactFollowerDto) {
    return this.contactFollowerRepository.update(
      {
        user: { id: userId },
        contact: { id: contactId },
        deletedAt: IsNull()
      },
      body
    );
  }

  unfollow(userId: string, contactId: string) {
    return this.contactFollowerRepository.softDelete({
      user: { id: userId },
      contact: { id: contactId },
      deletedAt: IsNull()
    });
  }
}
