import { Contact } from 'src/contact/entities/contact.entity';
import { Tag } from 'src/tag/entities/tag.entity';
import { User } from 'src/user/entities/user.entity';

export class CreateContactTaggingDto {
  contact: Contact;
  user: User;
  tag: Tag;
}
