import { Organization } from 'src/organization/entities/organization.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn
} from 'typeorm';

@Entity({ name: 'organizations_invitations' })
export class OrganizationInvitation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column()
  email: string;

  @Column({ type: 'text', default: 'pending' })
  status: OrganizationInvitation.Status;

  @Column({ default: 'member' })
  role?: string;

  @Index()
  @ManyToOne(() => Organization)
  @JoinColumn({ name: 'organization_id' })
  organization: Relation<Organization>;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}

export namespace OrganizationInvitation {
  export enum Status {
    Pending = 'pending',
    Accepted = 'accepted',
    Rejected = 'rejected'
  }
}
