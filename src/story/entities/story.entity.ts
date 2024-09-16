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
  UpdateDateColumn
} from 'typeorm';

@Entity({ name: 'stories' })
export class Story {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  caption?: string;

  @Column({ default: 0 })
  duration: number;

  @Column({ default: 'public' })
  visibility: Story.Visibility;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user?: Relation<User>;

  @Column({ name: 'published_at', type: 'timestamptz', nullable: true })
  publishedAt: Date;

  @Column({ name: 'validated_at', type: 'timestamptz', nullable: true })
  validatedAt: Date;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @Exclude()
  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
  deletedAt: Date;
}

export namespace Story {
  export enum Visibility {
    Public = 'public',
    Shared = 'shared',
    Private = 'private'
  }
}
