import { Exclude } from 'class-transformer';
import { Contact } from 'src/contact/entities/contact.entity';
import { ContactTag } from 'src/contact-tag/entities/contact-tag.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation, Unique } from 'typeorm';

@Entity({ name: 'contacts_taggings' })
@Unique(['contact', 'user', 'tag'])
export class ContactContactTagging {
  @Exclude()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @ManyToOne(() => Contact)
  @JoinColumn({ name: 'contact_id' })
  contact: Relation<Contact>;

  @Index()
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: Relation<User>;

  @Index()
  @ManyToOne(() => ContactTag)
  @JoinColumn({ name: 'tag_id' })
  tag: Relation<ContactTag>;
}
