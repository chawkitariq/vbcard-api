import { Exclude } from 'class-transformer';
import { File } from 'src/file/entities/file.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
  Unique,
  UpdateDateColumn
} from 'typeorm';

@Entity({ name: 'contacts' })
@Unique(['photo'])
export class Contact {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: true })
  vcard?: string;

  @Column({ default: 'private' })
  visibility: Contact.Visibility;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'author_id' })
  author?: Relation<User>;

  @OneToOne(() => File, { nullable: true })
  @JoinColumn({ name: 'photo_id' })
  photo?: Relation<File>;

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
}
