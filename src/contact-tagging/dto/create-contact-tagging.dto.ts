import { Contact } from 'src/contact/entities/contact.entity';
import { ContactTag } from 'src/contact-tag/entities/contact-tag.entity';
import { User } from 'src/user/entities/user.entity';
import { Exclude } from 'class-transformer';

export class CreateContactTaggingDto {
  @Exclude()
  contact: Contact;

  @Exclude()
  user: User;

  @Exclude()
  tag: ContactTag;
}
