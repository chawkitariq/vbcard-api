import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactStatistic } from './entities/contact-statistic.entity';

@Injectable()
export class ContactStatisticService {
  constructor(
    @InjectRepository(ContactStatistic)
    private statisticRepository: Repository<ContactStatistic>
  ) {}

  async incrementViewed(contactId: string) {
    const statistic = await this.statisticRepository.findOneBy({ contact: { id: contactId } });
    statistic.viewed++;
    return this.statisticRepository.save(statistic);
  }

  async incrementShared(contactId: string) {
    const statistic = await this.statisticRepository.findOneBy({ contact: { id: contactId } });
    statistic.shared++;
    return this.statisticRepository.save(statistic);
  }

  async incrementScanned(contactId: string) {
    const statistic = await this.statisticRepository.findOneBy({ contact: { id: contactId } });
    statistic.scanned++;
    return this.statisticRepository.save(statistic);
  }
}
