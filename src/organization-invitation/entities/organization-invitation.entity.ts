import { Organization } from 'src/organization/entities/organization.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
  Unique,
  UpdateDateColumn
} from 'typeorm';

@Entity({ name: 'organizations_invitations' })
@Unique(['email', 'organization', 'recipient'])
export class OrganizationInvitation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column()
  email: string;

  @Column({ type: 'text', default: 'pending' })
  status: OrganizationInvitation.Status;

  @Index()
  @ManyToOne(() => Organization)
  @JoinColumn({ name: 'organization_id' })
  organization: Relation<Organization>;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'recipient_id' })
  recipient?: Relation<User>;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}

export namespace OrganizationInvitation {
  export enum Status {
    Pending = 'pending',
    Accepted = 'accepted',
    Declined = 'declined'
  }
}
