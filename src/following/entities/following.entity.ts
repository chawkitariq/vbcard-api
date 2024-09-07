import { Exclude } from 'class-transformer';
import { Contact } from 'src/contact/entities/contact.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
  Unique,
  UpdateDateColumn
} from 'typeorm';

@Entity({ name: 'followings' })
@Unique(['user', 'contact'])
export class Following {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Contact)
  @JoinColumn({ name: 'contact_id' })
  contact: Relation<Contact>;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: Relation<User>;

  @Column({ type: 'text', nullable: true })
  note?: string;

  @Column({ nullable: true })
  longitude?: string;

  @Column({ nullable: true })
  latitude?: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @Exclude()
  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
  deletedAt: Date;
}
