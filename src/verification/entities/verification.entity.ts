import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'verifications' })
export class Verification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  token?: string;

  @Column({ name: 'expired_at', type: 'timestamp', nullable: true })
  expiredAt?: Date;

  @Column({ name: 'verified_at', type: 'timestamptz', nullable: true })
  verifiedAt?: Date;

  isExpired() {
    return !this.expiredAt || this.expiredAt <= new Date();
  }
}
