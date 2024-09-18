import { Contact } from 'src/contact/entities/contact.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
  Unique
} from 'typeorm';

@Entity({ name: 'contacts_statistics_trackings' })
@Unique(['user', 'contact', 'field'])
export class ContactStatisticTracking {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: true })
  field?: ContactStatisticTracking.Field;

  @Column({ nullable: true })
  ip?: string;

  @Index()
  @ManyToOne(() => Contact)
  @JoinColumn({ name: 'contact_id' })
  contact: Relation<Contact>;

  @Index()
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: Relation<User>;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;
}

export namespace ContactStatisticTracking {
  export type Field = 'viewed' | 'shared' | 'scanned';
}
