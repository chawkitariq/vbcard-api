import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Index()
  @Column({ name: 'verification_token', nullable: true })
  verificationToken?: string;

  @Column({ name: 'banned_at', type: 'timestamptz', nullable: true })
  bannedAt?: Date;

  @Column({ name: 'verified_at', type: 'timestamptz', nullable: true })
  verfiedAt?: Date;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @Exclude()
  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
  deletedAt: Date;

  @Exclude()
  isVerified(): boolean {
    return !!this.verfiedAt
  }
}
