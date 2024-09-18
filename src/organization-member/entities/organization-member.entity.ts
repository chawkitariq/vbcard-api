import { Exclude } from 'class-transformer';
import { Organization } from 'src/organization/entities/organization.entity';
import { User } from 'src/user/entities/user.entity';
import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
  Unique,
  UpdateDateColumn
} from 'typeorm';

@Entity({ name: 'organizations_members' })
@Unique(['organization', 'member'])
export class OrganizationMember {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @ManyToOne(() => Organization)
  @JoinColumn({ name: 'organization_id' })
  organization: Relation<Organization>;

  @Index()
  @ManyToOne(() => User)
  @JoinColumn({ name: 'member_id' })
  member: Relation<User>;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @Exclude()
  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
  deletedAt: Date;
}
