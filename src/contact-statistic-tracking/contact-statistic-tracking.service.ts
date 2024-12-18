import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactStatisticTracking } from './entities/contact-statistic-tracking.entity';
import { CreateContactStatisticTrackingDto } from './dto/create-contact-statistic-tracking.dto';

@Injectable()
export class ContactStatisticTrackingService {
  constructor(
    @InjectRepository(ContactStatisticTracking)
    private readonly contactStatisticTrackingRepository: Repository<ContactStatisticTracking>
  ) {}

  create(createContactStatisticTrackingDto: CreateContactStatisticTrackingDto) {
    const contactStatisticTracking =
      this.contactStatisticTrackingRepository.create(
        createContactStatisticTrackingDto
      );
    return this.contactStatisticTrackingRepository.save(
      contactStatisticTracking
    );
  }

  findAll() {
    return this.contactStatisticTrackingRepository.find();
  }

  findOne(
    where: Parameters<
      typeof this.contactStatisticTrackingRepository.findOneBy
    >['0']
  ) {
    return this.contactStatisticTrackingRepository.findOneBy(where);
  }
}
