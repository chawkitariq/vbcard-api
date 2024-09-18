import { Contact } from 'src/contact/entities/contact.entity';
import { ContactTag } from 'src/contact-tag/entities/contact-tag.entity';
import { User } from 'src/user/entities/user.entity';

export class CreateContactContactTaggingDto {
  contact: Contact;
  user: User;
  tag: ContactTag;
}
