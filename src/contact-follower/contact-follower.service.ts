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
    const following = this.contactFollowerRepository.create(
      createContactFollowerDto
    );
    return this.contactFollowerRepository.save(following);
  }

  findOne(
    options: Parameters<typeof this.contactFollowerRepository.findOne>['0']
  ) {
    return this.contactFollowerRepository.findOne(options);
  }

  findAll(
    options?: Parameters<typeof this.contactFollowerRepository.find>['0']
  ) {
    return this.contactFollowerRepository.find(options);
  }

  exists(
    options?: Parameters<typeof this.contactFollowerRepository.exists>['0']
  ) {
    return this.contactFollowerRepository.exists(options);
  }

  update(
    criteria: Parameters<typeof this.contactFollowerRepository.update>['0'],
    body: UpdateContactFollowerDto
  ) {
    const mergedCriteria = Object.assign({}, criteria, { deletedAt: IsNull() });
    return this.contactFollowerRepository.update(mergedCriteria, body);
  }

  delete(
    criteria: Parameters<typeof this.contactFollowerRepository.softDelete>['0']
  ) {
    const mergedCriteria = Object.assign({}, criteria, { deletedAt: IsNull() });
    return this.contactFollowerRepository.softDelete(mergedCriteria);
  }
}
