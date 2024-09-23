import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity({ name: 'subscriptions' })
export class Subscription {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  plan?: string;

  @Column({ nullable: true })
  customer?: string;

  @Column({ type: 'text', default: 'ios' })
  platform?: Subscription.Platform;

  @Exclude()
  @Column({ name: 'end_at', type: 'timestamptz', nullable: true })
  endAt?: Date;

  @Exclude()
  @Column({ name: 'period_end_at', type: 'timestamptz', nullable: true })
  periodEndAt?: Date;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @Exclude()
  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
  deletedAt: Date;
}

export namespace Subscription {
  export enum Platform {
    Ios = 'ios',
    Android = 'android',
    Web = 'web'
  }
}
