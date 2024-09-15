import { Exclude } from 'class-transformer';
import { Contact } from 'src/contact/entities/contact.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
  Unique,
  UpdateDateColumn
} from 'typeorm';

@Entity({ name: 'contacts_statistics' })
@Unique(['contact'])
export class ContactStatistic {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: 0 })
  viewed: number;

  @Column({ default: 0 })
  shared: number;

  @Column({ default: 0 })
  scanned: number;

  @OneToOne(() => Contact)
  @JoinColumn({ name: 'contact_id' })
  contact: Relation<Contact>;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @Exclude()
  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
  deletedAt: Date;
}
