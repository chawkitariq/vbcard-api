import { Exclude } from 'class-transformer';
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
  UpdateDateColumn
} from 'typeorm';

@Entity({ name: 'contacts' })
export class Contact {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: true })
  vcard?: string;

  @Column({ default: 0 })
  viewed: number;

  @Column({ default: 0 })
  shared: number;

  @Column({ default: 0 })
  scanned: number;

  @Column({ default: 'private' })
  visibility: Contact.Visibility;

  @Column({ default: 'leder' })
  layout: Contact.Layout;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'owner_id' })
  owner?: Relation<User>;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @Exclude()
  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
  deletedAt: Date;
}

export namespace Contact {
  export enum Visibility {
    Public = 'public',
    Shared = 'shared',
    Private = 'private'
  }

  export enum Layout {
    Leder = 'leder',
    Futer = 'futer',
    Rider = 'rider',
    Miter = 'miter',
    Lext = 'lext',
    Rixt = 'rixt'
  }
}
