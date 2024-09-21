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

  @Exclude()
  @Index()
  @Column({ name: 'two_factor_authentication_secret', nullable: true })
  twoFactorAuthenticationSecret?: string;

  @Exclude()
  @Column({ name: 'two_factor_authentication_enabled_at', type: 'timestamptz', nullable: true })
  twoFactorAuthenticationEnabledAt: Date;

  @Exclude()
  @Index()
  @Column({ name: 'verification_token', nullable: true })
  verificationToken?: string;

  @Exclude()
  @Column({ name: 'verification_token_expiration_at', type: 'timestamptz', nullable: true })
  verificationTokenExpirationAt?: Date;

  @Exclude()
  @Column({ name: 'premium_end_at', type: 'timestamptz', nullable: true })
  premiumEndAt?: Date;

  @Exclude()
  @Column({ name: 'business_end_at', type: 'timestamptz', nullable: true })
  businessEndAt?: Date;

  @Exclude()
  @Column({ name: 'verified_at', type: 'timestamptz', nullable: true })
  verifiedAt?: Date;

  @Exclude()
  @Column({ name: 'banned_at', type: 'timestamptz', nullable: true })
  bannedAt?: Date;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @Exclude()
  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
  deletedAt: Date;

  @Exclude()
  isVerified(): boolean {
    return !!this.verifiedAt;
  }

  @Exclude()
  isVerificationTokenExpired(): boolean {
    const now = new Date();
    return this.verificationTokenExpirationAt <= now;
  }
}
