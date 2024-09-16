import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'activities' })
export class Activity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  action?: string;

  @Column({ nullable: true })
  collection?: string;

  @Column({ nullable: true })
  ip?: string;

  @Column({ nullable: true })
  item?: string;

  @Column({ nullable: true })
  user?: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;
}
