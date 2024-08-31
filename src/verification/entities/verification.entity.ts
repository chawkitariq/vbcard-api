import { User } from 'src/user/entities/user.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';

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

  @OneToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'photo_id' })
  user?: Relation<User>;
}
