import { Exclude } from 'class-transformer';
import { Contact } from 'src/contact/entities/contact.entity';
import { User } from 'src/user/entities/user.entity';
import { ContactStatisticTracking } from '../entities/contact-statistic-tracking.entity';

export class CreateContactStatisticTrackingDto {
  @Exclude()
  field?: ContactStatisticTracking.Field;

  @Exclude()
  ip?: string;

  @Exclude()
  contact: Contact;

  @Exclude()
  user: User;
}
